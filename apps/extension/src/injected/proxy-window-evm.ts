// NOTE: This logic has been borrowed from RevokeCash/browser-extension and modified
// See https://github.com/RevokeCash/browser-extension/blob/d49f1de92003681b9e768782f54e734a52a5d975/src/injected/proxy-window-ethereum.tsx
// The RevokeCash/browser-extension code is MIT licensed

import { isSupportedChainId } from "@blowfish/utils/chains";
import {
  Identifier,
  Message,
  SignMessageMethod,
  SignMessageRequest,
  SignTypedDataRequest,
  SignTypedDataVersion,
  TransactionRequest,
  TypedDataV1Field,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import { WindowPostMessageStream } from "@metamask/post-message-stream";
import { EthereumProviderError, ethErrors } from "eth-rpc-errors";
import { providers } from "ethers";

import { IS_IMPERSONATION_AVAILABLE } from "~config";
import { logger } from "~utils/logger";
import {
  createBlowfishOptionRequestMessage,
  createSignMessageRequestMessage,
  createSignTypedDataRequestMessage,
  createTransactionRequestMessage,
  sendAndAwaitResponseFromStream,
} from "~utils/messages";
import {
  BlowfishImpersonationWalletInfo,
  PREFERENCES_BLOWFISH_IMPERSONATION_WALLET,
} from "~utils/storage";

interface JsonRpcResponse {
  id: number;
  jsonrpc: "2.0";
  result: string;
}

interface JsonRpcError {
  id: number;
  jsonrpc: "2.0";
  error: EthereumProviderError<unknown>;
}

interface EthereumSignTypedDataRequest {
  method:
    | "eth_signTypedData"
    | "eth_signTypedData_v1"
    | "eth_signTypedData_v3"
    | "eth_signTypedData_v4";
  params: [string | TypedDataV1Field[], string];
}

declare let window: Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum?: any;
};

const stream = new WindowPostMessageStream({
  name: Identifier.Inpage,
  target: Identifier.ContentScript,
});

let requestProxy: undefined | typeof Proxy;
let sendProxy: undefined | typeof Proxy;
let sendAsyncProxy: undefined | typeof Proxy;

const provider = new providers.Web3Provider(window.ethereum, "any");

const randomId = () => Math.floor(Math.random() * 1_000_000);

const getChainIdAndUserAccount = async (): Promise<{
  chainId: number;
  userAccount: string;
}> => {
  const [chainId, accounts] = await Promise.all([
    provider.getNetwork().then(({ chainId }) => chainId),
    provider.listAccounts(),
  ]);
  // NOTE: The connected account will always be the first account in the list
  const userAccount = accounts[0];

  return { chainId, userAccount };
};

const isScanningPaused = (response: Message<UserDecisionResponse>) => {
  return !!response.data.opts?.pauseScan;
};

const enhanceSignTypedData = (request: EthereumSignTypedDataRequest) => {
  const { method, params } = request;
  switch (method) {
    case "eth_signTypedData":
    case "eth_signTypedData_v1": {
      if (Array.isArray(params[0])) {
        const [typedData, address] = params;
        return {
          signTypedDataVersion: SignTypedDataVersion.v1,
          address,
          typedData,
        };
      }
      const [address, data] = params;
      return {
        signTypedDataVersion: SignTypedDataVersion.v4,
        address,
        typedData: data ? JSON.parse(data) : null,
      };
    }
    case "eth_signTypedData_v3":
    case "eth_signTypedData_v4": {
      const [address, data] = params;
      return {
        signTypedDataVersion:
          method === "eth_signTypedData_v3"
            ? SignTypedDataVersion.v3
            : SignTypedDataVersion.v4,
        address,
        typedData: data ? JSON.parse(data) : null,
      };
    }
    default:
      throw new Error(`Unknown eth_signTypedData version. Method: ${method}`);
  }
};

const shouldForwardToWallet = (
  response: Message<UserDecisionResponse>,
  chainId: number
) => {
  // NOTE: Scanning paused by user
  if (isScanningPaused(response)) {
    logger.debug("Scanning paused");
    return true;
  }

  // NOTE: If the chain is not supported we cannot scan the request
  // So just show a warning and proceed to the wallet
  if (!isSupportedChainId(chainId)) {
    logger.debug("Unsupported chain", chainId);
    return true;
  }
  return false;
};

const overrideIfNotProxied = () => {
  if (
    window.ethereum &&
    (window.ethereum.request !== requestProxy ||
      window.ethereum.send !== sendProxy ||
      window.ethereum.sendAsync !== sendAsyncProxy)
  ) {
    logger.debug("Reproxying window.ethereum");
    overrideWindowEthereum();
  }
};

const overrideWindowEthereum = () => {
  if (!window.ethereum) return;

  clearInterval(overrideInterval);
  // Recheck that we are still proxying window.ethereum every 10 seconds
  setInterval(overrideIfNotProxied, 10_000);

  const sendHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: (target: any, thisArg: any, argumentsList: any[]) => {
      const [payloadOrMethod, callbackOrParams] = argumentsList;
      const forwardToWallet = () =>
        Reflect.apply(target, thisArg, argumentsList);

      // ethereum.send has three overloads:

      // ethereum.send(method: string, params?: Array<unknown>): Promise<JsonRpcResponse>;
      // > gets handled like ethereum.request
      if (typeof payloadOrMethod === "string") {
        return window.ethereum.request({
          method: payloadOrMethod,
          params: callbackOrParams,
        });
      }

      // ethereum.send(payload: JsonRpcRequest): unknown;
      // > cannot contain signature requests
      if (!callbackOrParams) {
        return forwardToWallet();
      }

      // ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
      // > gets handled like ethereum.sendAsync
      return window.ethereum.sendAsync(payloadOrMethod, callbackOrParams);
    },
  };

  const sendAsyncHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: (target: any, thisArg: any, argumentsList: any[]) => {
      const [request, callback] = argumentsList;
      const forwardToWallet = () =>
        Reflect.apply(target, thisArg, argumentsList);

      if (request?.method === "eth_sendTransaction") {
        const [transaction] = request?.params ?? [];
        if (!transaction) return forwardToWallet();

        getChainIdAndUserAccount()
          .then(({ chainId, userAccount }) =>
            sendAndAwaitResponseFromStream<
              TransactionRequest,
              UserDecisionResponse
            >(
              stream,
              createTransactionRequestMessage(transaction, chainId, userAccount)
            ).then((response) => ({ response, chainId, userAccount }))
          )
          .then(({ response, chainId }) => {
            if (shouldForwardToWallet(response, chainId)) {
              return forwardToWallet();
            }

            logger.debug(response);
            const { isOk } = response.data;
            if (isOk) {
              const rpcResponse: JsonRpcResponse = {
                id: request?.id ?? randomId(),
                jsonrpc: "2.0",
                result: response.data.result,
              };
              callback(null, rpcResponse);
              return;
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "User denied transaction signature."
              );
              const response: JsonRpcError = {
                id: request?.id ?? randomId(),
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
              return;
            }
          });
      } else if (
        request?.method === "eth_signTypedData_v3" ||
        request?.method === "eth_signTypedData_v4"
      ) {
        const { signTypedDataVersion, typedData, address } =
          enhanceSignTypedData(request);
        if (!address || !typedData) return forwardToWallet();

        getChainIdAndUserAccount()
          .then(({ chainId, userAccount }) =>
            sendAndAwaitResponseFromStream<
              SignTypedDataRequest,
              UserDecisionResponse
            >(
              stream,
              createSignTypedDataRequestMessage(
                typedData,
                chainId,
                userAccount,
                signTypedDataVersion
              )
            ).then((response) => ({ response, chainId, userAccount }))
          )
          .then(({ response, chainId }) => {
            if (shouldForwardToWallet(response, chainId)) {
              return forwardToWallet();
            }

            logger.debug(response);
            const isOk = response.data.isOk;
            if (isOk) {
              const rpcResponse: JsonRpcResponse = {
                id: request?.id ?? randomId(),
                jsonrpc: "2.0",
                result: response.data.result,
              };

              callback(null, rpcResponse);
              return;
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "User denied message signature."
              );
              const response: JsonRpcError = {
                id: request?.id ?? randomId(),
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
              return;
            }
          });
      } else if (
        request?.method === "eth_sign" ||
        request?.method === "personal_sign"
      ) {
        const method: SignMessageMethod = request.method;
        const [first, second] = request?.params ?? [];
        if (!first || !second) return forwardToWallet();

        // if the first parameter is the address, the second is the message, otherwise the first is the message
        const message =
          String(first).replace(/0x/, "").length === 40 ? second : first;

        getChainIdAndUserAccount()
          .then(({ chainId, userAccount }) =>
            sendAndAwaitResponseFromStream<
              SignMessageRequest,
              UserDecisionResponse
            >(
              stream,
              createSignMessageRequestMessage(
                { method, message },
                chainId,
                userAccount
              )
            ).then((response) => ({ response, chainId, userAccount }))
          )
          .then(({ response, chainId }) => {
            if (shouldForwardToWallet(response, chainId)) {
              return forwardToWallet();
            }

            logger.debug(response);
            const { isOk } = response.data;
            if (isOk) {
              const rpcResponse: JsonRpcResponse = {
                id: request?.id ?? randomId(),
                jsonrpc: "2.0",
                result: response.data.result,
              };

              callback(null, rpcResponse);
              return;
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "User denied message signature."
              );
              const response: JsonRpcError = {
                id: request?.id ?? randomId(),
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
              return;
            }
          });
      } else {
        return forwardToWallet();
      }
    },
  };

  const requestHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      const forwardToWallet = () =>
        Reflect.apply(target, thisArg, argumentsList);

      if (
        (request.method === "eth_requestAccounts" ||
          request.method === "eth_accounts") &&
        IS_IMPERSONATION_AVAILABLE
      ) {
        try {
          const response = await sendAndAwaitResponseFromStream(
            stream,
            createBlowfishOptionRequestMessage(
              PREFERENCES_BLOWFISH_IMPERSONATION_WALLET
            )
          );
          const { address } =
            (response.data as BlowfishImpersonationWalletInfo) || {};

          if (address) {
            return [address];
          }
        } catch (err) {
          logger.error(err);
        }
      }

      if (request?.method === "eth_sendTransaction") {
        const [transaction] = request?.params ?? [];
        if (!transaction) return forwardToWallet();

        const { chainId, userAccount } = await getChainIdAndUserAccount();
        const response = await sendAndAwaitResponseFromStream<
          TransactionRequest,
          UserDecisionResponse
        >(
          stream,
          createTransactionRequestMessage(transaction, chainId, userAccount)
        );

        if (shouldForwardToWallet(response, chainId)) {
          return forwardToWallet();
        }

        logger.debug(response);
        const { isOk } = response.data;

        if (isOk) {
          return response.data.result;
        } else {
          throw ethErrors.provider.userRejectedRequest(
            "User denied transaction signature."
          );
        }
      } else if (
        request?.method === "eth_signTypedData" ||
        request?.method === "eth_signTypedData_v1" ||
        request?.method === "eth_signTypedData_v3" ||
        request?.method === "eth_signTypedData_v4"
      ) {
        const { signTypedDataVersion, address, typedData } =
          enhanceSignTypedData(request);
        if (!address || !typedData) return forwardToWallet();

        const { chainId, userAccount } = await getChainIdAndUserAccount();
        const response = await sendAndAwaitResponseFromStream<
          SignTypedDataRequest,
          UserDecisionResponse
        >(
          stream,
          createSignTypedDataRequestMessage(
            typedData,
            chainId,
            userAccount,
            signTypedDataVersion
          )
        );

        if (shouldForwardToWallet(response, chainId)) {
          return forwardToWallet();
        }

        logger.debug(response);
        const { isOk } = response.data;

        if (isOk) {
          return response.data.result;
        } else {
          throw ethErrors.provider.userRejectedRequest(
            "User denied message signature."
          );
        }
      } else if (
        request?.method === "eth_sign" ||
        request?.method === "personal_sign"
      ) {
        const method: SignMessageMethod = request?.method;
        const [first, second] = request?.params ?? [];
        if (!first || !second) return forwardToWallet();

        // if the first parameter is the address, the second is the message, otherwise the first is the message
        const message =
          String(first).replace(/0x/, "").length === 40 ? second : first;

        const { chainId, userAccount } = await getChainIdAndUserAccount();
        const response = await sendAndAwaitResponseFromStream<
          SignMessageRequest,
          UserDecisionResponse
        >(
          stream,
          createSignMessageRequestMessage(
            { method, message },
            chainId,
            userAccount
          )
        );

        if (shouldForwardToWallet(response, chainId)) {
          return forwardToWallet();
        }

        logger.debug(response);
        const { isOk } = response.data;

        if (isOk) {
          return response.data.result;
        } else {
          throw ethErrors.provider.userRejectedRequest(
            "User denied message signature."
          );
        }
      } else {
        return forwardToWallet();
      }
    },
  };

  requestProxy = new Proxy(window.ethereum.request, requestHandler);
  sendProxy = new Proxy(window.ethereum.send, sendHandler);
  sendAsyncProxy = new Proxy(window.ethereum.sendAsync, sendAsyncHandler);

  // NOTE(kimpers): Some wallets try to protect the properties of window.ethereum
  // by setting them to read-only, using Object.defineProperty circumvents that
  Object.defineProperty(window.ethereum, "request", {
    value: requestProxy,
    writable: false,
  });
  Object.defineProperty(window.ethereum, "send", {
    value: sendProxy,
    writable: false,
  });
  Object.defineProperty(window.ethereum, "sendAsync", {
    value: sendAsyncProxy,
    writable: false,
  });
};

const overrideInterval = setInterval(overrideWindowEthereum, 100);
overrideWindowEthereum();

export default {};
