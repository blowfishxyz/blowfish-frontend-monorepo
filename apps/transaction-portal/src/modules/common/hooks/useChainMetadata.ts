import {
  ChainInfo,
  chainIdToSupportedChainMapping,
  chainToBlockExplorerTxUrl,
} from "@blowfish/utils/chains";
import { useEffect, useMemo } from "react";
import { createGlobalState } from "react-use";
import { useQueryParams } from "~hooks/useQueryParams";

export type ChainMetadata =
  | {
      chainId: number;
      chainInfo: ChainInfo | undefined;
    }
  | undefined;

export const useChainMetadataContext =
  createGlobalState<ChainMetadata>(undefined);

export const useChainMetadata = () => {
  const [chainMetadata] = useChainMetadataContext();
  return chainMetadata;
};

export const useChainMetadataProvider = () => {
  const chain = useChainFromUrl();
  const [, setChainMetadata] = useChainMetadataContext();

  useEffect(() => {
    setChainMetadata(chain);
  }, [chain, setChainMetadata]);
};

export function useChainFromUrl(): ChainMetadata {
  const params = useQueryParams<{ chainId?: string }>();
  const chainId = params.chainId ? parseInt(params.chainId) : undefined;

  return useMemo(() => {
    if (!chainId) {
      return undefined;
    }
    const chain = chainIdToSupportedChainMapping[chainId];
    if (!chain) {
      return {
        chainId,
        chainInfo: undefined,
      };
    }
    return { chainId, chainInfo: chain };
  }, [chainId]);
}

export function useBlockExplorerUrl(hash: string): string | undefined {
  const chain = useChainMetadata();
  if (!chain?.chainInfo) {
    return undefined;
  }
  const { chainFamily, chainNetwork } = chain.chainInfo;

  return chainToBlockExplorerTxUrl({
    chainFamily,
    chainNetwork,
    hash,
  });
}
