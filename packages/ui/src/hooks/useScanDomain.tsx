import { useQuery, UseQueryResult } from "react-query";
import {
  BlowfishEvmApiClient,
  ScanDomain200ResponseInner,
} from "@blowfishxyz/api-client";

export const useScanDomain = (
  domains: string[],
  client: BlowfishEvmApiClient,
  queryOptions = {}
): UseQueryResult<ScanDomain200ResponseInner[], Error> => {
  const fetchDomains = async (): Promise<ScanDomain200ResponseInner[]> => {
    return await client.scanDomains(domains);
  };

  return useQuery<ScanDomain200ResponseInner[], Error>(
    ["scanDomains", ...domains],
    fetchDomains,
    queryOptions
  );
};
