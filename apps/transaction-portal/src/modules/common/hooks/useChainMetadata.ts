import {
  ChainInfo,
  chainIdToSupportedChainMapping,
} from "@blowfish/utils/chains";
import { useEffect } from "react";
import { createGlobalState } from "react-use";
import { useQueryParams } from "~hooks/useQueryParams";

export type ChainMetadata =
  | {
      chainId: number;
      chainInfo: ChainInfo | undefined;
    }
  | undefined;

const useChainMetadataContext = createGlobalState<ChainMetadata>(undefined);

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
}
