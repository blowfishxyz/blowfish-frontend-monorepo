import {
  BatchRequests,
  BatchRequestsPayload,
  BlowfishBlockDomainPayload,
  DappRequest,
  Message,
  RequestType,
  SignMessagePayload,
  SignMessageRequest,
  SignTypedDataRequest,
  SolanaSignTransactionsPayload,
  SolanaSignTransactionsRequest,
  SupportedSignTypedDataPayloadVersion,
  TransactionPayload,
  TransactionRequest,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import objectHash, { NotUndefined } from "object-hash";
import type { Duplex } from "readable-stream";
import type Browser from "webextension-polyfill";

import { BLOWFISH_EXTENSION_VERSION } from "~config";

export const createRawMessage = <TType extends RequestType, T extends object>(
  type: TType,
  data: T
): Message<TType, T> => {
  const id = objectHash(data as NotUndefined);
  return { id, data, type };
};

export const createTransactionRequestMessage = (
  payload: TransactionPayload,
  chainId: number,
  userAccount: string
): Message<RequestType.Transaction, TransactionRequest> => {
  const type = RequestType.Transaction;
  const transactionRequest: TransactionRequest = {
    type,
    payload,
    chainId: chainId.toString(),
    userAccount,
    extensionVersion: BLOWFISH_EXTENSION_VERSION,
  };
  return createRawMessage(type, transactionRequest);
};

export const createSolanaSignTransactionsMessage = (
  payload: SolanaSignTransactionsPayload,
  userAccount: string,
  method: "sign" | "signAndSend"
): Message<
  RequestType.SolanaSignTransactions,
  SolanaSignTransactionsRequest
> => {
  const type = RequestType.SolanaSignTransactions;
  const transactionRequest: SolanaSignTransactionsRequest = {
    type,
    method,
    payload,
    chainId: "solana:101",
    userAccount,
    extensionVersion: BLOWFISH_EXTENSION_VERSION,
  };
  return createRawMessage(type, transactionRequest);
};

export const createSignTypedDataRequestMessage = (
  { payload, signTypedDataVersion }: SupportedSignTypedDataPayloadVersion,
  userAccount: string,
  chainId: number
): Message<RequestType.SignTypedData, SignTypedDataRequest> => {
  const type = RequestType.SignTypedData;
  const signTypedDataRequest: SignTypedDataRequest = {
    payload,
    signTypedDataVersion,
    userAccount,
    chainId: chainId.toString(),
    type,
    extensionVersion: BLOWFISH_EXTENSION_VERSION,
  } as SignTypedDataRequest;
  return createRawMessage(type, signTypedDataRequest);
};

export const createSignMessageRequestMessage = (
  payload: SignMessagePayload,
  chainId: number,
  userAccount: string
): Message<RequestType.SignMessage, SignMessageRequest> => {
  const type = RequestType.SignMessage;
  const messageRequest: SignMessageRequest = {
    type,
    payload,
    chainId: chainId.toString(),
    userAccount,
    extensionVersion: BLOWFISH_EXTENSION_VERSION,
  };
  return createRawMessage(type, messageRequest);
};

export const createBatchRequestsMessage = (
  payload: BatchRequestsPayload,
  chainId: number,
  userAccount: string
): Message<RequestType.BatchRequests, BatchRequests> => {
  const type = RequestType.BatchRequests;
  const batchRequests: BatchRequests = {
    type,
    payload,
    chainId: chainId.toString(),
    userAccount,
    extensionVersion: BLOWFISH_EXTENSION_VERSION,
  };
  return createRawMessage(type, batchRequests);
};

export const sendAndAwaitResponseFromStream = <
  T extends object,
  R extends object
>(
  stream: Duplex,
  request: Message<RequestType, T>
): Promise<Message<RequestType, R>> => {
  stream.write(request);

  return new Promise((resolve) => {
    const callback = (response: Message<RequestType, R>): void => {
      if (response.id === request.id) {
        stream.off("data", callback);
        resolve(response);
      }
    };

    stream.on("data", callback);
  });
};

export const sendAndAwaitResponseFromPort = (
  stream: Browser.Runtime.Port,
  request: Message<RequestType, DappRequest>
): Promise<Message<RequestType, DappRequest>> => {
  stream.postMessage(request);

  return new Promise((resolve) => {
    const callback = (response: Message<RequestType, DappRequest>): void => {
      if (response.id === request.id) {
        stream.onMessage.removeListener(callback);
        resolve(response);
      }
    };

    stream.onMessage.addListener(callback);
  });
};

// NOTE: It is used in 3 cases:
// 1. When the user closes the portal window (we assume the user wants to cancel)
// 2. When the scanning is paused
// 3. Unsupported chain
export const postResponseToPort = (
  remotePort: Browser.Runtime.Port,
  originalMessage: Message<RequestType, DappRequest>,
  responseData: UserDecisionResponse
): Message<RequestType, UserDecisionResponse> => {
  const response: Message<RequestType.UserDecision, UserDecisionResponse> = {
    ...originalMessage,
    type: RequestType.UserDecision,
    data: responseData,
  };

  remotePort.postMessage(response);
  return response;
};

export const createBlockDomainRequestMessage = (
  payload: BlowfishBlockDomainPayload
) => {
  const type = RequestType.BlockDomain;

  return createRawMessage(type, payload);
};
