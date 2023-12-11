import useSWR from "swr";
import { ScanDomain200ResponseInner } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanDomain = (domains: string[]) => {
  const client = useClient();

  const fetchDomains = async () => {
    return client.scanDomains(domains);
  };

  const { data, error } = useSWR<ScanDomain200ResponseInner[], Error>(
    domains.length > 0 ? ["scanDomains", ...domains] : null,
    fetchDomains
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
