import { useQuery } from "react-query";
import {
  EvmTxData,
  RequestMetadata,
  EvmSimulatorConfig,
  ScanTransactionsEvm200Response,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanTransactions = (
  txObjects: EvmTxData[],
  userAccount: string,
  metadata: RequestMetadata,
  simulatorConfig?: EvmSimulatorConfig,
  queryOptions = {}
) => {
  const client = useClient();

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
