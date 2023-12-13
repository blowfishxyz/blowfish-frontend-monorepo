import useSWR from "swr";
import {
  RequestMetadata,
  ScanTransactionsSolana200Response,
  SolanaChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

interface UseScanTransactionsSolanaParams {
  transactions: string[];
  userAccount: string;
  metadata: RequestMetadata;
  chainNetwork: SolanaChainNetwork;
}

export const useScanTransactionsSolana = (
  params: UseScanTransactionsSolanaParams
) => {
  const { transactions, userAccount, metadata, chainNetwork } = params;

  const client = useClient();

  const fetchTransactions = async () => {
    return client.scanTransactionsSolana(
      transactions,
      userAccount,
      metadata,
      chainNetwork
    );
  };

  const { data, error, isLoading } = useSWR<
    ScanTransactionsSolana200Response,
    Error
  >(
    [
      "scanTransactionsSolana",
      transactions,
      userAccount,
      metadata,
      chainNetwork,
    ],
    fetchTransactions
  );

  return {
    data,
    isLoading,
    error,
  };
};
