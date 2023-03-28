import {
  BlowfishOption,
  BlowfishOptionKey,
  BlowfishOptionKeyValue,
  BlowfishPausedOptionType,
  BlowfishPortalBackgroundMessage,
  DappRequest,
  Message,
  RequestType,
  UserDecisionOpts,
  UserDecisionResponse,
} from "@blowfish/utils/types";

const sendAndAwaitAck = async (
  message: BlowfishPortalBackgroundMessage
): Promise<BlowfishPortalBackgroundMessage["data"]> => {
  const responsePromise = new Promise<BlowfishPortalBackgroundMessage["data"]>(
    (resolve) => {
      window.addEventListener("message", (event) => {
        const data = event.data as Message<
          RequestType,
          BlowfishPortalBackgroundMessage["data"]
        >;
        if (data.id === message.id && data.type === RequestType.MessageAck) {
          resolve(data.data);
        }
      });
    }
  );
  window.postMessage(message);
  return await responsePromise;
};

export const sendResult = async (
  id: string,
  result: string,
  opts?: UserDecisionOpts
) => {
  const message: Message<RequestType.UserDecision, UserDecisionResponse> = {
    id,
    data: { isOk: true, result, opts },
    type: RequestType.UserDecision,
  };
  await sendAndAwaitAck(message);
};

export const sendAbort = async (id: string, opts?: UserDecisionOpts) => {
  const message: Message<RequestType.UserDecision, UserDecisionResponse> = {
    id,
    data: { isOk: false, opts },
    type: RequestType.UserDecision,
  };
  await sendAndAwaitAck(message);
};

export const sendPauseResumeSelection = async (
  pauseOption: BlowfishPausedOptionType
) => {
  const message: Message<
    RequestType.SetBlowfishOptions,
    BlowfishOptionKeyValue
  > = {
    id: "set-pause-resume-selection",
    data: {
      key: BlowfishOption.PREFERENCES_BLOWFISH_PAUSED,
      value: pauseOption,
    },
    type: RequestType.SetBlowfishOptions,
  };
  await sendAndAwaitAck(message);
};

export const getPauseResumeSelection = async () => {
  const message: Message<RequestType.BlowfishOptions, BlowfishOptionKey> = {
    id: "get-pause-resume-selection",
    data: { key: BlowfishOption.PREFERENCES_BLOWFISH_PAUSED },
    type: RequestType.BlowfishOptions,
  };
  return await sendAndAwaitAck(message);
};

export const getTransactionToScan = async (messageId: string) => {
  const message: Message<RequestType.GetTransactionToScan, { key: string }> = {
    id: "get-transaction-to-scan",
    data: { key: messageId },
    type: RequestType.GetTransactionToScan,
  };
  return (await sendAndAwaitAck(message)) as unknown as Message<
    DappRequest["type"],
    DappRequest
  >;
};
