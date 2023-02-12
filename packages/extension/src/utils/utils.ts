import type { ChainFamily, ChainNetwork } from "./BlowfishApiClient";

export const sleep = (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

export const compute_explorer_url = (
  chainNetwork: ChainNetwork,
  chainFamily: ChainFamily,
  address: string,
  nftTokenId: string | undefined
) => {
  const prefix = chainNetwork == "mainnet" ? "" : `${chainFamily}.`;
  let url: string;
  if (chainFamily === "polygon") {
    url = `https://${prefix}polygonscan.com/address/${address}`;
  } else {
    // NOTE(kimpers): Etherscan has a more sophisticated NFT view which we can link to
    const assetType = nftTokenId ? "nft" : "address";
    url = `https://${prefix}etherscan.io/${assetType}/${address}${
      nftTokenId ? `/${nftTokenId}` : ""
    }`;
  }
  return url;
};
