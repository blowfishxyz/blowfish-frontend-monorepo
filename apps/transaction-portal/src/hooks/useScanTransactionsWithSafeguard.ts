import useSWR from "swr";
import {
  RequestMetadata,
  RequestSimulatorConfig,
  ScanTransactionsSolana200Response,
  SolanaChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "@blowfishxyz/ui";

interface UseScanTransactionsSolanaParams {
  transactions: string[];
  userAccount: string;
  metadata: RequestMetadata;
  chainNetwork: SolanaChainNetwork;
  simulatorConfig?: RequestSimulatorConfig;
}

export const useScanTransactionsWithSafeguard = (
  params: UseScanTransactionsSolanaParams
) => {
  const { transactions, userAccount, metadata, chainNetwork, simulatorConfig } =
    params;

  const client = useClient();

  const fetchTransactions = async () => {
    const original = await client.scanTransactionsSolana(
      transactions,
      userAccount,
      metadata,
      chainNetwork,
      simulatorConfig
    );

    if (original.safeguard?.transactions.length) {
      try {
        const safeguard = await client.scanTransactionsSolana(
          original.safeguard.transactions,
          userAccount,
          metadata,
          chainNetwork,
          { safeguard: { enabled: false }, decodeInstructions: true }
        );

        return {
          original,
          safeguard,
        };
      } catch (error) {
        console.error("Failed to fetch safeguard transactions", error);
      }
    }

    return {
      original,
      safeguard: undefined,
    };
  };

  return useSWR<
    {
      original: ScanTransactionsSolana200Response;
      safeguard: ScanTransactionsSolana200Response | undefined;
    },
    Error
  >(
    ["scanTransactionsSolana", transactions, userAccount, chainNetwork],
    fetchTransactions
  );
};
