import useSWR from "swr";
import { HistoricalTransactionEvm200Response } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

interface UseSimulateHistoricalTransactionResult {
  data: HistoricalTransactionEvm200Response | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export const useSimulateHistoricalTransaction = (
  transactionHash: string,
  userAccount: string
): UseSimulateHistoricalTransactionResult => {
  const client = useClient();

  const fetchHistoricalSimulation = async () => {
    if (!transactionHash || !userAccount) {
      throw new Error("Transaction hash and user account are required");
    }
    return client.simulateHistoricalTransaction(transactionHash, userAccount);
  };

  return useSWR(
    transactionHash && userAccount
      ? ["simulateHistoricalTransaction", transactionHash, userAccount]
      : null,
    fetchHistoricalSimulation
  );
};
