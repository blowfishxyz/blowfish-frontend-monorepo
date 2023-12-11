import useSWR from "swr";
import {
  EvmTxData,
  RequestMetadata,
  EvmSimulatorConfig,
  ScanTransactionsEvm200Response,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";

export const useScanTransactions = (
  txObjects: EvmTxData[],
  userAccount: string,
  metadata: RequestMetadata,
  chainFamily: ChainFamily,
  chainNetwork: ChainNetwork,
  simulatorConfig?: EvmSimulatorConfig
) => {
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

  const { data, error } = useSWR<ScanTransactionsEvm200Response, Error>(
    [
      "scanTransactions",
      txObjects,
      userAccount,
      JSON.stringify(metadata),
      chainFamily,
      chainNetwork,
      simulatorConfig,
    ],
    fetchTransactions
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
