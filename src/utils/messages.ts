import objectHash from "object-hash";
import { Duplex } from "readable-stream";
import Browser from "webextension-polyfill";

import { RequestType } from "./constants";

interface MessageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
// TODO(kimpers): Type message
export interface Message {
  id: string;
  data: MessageData;
  type: RequestType;
  hostname?: string;
}

export const createMessage = (
  type: RequestType,
  data: MessageData,
  hostname?: string
): Message => {
  const id = objectHash(data);
  return { id, data, type, hostname };
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
