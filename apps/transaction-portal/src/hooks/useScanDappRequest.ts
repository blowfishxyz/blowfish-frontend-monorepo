import { BlowfishApiClient } from "@blowfishxyz/api-client";
import type {
  EvmMessageScanResult,
  EvmSignTypedDataDataDomain,
  EvmTransactionScanResult,
  ScanTransactionEvm200Response,
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

const SCAN_REFRESH_INTERVAL_MS = 5000;

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

let errorCount = 0;
// let pollCounter = 0;

const fetcher = async (
  chainFamily: ChainFamily,
  chainNetwork: ChainNetwork,
  request: DappRequest,
  origin: string
): Promise<EvmTransactionScanResult | EvmMessageScanResult> => {
  const client = new BlowfishApiClient(
    BLOWFISH_API_BASE_URL,
    // NOTE: The api key is rewritten on the proxy
    "",
    chainFamily,
    chainNetwork
  );

  errorCount++;
  console.log("@@ count ", errorCount);
  // If the error count is greater than or equals to 3, keep throwing the error until the error count is more than six
  if (errorCount >= 3 && errorCount < 4) {
    console.log("@@ throw error");
    throw new Error("Error thrown");
  }

  if (isTransactionRequest(request)) {
    // For smart contract wallets like Gnosis Safe we need to
    // scan from the POV of the contract rather the the user's ExpandIcon
    // TODO(kimpers): In the future we want to support multiple userAccounts
    const userAccount = isSmartContractWallet(origin)
      ? request.payload.to
      : request.userAccount;
    return client
      .scanTransactionsEvm([request.payload], userAccount, {
        origin,
      })
      .then(mapTransactionsToSingle);
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
): SWRResponse<EvmTransactionScanResult | EvmMessageScanResult, Error> => {
  const prevResponseRef = useRef<
    EvmTransactionScanResult | EvmMessageScanResult | null
  >(null);
  const consecutiveErrorCountRef = useRef<number>(0);

  const response = useSWR(
    getCacheKey(chainFamily, chainNetwork, request, origin),
    (params) => fetcher(...params),
    {
      refreshInterval: SCAN_REFRESH_INTERVAL_MS,
    }
  );

  const { data, error } = response;

  if (error) {
    console.log("error count:", consecutiveErrorCountRef.current);

    if (consecutiveErrorCountRef.current >= 2) {
      return response;
    }

    consecutiveErrorCountRef.current += 1;
    if (prevResponseRef.current) {
      return { ...response, data: prevResponseRef.current, error: undefined };
    }

    return response;
  }

  if (data) {
    consecutiveErrorCountRef.current = 0;
    prevResponseRef.current = data;
  }

  return response;
};

// export const useScanDappRequest = (
//   chainFamily: ChainFamily | undefined,
//   chainNetwork: ChainNetwork | undefined,
//   request: DappRequest | undefined,
//   origin: string | undefined
// ): SWRResponse<EvmTransactionScanResult | EvmMessageScanResult, Error> => {
//   const prevResponseRef = useRef<
//     EvmTransactionScanResult | EvmMessageScanResult | null
//   >(null);
//   const consecutiveErrorCountRef = useRef<number>(0);

//   const response = useSWR(
//     getCacheKey(chainFamily, chainNetwork, request, origin),
//     (params) => fetcher(...params),
//     {
//       refreshInterval: SCAN_REFRESH_INTERVAL_MS,
//     }
//   );

//   const { data, error } = response;

//   if (error) {
//     if (consecutiveErrorCountRef.current >= 2) {
//       return response;
//     }

//     consecutiveErrorCountRef.current += 1;
//     if (prevResponseRef.current) {
//       return { ...response, data: prevResponseRef.current, error: undefined };
//     }

//     return response;
//   }

//   if (data) {
//     consecutiveErrorCountRef.current = 0;
//     prevResponseRef.current = data;
//   }

//   return response;
// };

function mapTransactionsToSingle(
  response: ScanTransactionsEvm200Response
): ScanTransactionEvm200Response {
  const { simulationResults, ...rest } = response;
  const tx = simulationResults.perTransaction[0];
  if (!tx) {
    return {
      ...rest,
      simulationResults: {
        gas: {
          gasLimit: null,
        },
        protocol: null,
        error: simulationResults.aggregated.error,
        expectedStateChanges:
          simulationResults.aggregated.expectedStateChanges[
            simulationResults.aggregated.userAccount
          ] || [],
      },
    };
  }
  const expectedStateChanges =
    simulationResults.aggregated.expectedStateChanges[
      simulationResults.aggregated.userAccount
    ] || [];
  const item = {
    gas: tx.gas,
    error: tx.error,
    protocol: tx.protocol,
    expectedStateChanges,
  };

  return { ...rest, simulationResults: item };
}
