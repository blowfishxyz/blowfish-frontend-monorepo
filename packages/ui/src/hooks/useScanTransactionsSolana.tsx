import useSWR from "swr";
import {
  RequestMetadata,
  ScanTransactionsSolana200Response,
  SolanaChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanTransactionsSolana = (
  transactions: string[],
  userAccount: string,
  metadata: RequestMetadata,
  chainNetwork: SolanaChainNetwork
) => {
  const client = useClient();

  const fetchTransactions = async () => {
    return client.scanTransactionsSolana(
      transactions,
      userAccount,
      metadata,
      chainNetwork
    );
  };

  const { data, error } = useSWR<ScanTransactionsSolana200Response, Error>(
    [
      "scanTransactionsSolana",
      transactions,
      userAccount,
      JSON.stringify(metadata),
      chainNetwork,
    ],
    fetchTransactions
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
