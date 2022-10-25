// NOTE: Methods using Browser.runtime.sendMessage have to be in source files
// only imported in extension pages otherwise it will silently break
import Browser from "webextension-polyfill";
import { Message, RequestType, UserDecisionData } from "../types";

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
