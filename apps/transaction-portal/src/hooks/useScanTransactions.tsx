import { useQuery } from "react-query";
import {
  EvmTxData,
  RequestMetadata,
  EvmSimulatorConfig,
  ScanTransactionsEvm200Response,
  BlowfishEvmApiClient,
} from "@blowfishxyz/api-client";

export const useScanTransactions = (
  txObjects: EvmTxData[],
  userAccount: string,
  metadata: RequestMetadata,
  client: BlowfishEvmApiClient,
  simulatorConfig?: EvmSimulatorConfig,
  queryOptions = {}
) => {
  const fetchTransactions = async () => {
    return await client.scanTransactions(
      txObjects,
      userAccount,
      metadata,
      simulatorConfig
    );
  };

  return useQuery<ScanTransactionsEvm200Response, Error>(
    ["scanTransactions", txObjects, userAccount, metadata, simulatorConfig],
    fetchTransactions,
    queryOptions
  );
};
