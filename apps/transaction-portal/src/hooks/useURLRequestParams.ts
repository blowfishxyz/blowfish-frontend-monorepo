import { useQueryParams } from "./useQueryParams";
import { ScanParams } from "./useScanParams";

export function useURLRequestParams(): ScanParams | any {
  const { request: requestParam } = useQueryParams<{
    request?: string;
  }>();
  let parsedRequest;
  if (requestParam) {
    parsedRequest = JSON.parse(decodeURIComponent(requestParam));
  }

  console.log({ parsedRequest });

  const data = {
    
  }

  return data;
}
