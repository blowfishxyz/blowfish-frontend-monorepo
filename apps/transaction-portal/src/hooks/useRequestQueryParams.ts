import { useEffect, useState } from "react";
import qs from "qs";
import { chainIdToSupportedChainMapping } from "@blowfish/utils/chains";
import {
  Message,
  DappRequest,
  parseRequestFromMessage,
} from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/BlowfishApiClient";

import { logger } from "~utils/logger";

type HexString = `0x${string}`;
type RequestQueryParams =
  | {
      message: Message<DappRequest>;
      request: DappRequest;
      chainId: number;
      userAccount: HexString;
      chainNetwork?: ChainNetwork;
      chainFamily?: ChainFamily;
    }
  | Record<string, undefined>;

export const useRequestQueryParams = (): RequestQueryParams => {
  const [params, setParams] = useState<RequestQueryParams>({});
  useEffect(() => {
    const windowQs = window.location.search;
    const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs;
    // NOTE: We only pass Message through the query params
    const message = qs.parse(cleanedQs) as unknown as Message<DappRequest>;
    if (!message) {
      throw Error("No message found in query params");
    }
    const request = parseRequestFromMessage(message);
    if (!request) {
      throw Error("No request found in query params");
    }
    const chainId = parseInt(message.data.chainId.toString());
    const userAccount = request.userAccount as HexString;

    // NOTE: This should never happen since we verify
    // that the chain is supported before we create this page
    if (!chainIdToSupportedChainMapping[chainId]) {
      logger.debug(`Blowfish unsupported chainId ${chainId}`);
    }

    const { chainFamily, chainNetwork } =
      chainIdToSupportedChainMapping[chainId];

    setParams({
      message,
      request,
      chainId,
      userAccount,
      chainNetwork,
      chainFamily,
    });
  }, []);

  return params;
};
