import { isUrlScan } from "@blowfish/utils/types";
import { useMemo } from "react";
import { useParsedRequestScanUrl } from "~hooks/useParsedRequestScanUrl";

//TODO: we can delete this hook once urlScan is removed
export const useRequestChainId = () => {
  const requestScanUrl = useParsedRequestScanUrl();

  return useMemo(() => {
    //TODO: We should remove the urlScan as soon as possible since it introduces a security risk
    const requestChainId = isUrlScan(requestScanUrl)
      ? requestScanUrl.data.chainId
      : requestScanUrl.chainId;

    if (!requestChainId) return undefined;

    return Number(requestChainId);
  }, [requestScanUrl]);
};
