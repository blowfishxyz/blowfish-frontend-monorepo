import objectHash from "object-hash";
import { Duplex } from "readable-stream";
import Browser from "webextension-polyfill";

import {
  RequestType,
  TransactionPayload,
  TransactionRequest,
  SignTypedDataPayload,
  SignTypedDataRequest,
  SignMessagePayload,
  SignMessageRequest,
  UntypedMessageData,
  Message,
} from "../types";

const createRawMessage = <T extends object>(
  type: RequestType,
  data: T
): Message<T> => {
  const id = objectHash(data);
  return { id, data, type };
};

export const createTransactionRequestMessage = (
  payload: TransactionPayload,
  chainId: number,
  userAccount: string
): Message<TransactionRequest> => {
  const type = RequestType.Transaction;
  const transactionRequest: TransactionRequest = {
    type,
    payload,
    chainId: chainId.toString(),
    userAccount,
  };
  return createRawMessage(type, transactionRequest);
};

export const createSignTypedDataRequestMessage = (
  payload: SignTypedDataPayload,
  chainId: number,
  userAccount: string
): Message<SignTypedDataRequest> => {
  const type = RequestType.SignTypedData;
  const signTypedDataRequest: SignTypedDataRequest = {
    type,
    payload,
    chainId: chainId.toString(),
    userAccount,
  };
  return createRawMessage(type, signTypedDataRequest);
};

export const createSignMessageRequestMessage = (
  payload: SignMessagePayload,
  chainId: number,
  userAccount: string
): Message<SignMessageRequest> => {
  const type = RequestType.SignMessage;
  const messageRequest: SignMessageRequest = {
    type,
    payload,
    chainId: chainId.toString(),
    userAccount,
  };
  return createRawMessage(type, messageRequest);
};

export const sendAndAwaitResponseFromStream = <T extends object>(
  stream: Duplex,
  request: Message<T>
): Promise<Message<UntypedMessageData>> => {
  stream.write(request);

  return new Promise((resolve) => {
    const callback = (response: Message<UntypedMessageData>): void => {
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
  request: Message<UntypedMessageData>
): Promise<Message<UntypedMessageData>> => {
  stream.postMessage(request);

  return new Promise((resolve) => {
    const callback = (response: Message<UntypedMessageData>): void => {
      if (response.id === request.id) {
        stream.onMessage.removeListener(callback);
        resolve(response);
      }
    };

    stream.onMessage.addListener(callback);
  });
};

export interface UserDecisionData {
  isOk: boolean;
}

export const postResponseToPort = (
  remotePort: Browser.Runtime.Port,
  originalMessage: Message<UntypedMessageData>,
  responseData: UntypedMessageData
): Message<UntypedMessageData> => {
  const response: Message<UntypedMessageData> = {
    ...originalMessage,
    data: responseData,
  };

  remotePort.postMessage(response);
  return response;
};
