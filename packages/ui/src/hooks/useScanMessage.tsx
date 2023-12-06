import { UseQueryResult, useQuery } from "react-query";
import { EvmMessageScanResult, RequestMetadata } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanMessage = (
  message: string,
  userAccount: string,
  metadata: RequestMetadata,
  queryOptions = {}
): UseQueryResult<EvmMessageScanResult, Error> => {
  const client = useClient();

  const fetchMessage = async () => {
    return await client.scanMessage(message, userAccount, metadata);
  };

  return useQuery<EvmMessageScanResult, Error>(
    ["scanMessage", message, userAccount, metadata],
    fetchMessage,
    queryOptions
  );
};
