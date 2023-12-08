import { UseQueryResult, useQuery } from "react-query";
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

export const useScanSignedTypedData = (
  request: SignTypedDataRequest,
  metadata: RequestMetadata,
  queryOptions = {}
): UseQueryResult<EvmMessageScanResult, Error> => {
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

    return await client.scanSignTypedData(
      { ...payload, domain },
      request.userAccount,
      metadata
    );
  };

  return useQuery<EvmMessageScanResult, Error>(
    ["scanSignedTypedData", request, metadata],
    fetchSignedTypedData,
    queryOptions
  );
};
