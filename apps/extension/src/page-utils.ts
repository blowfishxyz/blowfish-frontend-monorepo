// NOTE: Methods using Browser.runtime.sendMessage have to be in source files
// only imported in extension pages otherwise it will silently break

import { Message, RequestType, UserDecisionData } from "@blowfish/utils/types";
import Browser from "webextension-polyfill";

export const respondWithUserDecision = async (id: string, isOk: boolean) => {
  // TODO(kimpers): Support more flexible responses
  const responseData: UserDecisionData = { isOk };
  const response: Message<UserDecisionData> = {
    id,
    type: RequestType.UserDecision,
    data: responseData,
  };

  await Browser.runtime.sendMessage(undefined, response);
};
