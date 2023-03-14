import {
  UserDecisionResponse,
  UserDecisionOpts,
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

export const sendResult = async (
  id: string,
  result: string,
  opts?: UserDecisionOpts
) => {
  const message: Message<UserDecisionResponse> = {
    id,
    data: { isOk: true, result, opts },
    type: RequestType.UserDecision,
  };
  await sendAndAwaitAck(message);
};

export const sendAbort = async (id: string, opts?: UserDecisionOpts) => {
  const message: Message<UserDecisionResponse> = {
    id,
    data: { isOk: false, opts },
    type: RequestType.UserDecision,
  };
  await sendAndAwaitAck(message);
};
