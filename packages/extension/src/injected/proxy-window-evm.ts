// NOTE: This logic has been borrowed from RevokeCash/browser-extension and modified
// See https://github.com/RevokeCash/browser-extension/blob/d49f1de92003681b9e768782f54e734a52a5d975/src/injected/proxy-window-ethereum.tsx
// The RevokeCash/browser-extension code is MIT licensed
import { WindowPostMessageStream } from "@metamask/post-message-stream";
import { ethErrors } from "eth-rpc-errors";
import { providers } from "ethers";

import { PREFERENCES_BLOWFISH_IMPERSONATION_WALLET } from "~utils/storage";

import { Identifier, SignMessageMethod } from "../types";
import { logger } from "../utils/logger";
import {
  createSignMessageRequestMessage,
  createSignTypedDataRequestMessage,
  createTransactionRequestMessage,
  sendAndAwaitResponseFromStream,
} from "../utils/messages";

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

const getChainIdAndUserAccount = async (): Promise<{
  chainId: number;
  userAccount: string;
}> => {
  const provider = new providers.Web3Provider(window.ethereum);
  const [chainId, accounts] = await Promise.all([
    provider.getNetwork().then(({ chainId }) => chainId),
    provider.listAccounts(),
  ]);
  // NOTE: The connected account will always be the first account in the list
  const userAccount = accounts[0];

  return { chainId, userAccount };
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
        return Reflect.apply(target, thisArg, argumentsList);
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

      if (request?.method === "eth_sendTransaction") {
        const [transaction] = request?.params ?? [];
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        getChainIdAndUserAccount()
          .then(({ chainId, userAccount }) =>
            sendAndAwaitResponseFromStream(
              stream,
              createTransactionRequestMessage(transaction, chainId, userAccount)
            )
          )
          .then((response) => {
            getChainIdAndUserAccount();
            logger.debug(response);
            const { isOk } = response.data;
            if (isOk) {
              return Reflect.apply(target, thisArg, argumentsList);
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "User denied transaction signature."
              );
              const response = {
                id: request?.id,
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
            }
          });
      } else if (
        request?.method === "eth_signTypedData_v3" ||
        request?.method === "eth_signTypedData_v4"
      ) {
        const [address, typedDataStr] = request?.params ?? [];
        if (!address || !typedDataStr)
          return Reflect.apply(target, thisArg, argumentsList);

        const typedData = JSON.parse(typedDataStr);

        getChainIdAndUserAccount()
          .then(({ chainId, userAccount }) =>
            sendAndAwaitResponseFromStream(
              stream,
              createSignTypedDataRequestMessage(typedData, chainId, userAccount)
            )
          )
          .then((response) => {
            logger.debug(response);
            const isOk = response.data.isOk;
            if (isOk) {
              return Reflect.apply(target, thisArg, argumentsList);
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "User denied message signature."
              );
              const response = {
                id: request?.id,
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
            }
          });
      } else if (
        request?.method === "eth_sign" ||
        request?.method === "personal_sign"
      ) {
        const method: SignMessageMethod = request.method;
        const [first, second] = request?.params ?? [];
        if (!first || !second)
          return Reflect.apply(target, thisArg, argumentsList);

        // if the first parameter is the address, the second is the message, otherwise the first is the message
        const message =
          String(first).replace(/0x/, "").length === 40 ? second : first;

        getChainIdAndUserAccount()
          .then(({ chainId, userAccount }) =>
            sendAndAwaitResponseFromStream(
              stream,
              createSignMessageRequestMessage(
                { method, message },
                chainId,
                userAccount
              )
            )
          )
          .then((response) => {
            logger.debug(response);
            const { isOk } = response.data;
            if (isOk) {
              return Reflect.apply(target, thisArg, argumentsList);
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "User denied message signature."
              );
              const response = {
                id: request?.id,
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
            }
          });
      } else {
        return Reflect.apply(target, thisArg, argumentsList);
      }
    },
  };

  const requestHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      if (
        request.method === "eth_requestAccounts" ||
        request.method === "eth_accounts"
      ) {
        const impersonatingWallet = localStorage.getItem(
          PREFERENCES_BLOWFISH_IMPERSONATION_WALLET
        );

        if (impersonatingWallet) {
          return [impersonatingWallet];
        }
      }

      if (request?.method === "eth_sendTransaction") {
        const [transaction] = request?.params ?? [];
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const { chainId, userAccount } = await getChainIdAndUserAccount();
        const response = await sendAndAwaitResponseFromStream(
          stream,
          createTransactionRequestMessage(transaction, chainId, userAccount)
        );

        logger.debug(response);
        const { isOk } = response.data;

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest(
            "User denied transaction signature."
          );
        }
      } else if (
        request?.method === "eth_signTypedData_v3" ||
        request?.method === "eth_signTypedData_v4"
      ) {
        const [address, typedDataStr] = request?.params ?? [];
        if (!address || !typedDataStr)
          return Reflect.apply(target, thisArg, argumentsList);

        const typedData = JSON.parse(typedDataStr);

        const { chainId, userAccount } = await getChainIdAndUserAccount();
        const response = await sendAndAwaitResponseFromStream(
          stream,
          createSignTypedDataRequestMessage(typedData, chainId, userAccount)
        );
        logger.debug(response);
        const { isOk } = response.data;

        if (!isOk) {
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
        if (!first || !second)
          return Reflect.apply(target, thisArg, argumentsList);

        // if the first parameter is the address, the second is the message, otherwise the first is the message
        const message =
          String(first).replace(/0x/, "").length === 40 ? second : first;

        const { chainId, userAccount } = await getChainIdAndUserAccount();
        const response = await sendAndAwaitResponseFromStream(
          stream,
          createSignMessageRequestMessage(
            { method, message },
            chainId,
            userAccount
          )
        );

        logger.debug(response);
        const { isOk } = response.data;

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest(
            "User denied message signature."
          );
        }
      }

      return Reflect.apply(target, thisArg, argumentsList);
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

const overrideInterval: NodeJS.Timer = setInterval(overrideWindowEthereum, 100);
overrideWindowEthereum();

export default {};
