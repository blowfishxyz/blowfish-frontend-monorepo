import { MessageError } from "~utils/utils";
import { useQueryParams } from "./useQueryParams";

export function useURLRequestParams(): any {
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

  return parsedRequest;
}
