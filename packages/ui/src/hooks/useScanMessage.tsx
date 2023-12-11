import useSWR from "swr";
import { EvmMessageScanResult, RequestMetadata } from "@blowfishxyz/api-client";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { useClient } from "./useClient";

interface UseScanMessageResult {
  data: EvmMessageScanResult | undefined;
  isLoading: boolean;
  isError: undefined | Error;
}

export const useScanMessage = (
  message: string,
  userAccount: string,
  metadata: RequestMetadata,
  chainFamily: ChainFamily,
  chainNetwork: ChainNetwork
): UseScanMessageResult => {
  const client = useClient();

  const fetchMessage = async () => {
    return client.scanMessageEvm(
      message,
      userAccount,
      metadata,
      chainFamily,
      chainNetwork
    );
  };

  const { data, error } = useSWR<EvmMessageScanResult, Error>(
    [
      "scanMessage",
      message,
      userAccount,
      JSON.stringify(metadata),
      chainFamily,
      chainNetwork,
    ],
    fetchMessage
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
