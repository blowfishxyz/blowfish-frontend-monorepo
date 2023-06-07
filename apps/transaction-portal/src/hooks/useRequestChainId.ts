import { ParsedScanUrl, isUrlScan } from "@blowfish/utils/types";
import { useMemo } from "react";

import { useQueryParams } from "~hooks/useQueryParams";

//TODO: we can delete this hook once urlScan is removed
export const useRequestChainId = () => {
  const requestScanUrl = useQueryParams<ParsedScanUrl>();

  return useMemo(() => {
    //TODO: We should remove the urlScan as soon as possible since it introduces a security risk
    const requestChainId = isUrlScan(requestScanUrl)
      ? requestScanUrl.data.chainId
      : requestScanUrl.chainId;

    if (!requestChainId) return undefined;

    return Number(requestChainId);
  }, [requestScanUrl]);
};
