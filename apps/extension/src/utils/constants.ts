import type { ChainFamily, ChainNetwork } from "@blowfish/utils";

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
