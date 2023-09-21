import { createEvmClient } from "@blowfishxyz/api-client";
import type {
  EvmMessageScanResult,
  EvmSignTypedDataDataDomain,
  EvmTransactionsScanResult,
  ScanTransactionsEvm200Response,
} from "@blowfishxyz/api-client";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { transformTypedDataV1FieldsToEIP712 } from "@blowfish/utils/messages";
import {
  DappRequest,
  SignTypedDataVersion,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import useSWR, { SWRResponse } from "swr";
import { isSmartContractWallet } from "../utils/wallets";
import { useRef } from "react";

export const BLOWFISH_API_BASE_URL = process.env
  .NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string;
const DEFAULT_CHAIN_FAMILY = "ethereum";
const DEFAULT_CHAIN_NETWORK = "mainnet";

const SCAN_REFRESH_INTERVAL_MS = 15_000;

export const getCacheKey = (
  chainFamily: ChainFamily | undefined = DEFAULT_CHAIN_FAMILY,
  chainNetwork: ChainNetwork | undefined = DEFAULT_CHAIN_NETWORK,
  request: DappRequest | undefined,
  origin: string | undefined
): [ChainFamily, ChainNetwork, DappRequest, string] | null => {
  if (!chainFamily || !chainNetwork || !request || !origin) {
    return null;
  }

  return [chainFamily, chainNetwork, request, origin];
};

const fetcher = async (
  chainFamily: ChainFamily = DEFAULT_CHAIN_FAMILY,
  chainNetwork: ChainNetwork = DEFAULT_CHAIN_NETWORK,
  request: DappRequest,
  origin: string
): Promise<EvmTransactionsScanResult | EvmMessageScanResult> => {
  // NOTE: The api key is rewritten on the proxy
  const client = createEvmClient({
    basePath: BLOWFISH_API_BASE_URL,
    chainFamily,
    chainNetwork,
  });

  if (isTransactionRequest(request)) {
    // For smart contract wallets like Gnosis Safe we need to
    // scan from the POV of the contract rather the the user's ExpandIcon
    // TODO(kimpers): In the future we want to support multiple userAccounts
    console.log("transaction", request);

    const userAccount = isSmartContractWallet(origin)
      ? request.payload.to
      : request.userAccount;
    return client
      .scanTransactions([request.payload], userAccount, {
        origin,
      })
      .then((response: ScanTransactionsEvm200Response) => {
        return response;
      });
  } else if (isSignTypedDataRequest(request)) {
    console.log("signed typed data", request);

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
    console.log("signed message", request);

    return client.scanMessage(request.payload.message, request.userAccount, {
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
): SWRResponse<EvmTransactionsScanResult | EvmMessageScanResult, Error> => {
  const prevResponseRef = useRef<SWRResponse<
    EvmTransactionsScanResult | EvmMessageScanResult
  > | null>(null);
  const consecutiveErrorCountRef = useRef<number>(0);

  const response = useSWR(
    getCacheKey(chainFamily, chainNetwork, request, origin),
    (params) => fetcher(...params),
    {
      refreshInterval: SCAN_REFRESH_INTERVAL_MS,
    }
  );

  if (response.error) {
    consecutiveErrorCountRef.current += 1;

    if (consecutiveErrorCountRef.current <= 2 && prevResponseRef.current) {
      return prevResponseRef.current;
    }

    return response;
  }

  consecutiveErrorCountRef.current = 0;
  prevResponseRef.current = response ?? null;

  return response;
};
