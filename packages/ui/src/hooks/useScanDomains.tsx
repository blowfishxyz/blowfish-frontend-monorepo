import useSWR from "swr";
import { ScanDomain200ResponseInner } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanDomains = (domains: string[]) => {
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

  return useSWR<ScanDomain200ResponseInner[], Error>(
    ["scanDomains", ...domains],
    fetchDomains
  );
};
