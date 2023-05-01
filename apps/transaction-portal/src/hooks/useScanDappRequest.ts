import { BlowfishApiClient } from "@blowfish/api-client";
import type {
  EvmMessageScanResultV2,
  EvmSignTypedDataDataDomain,
  EvmTransactionScanResultV2,
} from "@blowfish/api-client";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/BlowfishApiClient";
import { transformTypedDataV1FieldsToEIP712 } from "@blowfish/utils/messages";
import {
  DappRequest,
  SignTypedDataVersion,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import useSWR, { SWRResponse } from "swr";

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
): Promise<EvmTransactionScanResultV2 | EvmMessageScanResultV2> => {
  const client = new BlowfishApiClient(BLOWFISH_API_BASE_URL);

  if (isTransactionRequest(request)) {
    return client.scanTransactionEvm(request.payload, request.userAccount, {
      origin,
    });
  } else if (isSignTypedDataRequest(request)) {
    const payload =
      request.signTypedDataVersion === SignTypedDataVersion.V1
        ? transformTypedDataV1FieldsToEIP712(request.payload, request.chainId)
        : request.payload;

    // API expects chainId to be a string but Sign Typed Data V3 has chainId as a number
    const domain = {
      ...payload.domain,
      ...(payload.domain.chainId && {
        chainId: payload.domain.chainId.toString(),
      }),
    } as EvmSignTypedDataDataDomain;

    return client.scanSignTypedData(
      {
        ...payload,
        domain,
      },
      request.userAccount,
      {
        origin,
      }
    );
  } else if (isSignMessageRequest(request)) {
    return client.scanMessageEvm(request.payload.message, request.userAccount, {
      origin,
    });
  }
  throw new Error(`Unsupported request: ${(request as DappRequest).type}`);
};

export const useScanDappRequest = (
  chainFamily: ChainFamily | undefined,
  chainNetwork: ChainNetwork | undefined,
  request: DappRequest | undefined,
  origin: string | undefined
): SWRResponse<EvmTransactionScanResultV2 | EvmMessageScanResultV2, Error> => {
  return useSWR(
    getCacheKey(chainFamily, chainNetwork, request, origin),
    (params) => fetcher(...params),
    {
      refreshInterval: SCAN_REFRESH_INTERVAL_MS,
    }
  );
};
