import type { RequestType } from "@blowfish/utils/types";
import qs from "qs";
import Browser from "webextension-polyfill";

import { BLOWFISH_TRANSACTION_PORTAL_URL } from "../config";

export interface QueryParams {
  type: RequestType;
  extensionVersion: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export const createTransactionPortalTab = async (
  params: QueryParams
): Promise<Browser.Tabs.Tab> => {
  const queryString = qs.stringify(params);
  const tab = await Browser.tabs.create({
    url: `${BLOWFISH_TRANSACTION_PORTAL_URL}/scan?${queryString}`,
    active: true,
  });

  return tab;
};
