import useSWR from "swr";
import {
  EvmTxData,
  RequestMetadata,
  EvmSimulatorConfig,
  ScanTransactionsEvm200Response,
  EvmChainFamily,
  EvmChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

interface UseScanTransactionsEvmParams {
  txObjects: EvmTxData[];
  userAccount: string;
  metadata: RequestMetadata;
  chainFamily: EvmChainFamily;
  chainNetwork: EvmChainNetwork;
  simulatorConfig?: EvmSimulatorConfig;
}

export const useScanTransactionsEvm = (
  params: UseScanTransactionsEvmParams
) => {
  const {
    txObjects,
    userAccount,
    metadata,
    chainFamily,
    chainNetwork,
    simulatorConfig,
  } = params;
  const client = useClient();

  const fetchTransactions = async () => {
    return client.scanTransactionsEvm(
      txObjects,
      userAccount,
      metadata,
      chainFamily,
      chainNetwork,
      simulatorConfig
    );
  };

  const { data, error, isLoading } = useSWR<
    ScanTransactionsEvm200Response,
    Error
  >(
    [
      "scanTransactions",
      txObjects,
      userAccount,
      metadata,
      chainFamily,
      chainNetwork,
      simulatorConfig,
    ],
    fetchTransactions
  );

  return {
    data,
    isLoading,
    error,
  };
};
