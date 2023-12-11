import useSWR from "swr";
import {
  EvmMessageScanResult,
  EvmSignTypedDataDataDomain,
  RequestMetadata,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";
import { transformTypedDataV1FieldsToEIP712 } from "@blowfish/utils/messages";
import {
  SignTypedDataRequest,
  SignTypedDataVersion,
} from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";

interface UseScanSignedTypedDataResult {
  data: EvmMessageScanResult | undefined;
  isLoading: boolean;
  isError: undefined | Error;
}

export const useScanSignedTypedData = (
  request: SignTypedDataRequest,
  metadata: RequestMetadata,
  chainFamily: ChainFamily,
  chainNetwork: ChainNetwork
): UseScanSignedTypedDataResult => {
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

  const { data, error } = useSWR<EvmMessageScanResult, Error>(
    [
      "scanSignedTypedData",
      request,
      JSON.stringify(metadata),
      chainFamily,
      chainNetwork,
    ],
    fetchSignedTypedData
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
