import useSWR from "swr";
import { ScanAssets200Response } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

export const useScanAssets = (assets: string[]) => {
  const client = useClient();

  if (assets.length === 0) {
    return {
      data: undefined,
      isLoading: false,
      error: new Error("No assets provided"),
    };
  }

  const fetchAssets = async () => {
    return client.scanAssets(assets);
  };

  return useSWR<ScanAssets200Response, Error>(
    ["scanAssets", ...assets],
    fetchAssets
  );
};
