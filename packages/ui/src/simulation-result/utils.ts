import {
  ChainFamily,
  ChainNetwork,
  CurrencyStateChange,
  EvmExpectedStateChange,
  EvmStateChangeAnyNftFromCollectionTransfer,
  EvmStateChangeErc1155ApprovalForAll,
  EvmStateChangeErc1155Transfer,
  EvmStateChangeErc20Approval,
  EvmStateChangeErc721Approval,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  NftStateChange,
} from "@blowfishxyz/api-client";
import Decimal from "decimal.js";
import { getAddress, isAddress } from "@ethersproject/address";

export const U256_MAX_VALUE = new Decimal(2).pow(256).sub(1);

export const isENS = (address = "") =>
  address.endsWith(".eth") || address.endsWith(".xyz");

export const capitalize = (str: string) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

export const shortenEnsName = (name: string, showFatDots?: boolean): string => {
  const maxLength = 20;

  if (name.length <= maxLength) {
    return name;
  }

  const prefixLength = 6;
  const suffixLength = 5;
  const dots = showFatDots ? "••••" : "···";

  return `${name.substring(0, prefixLength)}${dots}${name.substring(
    name.length - suffixLength
  )}`;
};

export const copyToClipboard = (address: string | undefined) => {
  if (!address) return;

  navigator.clipboard
    .writeText(address)
    .then(() => {
      console.log("Address copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy address:", error);
    });
};

export const isNftStateChange = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is NftStateChange => {
  return (
    rawInfo.kind === "ERC721_TRANSFER" ||
    rawInfo.kind === "ERC1155_TRANSFER" ||
    rawInfo.kind === "ERC721_APPROVAL" ||
    rawInfo.kind === "ERC721_APPROVAL_FOR_ALL" ||
    rawInfo.kind === "ANY_NFT_FROM_COLLECTION_TRANSFER" ||
    rawInfo.kind === "ERC1155_APPROVAL_FOR_ALL"
  );
};

export const isCurrencyStateChange = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is CurrencyStateChange => {
  return (
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "ERC20_TRANSFER" ||
    rawInfo.kind === "NATIVE_ASSET_TRANSFER" ||
    rawInfo.kind === "ERC20_PERMIT"
  );
};

const isApprovalStateChange = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is
  | EvmStateChangeErc20Approval
  | EvmStateChangeErc1155ApprovalForAll
  | EvmStateChangeErc721Approval
  | EvmStateChangeErc721ApprovalForAll => {
  return rawInfo.kind.includes("APPROVAL");
};

export const containsCounterpartyProperty = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is
  | EvmStateChangeErc721Transfer
  | EvmStateChangeAnyNftFromCollectionTransfer => {
  return rawInfo.kind === "ERC721_TRANSFER";
};

export const isApprovalForAllStateChange = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is
  | EvmStateChangeErc1155ApprovalForAll
  | EvmStateChangeErc721ApprovalForAll => {
  return rawInfo.kind.includes("APPROVAL_FOR_ALL");
};

const getSimulationDiff = (rawInfo: EvmExpectedStateChange["rawInfo"]) => {
  const { amount } = rawInfo.data;

  if (!amount) {
    return new Decimal(0);
  }

  if (typeof amount === "string") {
    return new Decimal(amount);
  }

  return new Decimal(amount.before).sub(amount.after);
};

export const isPositiveStateChange = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
) => {
  const isApproval = isApprovalStateChange(rawInfo);
  const diff = getSimulationDiff(rawInfo);

  return (isApproval && diff.gt(0)) || (!isApproval && diff.lt(0));
};

export const getAssetPriceInUsd = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): number | null => {
  const pricePerToken = getAssetPricePerToken(rawInfo);

  if (isNftStateChange(rawInfo)) {
    return getAssetPricePerToken(rawInfo);
  }

  if (rawInfo.kind === "ERC20_PERMIT") {
    return null;
  }

  if (isCurrencyStateChange(rawInfo) && pricePerToken !== null) {
    const difference = getSimulationDiff(rawInfo).abs();

    if (
      rawInfo.kind === "ERC20_APPROVAL" &&
      // U256_MAX_VALUE - unlimited approval
      difference.eq(U256_MAX_VALUE)
    ) {
      return null;
    }

    return new Decimal(pricePerToken)
      .times(difference)
      .dividedBy(new Decimal(10).pow(rawInfo.data.asset.decimals))
      .toNumber();
  }

  return null;
};

export const getAssetPricePerToken = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): number | null => {
  if ("asset" in rawInfo.data) {
    return rawInfo.data.asset.price?.dollarValuePerToken || null;
  }

  return null;
};

export const isNftStateChangeWithMetadata = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is
  | EvmStateChangeErc1155Transfer
  | EvmStateChangeErc721Approval
  | EvmStateChangeErc721Transfer => {
  switch (rawInfo.kind) {
    case "ERC1155_TRANSFER":
    case "ERC721_APPROVAL":
    case "ERC721_TRANSFER":
      return true;
  }
  return false;
};

export const hasStateChangeImage = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
) => {
  return (
    isCurrencyStateChange(rawInfo) || isNftStateChangeWithMetadata(rawInfo)
  );
};

export const createValidURL = (url: string): URL | undefined => {
  try {
    return new URL(url);
  } catch (error) {
    return undefined;
  }
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
  const prefix = chainNetwork == "mainnet" ? "" : `${chainNetwork}.`;
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

export const shortenHex = (hex: string, length = 5): string => {
  const prettyHex = isAddress(hex) ? getAddress(hex) : hex;
  return `${prettyHex.slice(0, length + 2)}...${prettyHex.slice(-length)}`;
};
