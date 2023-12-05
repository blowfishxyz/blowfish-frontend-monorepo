import { useQuery, UseQueryResult } from "react-query";
import {
  ScanDomain200ResponseInner,
} from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanDomain = (
  domains: string[],
  queryOptions = {}
): UseQueryResult<ScanDomain200ResponseInner[], Error> => {
  const client = useClient();

  const fetchDomains = async (): Promise<ScanDomain200ResponseInner[]> => {
    return await client.scanDomains(domains);
  };

  return useQuery<ScanDomain200ResponseInner[], Error>(
    ["scanDomains", ...domains],
    fetchDomains,
    queryOptions
  );
};
