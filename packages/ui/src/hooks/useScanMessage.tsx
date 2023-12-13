import useSWR from "swr";
import {
  EvmMessageScanResult,
  RequestMetadata,
  EvmChainFamily,
  EvmChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

interface UseScanMessageParams {
  message: string;
  userAccount: string;
  metadata: RequestMetadata;
  chainFamily: EvmChainFamily;
  chainNetwork: EvmChainNetwork;
}

interface UseScanMessageResult {
  data: EvmMessageScanResult | undefined;
  isLoading: boolean;
  error: undefined | Error;
}

export const useScanMessage = (
  params: UseScanMessageParams
): UseScanMessageResult => {
  const { message, userAccount, metadata, chainFamily, chainNetwork } = params;
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

  const { data, error, isLoading } = useSWR<EvmMessageScanResult, Error>(
    ["scanMessage", message, userAccount, metadata, chainFamily, chainNetwork],
    fetchMessage
  );

  return {
    data,
    isLoading,
    error,
  };
};
