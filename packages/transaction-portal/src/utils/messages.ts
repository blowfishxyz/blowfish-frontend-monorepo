import { WindowPostMessageStream } from "@metamask/post-message-stream";

// TODO(kimpers): Share types between packages

export interface UserDecisionData {
  isOk: boolean;
}

export interface UntypedMessageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface Message<T extends object> {
  id: string;
  data: T;
  type: RequestType;
  origin?: string;
}

export enum Identifier {
  MetamaskInpage = "METAMASK_INPAGE",
  MetamaskContentScript = "METAMASK_CONTENT_SCRIPT",
  MetamaskProvider = "METAMASK_PROVIDER",
  Inpage = "BLOWFISH_INPAGE",
  ContentScript = "BLOWFISH_CONTENTSCRIPT",
  Confirm = "BLOWFISH_CONFIRM",
}

export enum RequestType {
  Transaction = "TRANSACTION",
  SignTypedData = "SIGN_TYPED_DATA",
  SignMessage = "SIGN_MESSAGE",
  UserDecision = "USER_DECISION",
  BlowfishOptions = "BLOWFISH_OPTIONS",
  MessageAck = "BLOWFISH_MESSAGE_ACK",
}

export const sendUserDecision = async (id: string, isOk: boolean) => {
  const message: Message<UserDecisionData> = {
    id,
    data: { isOk },
    type: RequestType.UserDecision,
  };

  const responsePromise = new Promise<void>((resolve) => {
    window.addEventListener("message", (event) => {
      const data = event.data as Message<UntypedMessageData>;
      if (data.id === id && data.type === RequestType.MessageAck) {
        resolve();
      }
    });
  });
  window.postMessage(message);
  await responsePromise;
};
