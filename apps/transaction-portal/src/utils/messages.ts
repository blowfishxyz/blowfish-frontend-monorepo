import {
  UserDecisionData,
  UntypedMessageData,
  RequestType,
  Message,
} from "@blowfish/utils/types";

const sendAndAwaitAck = async (
  message: Message<UntypedMessageData>
): Promise<void> => {
  const responsePromise = new Promise<void>((resolve) => {
    window.addEventListener("message", (event) => {
      const data = event.data as Message<UntypedMessageData>;
      if (data.id === message.id && data.type === RequestType.MessageAck) {
        resolve();
      }
    });
  });
  window.postMessage(message);
  await responsePromise;
};

export const sendResult = async (id: string, result: string) => {
  const message: Message<UserDecisionData> = {
    id,
    data: { isOk: true, result },
    type: RequestType.UserDecision,
  };
  await sendAndAwaitAck(message);
};

export const sendAbort = async (id: string) => {
  const message: Message<UserDecisionData> = {
    id,
    data: { isOk: false },
    type: RequestType.UserDecision,
  };
  await sendAndAwaitAck(message);
};
