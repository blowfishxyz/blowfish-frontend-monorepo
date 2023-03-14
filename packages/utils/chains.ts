import type { ChainFamily, ChainNetwork } from "./BlowfishApiClient";

export interface ChainInfo {
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}
export const chainIdToSupportedChainMapping: { [key: string]: ChainInfo } = {
  1: {
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
  5: {
    chainFamily: "ethereum",
    chainNetwork: "goerli",
  },
  137: {
    chainFamily: "polygon",
    chainNetwork: "mainnet",
  },
  42161: {
    chainFamily: "arbitrum",
    chainNetwork: "one",
  },
  56: {
    chainFamily: "bsc",
    chainNetwork: "mainnet",
  },
};

/**
  ChainId can either be a number, a decimal string "1" or a hex string "0x1"
  this function normalizes it to a number
*/
export const normalizeChainId = (chainId: number | string): number =>
  parseInt(chainId.toString());

export const isSupportedChainId = (chainId: number | string): boolean => {
  const parsedChainId = normalizeChainId(chainId).toString(10);

  return !!chainIdToSupportedChainMapping[parsedChainId];
};

export const chainIdToName = (chainId: number | string) => {
  const parsedChainId = normalizeChainId(chainId).toString(10);
  const chainInfo = chainIdToSupportedChainMapping[parsedChainId];
  if (!chainInfo) {
    return `Chain id ${chainId}`;
  }

  return `${chainInfo.chainFamily} ${chainInfo.chainNetwork}`;
};
