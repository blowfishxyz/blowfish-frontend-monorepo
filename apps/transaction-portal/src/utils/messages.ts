import {
  BlowfishPausedOptionType,
  PREFERENCES_BLOWFISH_PAUSED,
} from "@blowfish/hooks";
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

const sendAndAwaitResponse = async (
  message: Message<UntypedMessageData>
): Promise<UntypedMessageData> => {
  const responsePromise = new Promise<UntypedMessageData>((resolve) => {
    window.addEventListener("message", (event) => {
      const data = event.data as Message<UntypedMessageData>;
      if (data.id === message.id && data.type === RequestType.MessageAck) {
        resolve(data.data);
      }
    });
  });
  window.postMessage(message);
  return await responsePromise;
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

export const sendPauseResumeSelection = async (
  pauseOption: BlowfishPausedOptionType
) => {
  const message: Message<BlowfishPausedOptionType> = {
    id: "set-pause-resume-selection",
    data: pauseOption,
    type: RequestType.SetBlowfishOptions,
  };
  await sendAndAwaitAck(message);
};

export const getPauseResumeSelection = async () => {
  const message: Message<{ option: string }> = {
    id: "get-pause-resume-selection",
    data: { option: PREFERENCES_BLOWFISH_PAUSED },
    type: RequestType.BlowfishOptions,
  };
  return (await sendAndAwaitResponse(message)) as BlowfishPausedOptionType;
};
