import type {
  ChainFamily,
  ChainNetwork,
} from "@blowfish/utils/BlowfishApiClient";

interface ChainInfo {
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
};

export const chainIdToName = (chainId: string) => {
  const chainInfo = chainIdToSupportedChainMapping[chainId];
  if (!chainInfo) {
    return `Chain id ${chainId}`;
  }

  return `${chainInfo.chainFamily} ${chainInfo.chainNetwork}`;
};
