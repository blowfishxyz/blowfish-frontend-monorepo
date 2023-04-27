import {
  BlowfishOption,
  BlowfishOptionKey,
  BlowfishOptionKeyValue,
  BlowfishPausedOptionType,
  BlowfishPortalBackgroundMessage,
  Message,
  RequestType,
  UserDecisionOpts,
  UserDecisionResponse,
  isDappRequestMessage,
} from "@blowfish/utils/types";

import { MessageError } from "~utils/utils";

const sendAndAwaitAck = async (
  message: BlowfishPortalBackgroundMessage
): Promise<BlowfishPortalBackgroundMessage> => {
  const responsePromise = new Promise<BlowfishPortalBackgroundMessage>(
    (resolve) => {
      window.addEventListener("message", (event) => {
        const data = event.data as Message<
          RequestType,
          BlowfishPortalBackgroundMessage
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

export const sendWhitelistedDomain = async (domain: string) => {
  const message: Message<RequestType.SetBlowfishOptions, BlowfishOptionKey> = {
    id: "send-whitelisted-domain",
    data: { key: BlowfishOption.WHITELISTED_DOMAINS, value: domain },
    type: RequestType.SetBlowfishOptions,
  };
  return await sendAndAwaitAck(message);
};

export const getScanRequestFromMessageChannel = async (messageId: string) => {
  const message: Message<RequestType.GetRequestToScan, { key: string }> = {
    id: "get-request-to-scan",
    data: { key: messageId },
    type: RequestType.GetRequestToScan,
  };

  const response = await sendAndAwaitAck(message);

  if (isDappRequestMessage(response)) {
    return response;
  }

  throw new Error(MessageError.PARAMS_NOT_OK);
};
