import { useEffect, useState } from "react";
import { chainIdToSupportedChainMapping } from "@blowfish/utils/chains";
import {
  DappRequest,
  Message,
  parseRequestFromMessage,
} from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/BlowfishApiClient";

import { logger } from "~utils/logger";
import { useRouter } from "next/router";
import {
  checkVersionAndTransformMessage,
  getScanRequestFromUrl,
  MessageError,
} from "~utils/utils";
import { getScanRequestFromMessageChannel } from "~utils/messages";

type HexString = `0x${string}`;
type RequestParams =
  | {
      message: Message<DappRequest["type"], DappRequest>;
      request: DappRequest;
      chainId: number;
      userAccount: HexString;
      chainNetwork?: ChainNetwork;
      chainFamily?: ChainFamily;
      impersonatingWallet?: string;
      isImpersonatingWallet: boolean;
      paramError: boolean;
      isExtensionOutdated: boolean;
    }
  | Record<string, undefined>;

export const useGetRequestParams = (): RequestParams => {
  const router = useRouter();
  // NOTE: extensionVersion, origin, type only available on url scan
  const { id, extensionVersion, origin, type } = router.query;
  // NOTE: used to check if params are sent via URL
  const isUrlScan = type !== undefined;
  const [params, setParams] = useState<RequestParams>({});
  const [errorMessage, setErrorMessage] = useState<MessageError | null>(null);
  const [paramError, setParamError] = useState(false);
  const [isExtensionOutdated, setIsExtensionOutdated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!id) throw Error(MessageError.PARAMS_NOK);

        const message = checkVersionAndTransformMessage(
          isUrlScan
            ? getScanRequestFromUrl(
                String(id),
                extensionVersion as string,
                origin as string
              )
            : await getScanRequestFromMessageChannel(String(id))
        );

        const request = parseRequestFromMessage(message);
        if (!request) throw Error(MessageError.PARAMS_NOK);

        const chainId = parseInt(message.data.chainId.toString());
        if (!chainId) throw Error(MessageError.PARAMS_NOK);

        const isImpersonatingWallet = isUrlScan
          ? request.isImpersonatingWallet === "true"
          : !!request.isImpersonatingWallet;

        // NOTE: This should never happen since we verify
        // that the chain is supported before we create this page
        const supportedChain = chainIdToSupportedChainMapping[chainId];
        if (!supportedChain) {
          logger.debug(`Blowfish unsupported chainId ${chainId}`);
        }

        setParams({
          message,
          request,
          chainId,
          userAccount: request.userAccount as HexString,
          chainNetwork: supportedChain?.chainNetwork,
          chainFamily: supportedChain?.chainFamily,
          isImpersonatingWallet,
          impersonatingWallet: isImpersonatingWallet
            ? request.userAccount
            : undefined,
          paramError: false,
          isExtensionOutdated: false,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    })();
  }, [extensionVersion, id, isUrlScan, origin]);

  useEffect(() => {
    setParamError(errorMessage === MessageError.PARAMS_NOK);
    setIsExtensionOutdated(errorMessage === MessageError.OUTDATED_EXTENSION);
  }, [errorMessage]);

  return {
    ...params,
    paramError,
    isExtensionOutdated,
  } as RequestParams;
};
