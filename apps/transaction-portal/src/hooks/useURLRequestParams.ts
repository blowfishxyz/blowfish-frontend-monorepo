import { MessageError } from "~utils/utils";
import { useQueryParams } from "./useQueryParams";
import { useChainMetadata } from "./useChainMetadata";

export function useURLRequestParams() {
  const chain = useChainMetadata();
  const { request: requestParam } = useQueryParams<{
    request?: string;
  }>();

  let parsedRequest;
  if (requestParam) {
    parsedRequest = JSON.parse(decodeURIComponent(requestParam));
  }

  if (!parsedRequest) {
    return {
      error: MessageError.PARAMS_NOT_OK,
    };
  }

  return { ...parsedRequest, chain };
}
