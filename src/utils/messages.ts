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
  MessageData,
  Message,
} from "../types";

const createRawMessage = (type: RequestType, data: MessageData): Message => {
  const id = objectHash(data);
  return { id, data, type };
};

export const createTransactionRequestMessage = (
  payload: TransactionPayload,
  chainId: number
): Message => {
  const type = RequestType.Transaction;
  const transactionRequest: TransactionRequest = {
    type,
    payload,
    chainId: chainId.toString(),
  };
  return createRawMessage(type, transactionRequest);
};

export const createSignTypedDataRequestMessage = (
  payload: SignTypedDataPayload,
  chainId: number
): Message => {
  const type = RequestType.SignTypedData;
  const transactionRequest: SignTypedDataRequest = {
    type,
    payload,
    chainId: chainId.toString(),
  };
  return createRawMessage(type, transactionRequest);
};

export const createSignMessageRequestMessage = (
  payload: SignMessagePayload,
  chainId: number
): Message => {
  const type = RequestType.SignMessage;
  const transactionRequest: SignMessageRequest = {
    type,
    payload,
    chainId: chainId.toString(),
  };
  return createRawMessage(type, transactionRequest);
};

export const postResponseToPort = (
  remotePort: Browser.Runtime.Port,
  originalMessage: Message,
  responseData: MessageData
): Message => {
  const response: Message = {
    ...originalMessage,
    data: responseData,
  };

  remotePort.postMessage(response);
  return response;
};

export const sendAndAwaitResponseFromStream = (
  stream: Duplex,
  request: Message
): Promise<Message> => {
  stream.write(request);

  return new Promise((resolve) => {
    const callback = (response: Message): void => {
      console.log(response);
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
  request: Message
): Promise<Message> => {
  stream.postMessage(request);

  return new Promise((resolve) => {
    const callback = (response: Message): void => {
      if (response.id === request.id) {
        stream.onMessage.removeListener(callback);
        resolve(response);
      }
    };

    stream.onMessage.addListener(callback);
  });
};
