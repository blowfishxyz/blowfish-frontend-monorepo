import useSWR, { SWRResponse } from "swr";

import {
  DappRequest,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "../types";
import {
  BlowfishApiClient,
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/utils";

export const BLOWFISH_API_BASE_URL = process.env
  .NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string;

const SCAN_REFRESH_INTERVAL_MS = 15_000;

export const getCacheKey = (
  chainFamily: ChainFamily | undefined,
  chainNetwork: ChainNetwork | undefined,
  request: DappRequest | undefined,
  origin: string | undefined
): [ChainFamily, ChainNetwork, DappRequest, string] | null => {
  if (!chainFamily || !chainNetwork || !request || !origin) {
    return null;
  }

  return [chainFamily, chainNetwork, request, origin];
};

const fetcher = async (
  chainFamily: ChainFamily,
  chainNetwork: ChainNetwork,
  request: DappRequest,
  origin: string
): Promise<EvmTransactionScanResult | EvmMessageScanResult> => {
  const client = new BlowfishApiClient(
    chainFamily,
    chainNetwork,
    undefined,
    BLOWFISH_API_BASE_URL
  );
  if (isTransactionRequest(request)) {
    return client.scanTransaction(request.payload, request.userAccount, {
      origin,
    });
  } else if (isSignTypedDataRequest(request)) {
    return client.scanSignTypedData(request.payload, request.userAccount, {
      origin,
    });
  } else if (isSignMessageRequest(request)) {
    return client.scanSignMessage(
      request.payload.message,
      request.userAccount,
      { origin }
    );
  }
  throw new Error(`Unsupported request: ${(request as DappRequest).type}`);
};

export const useScanDappRequest = (
  chainFamily: ChainFamily | undefined,
  chainNetwork: ChainNetwork | undefined,
  request: DappRequest | undefined,
  origin: string | undefined
): SWRResponse<EvmTransactionScanResult | EvmMessageScanResult, Error> => {
  return useSWR(
    getCacheKey(chainFamily, chainNetwork, request, origin),
    (params) => fetcher(...params),
    {
      refreshInterval: SCAN_REFRESH_INTERVAL_MS,
    }
  );
};
