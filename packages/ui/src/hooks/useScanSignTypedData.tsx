import useSWR from "swr";
import {
  EvmMessageScanResult,
  EvmSignTypedDataDataDomain,
  RequestMetadata,
  EvmChainFamily,
  EvmChainNetwork,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";
import {
  SignTypedDataVersion,
  SupportedSignTypedDataPayloadVersion,
  transformTypedDataV1FieldsToEIP712,
} from "../utils/utils";

interface UseScanSignedTypedDataParams {
  request: SupportedSignTypedDataPayloadVersion;
  metadata: RequestMetadata;
  chainFamily: EvmChainFamily;
  chainNetwork: EvmChainNetwork;
}

interface UseScanSignedTypedDataResult {
  data: EvmMessageScanResult | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export const useScanSignedTypedData = (
  params: UseScanSignedTypedDataParams
): UseScanSignedTypedDataResult => {
  const { request, metadata, chainFamily, chainNetwork } = params;
  const client = useClient();

  const fetchSignedTypedData = async () => {
    const payload =
      request.signTypedDataVersion === SignTypedDataVersion.V1
        ? transformTypedDataV1FieldsToEIP712(request.payload, request.chainId)
        : request.payload;

    const domain = {
      ...payload.domain,
      ...(payload.domain.chainId && {
        chainId: payload.domain.chainId.toString(),
      }),
    } as EvmSignTypedDataDataDomain;

    return client.scanSignTypedDataEvm(
      { ...payload, domain },
      request.userAccount,
      metadata,
      chainFamily,
      chainNetwork
    );
  };

  const { data, error, isLoading } = useSWR<EvmMessageScanResult, Error>(
    ["scanSignedTypedData", request, metadata, chainFamily, chainNetwork],
    fetchSignedTypedData
  );

  return {
    data,
    isLoading,
    error,
  };
};
