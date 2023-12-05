import { UseQueryResult, useQuery } from "react-query";
import {
  BlowfishEvmApiClient,
  EvmMessageScanResult,
  RequestMetadata,
} from "@blowfishxyz/api-client";

export const useScanMessage = (
  message: string,
  userAccount: string,
  metadata: RequestMetadata,
  client: BlowfishEvmApiClient,
  queryOptions = {}
): UseQueryResult<EvmMessageScanResult, Error> => {
  const fetchMessage = async () => {
    return await client.scanMessage(message, userAccount, { origin });
  };

  return useQuery<EvmMessageScanResult, Error>(
    ["scanMessage", message, userAccount, metadata],
    fetchMessage,
    queryOptions
  );
};
