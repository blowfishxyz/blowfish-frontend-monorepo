import { ChainFamily, ChainNetwork } from "@blowfish/api-client";

export type { ChainFamily, ChainNetwork };

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
  10: {
    chainFamily: "optimism",
    chainNetwork: "mainnet",
  },
  137: {
    chainFamily: "polygon",
    chainNetwork: "mainnet",
  },
  420: {
    chainFamily: "optimism",
    chainNetwork: "goerli",
  },
  42161: {
    chainFamily: "arbitrum",
    chainNetwork: "one",
  },
  56: {
    chainFamily: "bnb",
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

export interface BlockExplorerUrlOptions {
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  address: string;
  nftTokenId?: string | null;
  isApprovalForAllStateChange?: string;
}

export const chainToBlockExplorerUrl = ({
  chainFamily,
  chainNetwork,
  address,
  nftTokenId,
  isApprovalForAllStateChange,
}: BlockExplorerUrlOptions): string => {
  const prefix = chainNetwork == "mainnet" ? "" : `${chainFamily}.`;
  const assetType = nftTokenId
    ? "nft"
    : isApprovalForAllStateChange
    ? "token"
    : "address";
  switch (chainFamily) {
    case "polygon":
      return `https://${prefix}polygonscan.com/address/${address}`;
    case "optimism":
      return chainNetwork === "mainnet"
        ? `https://optimistic.etherscan.io/address/${address}`
        : `https://goerli-optimism.etherscan.io/address/${address}`;
    case "arbitrum":
      return `https://arbiscan.io/address/${address}`;
    case "bnb":
      return `https://bscscan.com/address/${address}`;
    case "ethereum":
      // NOTE(kimpers): Etherscan has a more sophisticated NFT view which we can link to
      return `https://${prefix}etherscan.io/${assetType}/${address}${
        nftTokenId ? `/${nftTokenId}` : ""
      }`;
  }
};

export const chainToBlockExplorerTxUrl = ({
  chainFamily,
  chainNetwork,
  hash,
}: {
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  hash: string;
}): string => {
  const prefix = chainNetwork == "mainnet" ? "" : `${chainNetwork}.`;
  switch (chainFamily) {
    case "polygon":
      return `https://${prefix}polygonscan.com/tx/${hash}`;
    case "optimism":
      return chainNetwork === "mainnet"
        ? `https://optimistic.etherscan.io/tx/${hash}`
        : `https://goerli-optimism.etherscan.io/tx/${hash}`;
    case "arbitrum":
      return `https://arbiscan.io/tx/${hash}`;
    case "bnb":
      return `https://bscscan.com/tx/${hash}`;
    case "ethereum":
      return `https://${prefix}etherscan.io/tx/${hash}`;
  }
};

export const chainToBlockExplorerTitle = (chainFamily: ChainFamily) => {
  switch (chainFamily) {
    case "ethereum":
    case "optimism":
      return "Etherscan";
    case "polygon":
      return "Polygonscan";
    case "bnb":
      return "Bscscan";
    case "arbitrum":
      return "Arbiscan";
  }
};
