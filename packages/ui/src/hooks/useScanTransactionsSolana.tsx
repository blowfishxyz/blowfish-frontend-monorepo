import useSWR from "swr";
import {
  RequestMetadata,
  RequestSimulatorConfig,
  ScanTransactionsSolana200Response,
  SolanaChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

interface UseScanTransactionsSolanaParams {
  transactions: string[];
  userAccount: string;
  metadata: RequestMetadata;
  chainNetwork: SolanaChainNetwork;
  simulatorConfig?: RequestSimulatorConfig;
}

export const useScanTransactionsSolana = (
  params: UseScanTransactionsSolanaParams
) => {
  const { transactions, userAccount, metadata, chainNetwork, simulatorConfig } =
    params;

  const client = useClient();

  const fetchTransactions = async () => {
    return client.scanTransactionsSolana(
      transactions,
      userAccount,
      metadata,
      chainNetwork,
      simulatorConfig
    );
  };

  return useSWR<ScanTransactionsSolana200Response, Error>(
    ["scanTransactionsSolana", transactions, userAccount, chainNetwork],
    fetchTransactions
  );
};
