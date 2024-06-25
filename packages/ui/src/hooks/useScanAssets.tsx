import useSWR from "swr";
import { ScanAssets200Response } from "@blowfishxyz/api-client";
import { useClient } from "./useClient";

/**
 * Scan a list of assets in order to receive recommended actions, tailored warnings and human-readable warnings and risk signals.
 * Max amount of assets per request is 100.  Assets can be NFTs or tokens and the format is:
 * - EVM compatible NFTs: `{chain}:{network}:{collection_address}:{item_id}`
 * For example: `ethereum:mainnet:0x60e4d786628fea6478f785a6d7e704777c86a7c6:7330`
 * - EVM compatible Tokens: `{chain}:{network}:{token_address}`
 * For example: `ethereum:mainnet:0xdAC17F958D2ee523a2206206994597C13D831ec7`
 * - Solana assets: `solana:{network}:{address/pubkey}`
 * For example: `solana:mainnet:6eqgcVBG7PbQkjaRHnJ6YKGVEHCCFSKxXwx2WDLsxv6N`
 * Scan assets
 */
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
