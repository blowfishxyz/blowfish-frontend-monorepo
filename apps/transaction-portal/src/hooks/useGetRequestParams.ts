import { ChainFamily, ChainNetwork } from "@blowfish/utils/BlowfishApiClient";
import { chainIdToSupportedChainMapping } from "@blowfish/utils/chains";
import {
  DappRequest,
  Message,
  ParsedScanUrl,
  isUrlScan,
  parseRequestFromMessage,
} from "@blowfish/utils/types";
import { useEffect, useState } from "react";

import { useParsedRequestScanUrl } from "~hooks/useParsedRequestScanUrl";
import { getScanRequestFromMessageChannel } from "~utils/messages";
import { MessageError, checkVersionAndTransformMessage } from "~utils/utils";

import { useRequestChainId } from "./useRequestChainId";

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
  const requestChainId = useRequestChainId();
  const requestMessage = useParsedRequestScanUrl<ParsedScanUrl>();
  const [params, setParams] = useState<RequestParams>({});
  const [errorMessage, setErrorMessage] = useState<MessageError | null>(null);
  const [paramError, setParamError] = useState(false);
  const [isExtensionOutdated, setIsExtensionOutdated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!requestMessage.id || !requestChainId) {
          throw Error(MessageError.PARAMS_NOT_OK);
        }

        //TODO: We should remove the urlScan as soon as possible since it introduces a security risk
        const message = checkVersionAndTransformMessage(
          isUrlScan(requestMessage)
            ? requestMessage
            : await getScanRequestFromMessageChannel(requestMessage.id)
        );

        const request = parseRequestFromMessage(message);
        if (!request || !message || !message.origin) {
          throw Error(MessageError.PARAMS_NOT_OK);
        }

        const isImpersonatingWallet = !!request.isImpersonatingWallet;
        const supportedChain = chainIdToSupportedChainMapping[requestChainId];

        setParams({
          message,
          request,
          chainId: requestChainId,
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
  }, [requestChainId, requestMessage]);

  useEffect(() => {
    setParamError(errorMessage === MessageError.PARAMS_NOT_OK);
    setIsExtensionOutdated(errorMessage === MessageError.OUTDATED_EXTENSION);
  }, [errorMessage]);

  return {
    ...params,
    paramError,
    isExtensionOutdated,
  } as RequestParams;
};
