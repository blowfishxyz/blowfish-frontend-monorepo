import { isSupportedChainId } from "@blowfish/utils/chains";
import { logger } from "@blowfish/utils/logger";
import {
  BatchRequests,
  Message,
  RequestType,
  SignMessageMethod,
  SignMessageRequest,
  SignTypedDataRequest,
  SignTypedDataVersion,
  TransactionRequest,
  TypedDataV1Field,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import type { WindowPostMessageStream } from "@metamask/post-message-stream";
import { EthereumProviderError, ethErrors } from "eth-rpc-errors";
import type { providers } from "ethers";

import { IS_IMPERSONATION_AVAILABLE } from "~config";

import {
  createBatchRequestsMessage,
  createSignMessageRequestMessage,
  createSignTypedDataRequestMessage,
  createTransactionRequestMessage,
  sendAndAwaitResponseFromStream,
} from "./messages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RpcRequest = any;

interface EthereumSignTypedDataRequest {
  method:
    | "eth_signTypedData"
    | "eth_signTypedData_v1"
    | "eth_signTypedData_v3"
    | "eth_signTypedData_v4";
  params: [string | TypedDataV1Field[], string];
}

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

export const requestHandler = async ({
  request: req,
  provider,
  stream,
  forwardToWallet,
  impersonatingAddress,
}: {
  request: RpcRequest;
  provider: providers.Web3Provider;
  stream: WindowPostMessageStream;
  forwardToWallet: () => unknown;
  impersonatingAddress: string | undefined;
}) => {
  const step1 = await processIfBatchRequests(req, provider, stream);
  if (step1.shouldForward) {
    return forwardToWallet();
  }
  if (step1.data) {
    return step1.data;
  }

  const { request } = step1;

  if (
    request.method === "wallet_requestPermissions" &&
    IS_IMPERSONATION_AVAILABLE &&
    impersonatingAddress
  ) {
    return [
      {
        type: "restrictReturnedAccounts",
        value: [impersonatingAddress],
      },
    ];
  }

  if (
    (request.method === "eth_requestAccounts" ||
      request.method === "eth_accounts") &&
    IS_IMPERSONATION_AVAILABLE &&
    impersonatingAddress
  ) {
    return [impersonatingAddress];
  }

  const step2 = await processIfSendTransaction(request, provider, stream);
  if (step2.shouldForward) {
    return forwardToWallet();
  }
  if (step2.data) {
    return step2.data;
  }

  const step3 = await processIfSignTypedData(request, provider, stream);
  if (step3.shouldForward) {
    return forwardToWallet();
  }
  if (step3.data) {
    return step3.data;
  }

  const step4 = await processIfMessageSignData(request, provider, stream);
  if (step4.shouldForward) {
    return forwardToWallet();
  }
  if (step4.data) {
    return step4.data;
  }

  return forwardToWallet();
};

export const sendAsyncHandler = async ({
  request: req,
  provider,
  stream,
  forwardToWallet,
  callback,
}: {
  request: RpcRequest;
  provider: providers.Web3Provider;
  stream: WindowPostMessageStream;
  forwardToWallet: () => unknown;
  callback: RpcRequest;
}) => {
  let request = req;
  try {
    const step1 = await processIfBatchRequests(req, provider, stream);
    if (step1.shouldForward) {
      return forwardToWallet();
    }
    if (step1.data) {
      const response = createRpcResponse(req[0]?.id, step1.data);
      callback(null, response);
      return;
    }
    request = step1.request;
  } catch (error) {
    if (error instanceof EthereumProviderError) {
      const response = createRpcError(req[0]?.id, error);
      callback(error, response);
      return;
    }
    forwardToWallet();
    return;
  }

  try {
    const step2 = await processIfSendTransaction(request, provider, stream);
    if (step2.shouldForward) {
      return forwardToWallet();
    }
    if (step2.data) {
      const response = createRpcResponse(request.id, step2.data);
      callback(null, response);
      return;
    }
  } catch (error) {
    if (error instanceof EthereumProviderError) {
      const response = createRpcError(request.id, error);
      callback(error, response);
      return;
    }
    forwardToWallet();
    return;
  }

  try {
    const step3 = await processIfSignTypedData(request, provider, stream);
    if (step3.shouldForward) {
      return forwardToWallet();
    }
    if (step3.data) {
      const response = createRpcResponse(request.id, step3.data);
      callback(null, response);
      return;
    }
  } catch (error) {
    if (error instanceof EthereumProviderError) {
      const response = createRpcError(request.id, error);
      callback(error, response);
      return;
    }
    forwardToWallet();
    return;
  }

  try {
    const step4 = await processIfMessageSignData(request, provider, stream);
    if (step4.shouldForward) {
      return forwardToWallet();
    }
    if (step4.data) {
      const response = createRpcResponse(request.id, step4.data);
      callback(null, response);
      return;
    }
  } catch (error) {
    if (error instanceof EthereumProviderError) {
      const response = createRpcError(request.id, error);
      callback(error, response);
      return;
    }
    forwardToWallet();
    return;
  }

  forwardToWallet();
};

const processIfBatchRequests = async (
  request: RpcRequest,
  provider: providers.Web3Provider,
  stream: WindowPostMessageStream
): Promise<
  | { shouldForward: true }
  | { shouldForward: false; data?: string; request: RpcRequest }
> => {
  if (Array.isArray(request)) {
    const nonNullRequest = request.filter((x) => x !== null);
    if (nonNullRequest.length > 1) {
      const { chainId, userAccount } = await getChainIdAndUserAccount(provider);
      const payload = batchPayloadFromRequest(
        nonNullRequest,
        chainId,
        userAccount
      );
      const response = await sendAndAwaitResponseFromStream<
        BatchRequests,
        UserDecisionResponse
      >(stream, createBatchRequestsMessage(payload, chainId, userAccount));

      if (shouldForwardToWallet(response, chainId)) {
        return { shouldForward: true };
      }

      logger.debug(response);
      const { isOk } = response.data;

      if (isOk) {
        return { shouldForward: false, data: response.data.result, request };
      } else {
        throw ethErrors.provider.userRejectedRequest(
          "User denied transaction signature."
        );
      }
    } else if (nonNullRequest.length === 1) {
      return { shouldForward: false, request: request[0] };
    }
  }
  return { shouldForward: false, request };
};

const processIfSendTransaction = async (
  request: RpcRequest,
  provider: providers.Web3Provider,
  stream: WindowPostMessageStream
): Promise<{ shouldForward: boolean; data?: string }> => {
  if (request?.method === "eth_sendTransaction") {
    const [transaction] = request?.params ?? [];
    if (!transaction) {
      return { shouldForward: true };
    }

    const { chainId, userAccount } = await getChainIdAndUserAccount(provider);
    const response = await sendAndAwaitResponseFromStream<
      TransactionRequest,
      UserDecisionResponse
    >(
      stream,
      createTransactionRequestMessage(transaction, chainId, userAccount)
    );

    if (shouldForwardToWallet(response, chainId)) {
      return { shouldForward: true };
    }

    logger.debug(response);
    const { isOk } = response.data;

    if (isOk) {
      return { shouldForward: false, data: response.data.result };
    } else {
      throw ethErrors.provider.userRejectedRequest(
        "User denied transaction signature."
      );
    }
  }
  return { shouldForward: false };
};

const processIfSignTypedData = async (
  request: RpcRequest,
  provider: providers.Web3Provider,
  stream: WindowPostMessageStream
): Promise<{ shouldForward: boolean; data?: string }> => {
  if (
    request?.method === "eth_signTypedData" ||
    request?.method === "eth_signTypedData_v1" ||
    request?.method === "eth_signTypedData_v3" ||
    request?.method === "eth_signTypedData_v4"
  ) {
    const { signTypedDataVersion, address, typedData } =
      enhanceSignTypedData(request);
    if (!address || !typedData) {
      return { shouldForward: true };
    }

    const { chainId, userAccount } = await getChainIdAndUserAccount(provider);
    const response = await sendAndAwaitResponseFromStream<
      SignTypedDataRequest,
      UserDecisionResponse
    >(
      stream,
      createSignTypedDataRequestMessage(
        {
          payload: typedData,
          signTypedDataVersion,
        },
        userAccount,
        chainId
      )
    );

    if (shouldForwardToWallet(response, chainId)) {
      return { shouldForward: true };
    }

    logger.debug(response);
    const { isOk } = response.data;

    if (isOk) {
      return { shouldForward: false, data: response.data.result };
    } else {
      throw ethErrors.provider.userRejectedRequest(
        "User denied message signature."
      );
    }
  }
  return { shouldForward: false };
};

const processIfMessageSignData = async (
  request: RpcRequest,
  provider: providers.Web3Provider,
  stream: WindowPostMessageStream
): Promise<{ shouldForward: boolean; data?: string }> => {
  if (request?.method === "eth_sign" || request?.method === "personal_sign") {
    const method: SignMessageMethod = request?.method;
    const [first, second] = request?.params ?? [];
    if (!first || !second) {
      return { shouldForward: true };
    }

    // if the first parameter is the address, the second is the message, otherwise the first is the message
    const message =
      String(first).replace(/0x/, "").length === 40 ? second : first;

    const { chainId, userAccount } = await getChainIdAndUserAccount(provider);
    const response = await sendAndAwaitResponseFromStream<
      SignMessageRequest,
      UserDecisionResponse
    >(
      stream,
      createSignMessageRequestMessage({ method, message }, chainId, userAccount)
    );

    const isConfirmedPersonalSign =
      response.data.isOk && request.method === "personal_sign";
    if (shouldForwardToWallet(response, chainId) || isConfirmedPersonalSign) {
      return { shouldForward: true };
    }

    logger.debug(response);
    const { isOk } = response.data;

    if (isOk) {
      return { shouldForward: false, data: response.data.result };
    } else {
      throw ethErrors.provider.userRejectedRequest(
        "User denied message signature."
      );
    }
  }
  return { shouldForward: false };
};

const batchPayloadFromRequest = (
  requests: RpcRequest[],
  chainId: number,
  userAccount: string
) => {
  return requests
    .map((x) => {
      if (x.method === "eth_sendTransaction") {
        const [transaction] = x?.params ?? [];
        if (transaction) {
          return createTransactionRequestMessage(
            transaction,
            chainId,
            userAccount
          );
        }
      }

      if (
        x?.method === "eth_signTypedData" ||
        x?.method === "eth_signTypedData_v1" ||
        x?.method === "eth_signTypedData_v3" ||
        x?.method === "eth_signTypedData_v4"
      ) {
        const { signTypedDataVersion, address, typedData } =
          enhanceSignTypedData(x);
        if (address && typedData) {
          return createSignTypedDataRequestMessage(
            {
              payload: typedData,
              signTypedDataVersion,
            },
            userAccount,
            chainId
          );
        }
      }

      if (x?.method === "eth_sign" || x?.method === "personal_sign") {
        const method: SignMessageMethod = x?.method;
        const [first, second] = x?.params ?? [];
        if (first && second) {
          // if the first parameter is the address, the second is the message, otherwise the first is the message
          const message =
            String(first).replace(/0x/, "").length === 40 ? second : first;

          return createSignMessageRequestMessage(
            { method, message },
            chainId,
            userAccount
          );
        }
      }

      return null;
    })
    .filter(notEmpty);
};

const randomId = () => Math.floor(Math.random() * 1_000_000);

const createRpcError = (
  requestId: number | undefined,
  error: EthereumProviderError<unknown>
): JsonRpcError => {
  return {
    id: requestId ?? randomId(),
    jsonrpc: "2.0",
    error,
  };
};

const createRpcResponse = (
  requestId: number | undefined,
  result: string
): JsonRpcResponse => {
  return {
    id: requestId ?? randomId(),
    jsonrpc: "2.0",
    result,
  };
};

const enhanceSignTypedData = (request: EthereumSignTypedDataRequest) => {
  const { method, params } = request;
  switch (method) {
    case "eth_signTypedData":
    case "eth_signTypedData_v1": {
      if (Array.isArray(params[0])) {
        const [typedData, address] = params;
        return {
          signTypedDataVersion: SignTypedDataVersion.V1,
          address,
          typedData,
        };
      }
      const [address, data] = params;
      return {
        signTypedDataVersion: SignTypedDataVersion.V4,
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
            ? SignTypedDataVersion.V3
            : SignTypedDataVersion.V4,
        address,
        typedData: data ? JSON.parse(data) : null,
      };
    }
    default:
      throw new Error(`Unknown eth_signTypedData version. Method: ${method}`);
  }
};

const isScanningPaused = (
  response: Message<RequestType, UserDecisionResponse>
) => {
  return !!response.data.opts?.pauseScan;
};

const shouldForwardToWallet = (
  response: Message<RequestType, UserDecisionResponse>,
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

const getChainIdAndUserAccount = async (
  provider: providers.Web3Provider
): Promise<{
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

const notEmpty = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  return value !== null && value !== undefined;
};
