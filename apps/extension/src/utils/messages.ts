import {
  BatchRequestsRequest,
  BlowfishBlockDomainPayload,
  DappRequest,
  Message,
  RequestType,
  SignMessagePayload,
  SignMessageRequest,
  SignTypedDataRequest,
  SupportedSignTypedDataPayloadVersion,
  TransactionPayload,
  TransactionRequest,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import objectHash, { NotUndefined } from "object-hash";
import type { Duplex } from "readable-stream";
import type Browser from "webextension-polyfill";

import { BLOWFISH_EXTENSION_VERSION } from "~config";

export const createRawMessage = <T extends object>(
  type: RequestType,
  data: T
): Message<RequestType, T> => {
  const id = objectHash(data as NotUndefined);
  return { id, data, type };
};

export const createTransactionRequestMessage = (
  payload: TransactionPayload,
  chainId: number,
  userAccount: string
): Message<RequestType, TransactionRequest> => {
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

export const createSignTypedDataRequestMessage = (
  { payload, signTypedDataVersion }: SupportedSignTypedDataPayloadVersion,
  userAccount: string,
  chainId: number
): Message<RequestType, SignTypedDataRequest> => {
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
): Message<RequestType, SignMessageRequest> => {
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

export const createBatchRequestsRequestMessage = (
  chainId: number,
  userAccount: string
): Message<RequestType, BatchRequestsRequest> => {
  const type = RequestType.BatchRequests;
  const batchRequests: BatchRequestsRequest = {
    type,
    payload: undefined,
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
