import useSWR from "swr";
import { ScanDomain200ResponseInner } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanDomain = (domains: string[]) => {
  const client = useClient();

  if (domains.length === 0) {
    return {
      data: undefined,
      isLoading: false,
      error: new Error("No domains provided"),
    };
  }

  const fetchDomains = async () => {
    return client.scanDomains(domains);
  };

  const { data, error, isLoading } = useSWR<ScanDomain200ResponseInner[], Error>(
    ["scanDomains", ...domains],
    fetchDomains
  );

  return {
    data,
    isLoading,
    error,
  };
};
