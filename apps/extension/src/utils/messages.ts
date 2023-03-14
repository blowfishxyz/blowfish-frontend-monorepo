import {
  BlowfishOptionRequest,
  Message,
  RequestType,
  SignMessagePayload,
  SignMessageRequest,
  SignTypedDataPayload,
  SignTypedDataRequest,
  TransactionPayload,
  TransactionRequest,
  UntypedMessageData,
} from "@blowfish/utils/types";
import objectHash, { NotUndefined } from "object-hash";
import type { Duplex } from "readable-stream";
import type Browser from "webextension-polyfill";

const createRawMessage = <T extends object>(
  type: RequestType,
  data: T
): Message<T> => {
  const id = objectHash(data as NotUndefined);
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

export const createBlowfishOptionRequestMessage = (
  option: string
): Message<BlowfishOptionRequest> => {
  const type = RequestType.BlowfishOptions;
  const messageRequest: BlowfishOptionRequest = {
    type,
    option,
  };
  return createRawMessage(type, messageRequest);
};

export const sendAndAwaitResponseFromStream = <
  T extends object,
  R extends object
>(
  stream: Duplex,
  request: Message<T>
): Promise<Message<R>> => {
  stream.write(request);

  return new Promise((resolve) => {
    const callback = (response: Message<R>): void => {
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
