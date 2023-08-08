import {
  MetaplexTokenStandard,
  SolanaChainNetwork,
  SolanaExpectedStateChange,
  SolanaStageChangeSplTransfer,
  SolanaStateChangeSolTransfer,
  SolanaStateChangeSplApproval,
} from "@blowfishxyz/api-client";
import Decimal from "decimal.js";

export const capitalize = (str: string) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

export const shortenAddress = (address: string, length = 5): string => {
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
};

export const isNftMetaplexStandard = (metaplexStadard: MetaplexTokenStandard) =>
  metaplexStadard === "fungible_asset" ||
  metaplexStadard === "non_fungible" ||
  metaplexStadard === "non_fungible_edition";

export const isNftStateChange = (
  rawInfo: SolanaExpectedStateChange["rawInfo"]
): rawInfo is SolanaStateChangeSplApproval | SolanaStageChangeSplTransfer => {
  return (
    (rawInfo.kind === "SPL_APPROVAL" || rawInfo.kind === "SPL_TRANSFER") &&
    isNftMetaplexStandard(rawInfo.data.asset.metaplexTokenStandard)
  );
};

export const isCurrencyStateChange = (
  rawInfo: SolanaExpectedStateChange["rawInfo"]
): rawInfo is
  | SolanaStateChangeSolTransfer
  | SolanaStateChangeSplApproval
  | SolanaStageChangeSplTransfer => {
  return (
    rawInfo.kind === "SOL_TRANSFER" ||
    ((rawInfo.kind === "SPL_APPROVAL" || rawInfo.kind === "SPL_TRANSFER") &&
      !isNftMetaplexStandard(rawInfo.data.asset.metaplexTokenStandard))
  );
};

const getSimulationDiff = (rawInfo: SolanaExpectedStateChange["rawInfo"]) => {
  if (
    rawInfo.kind === "SOL_STAKE_AUTHORITY_CHANGE" ||
    rawInfo.kind === "USER_ACCOUNT_OWNER_CHANGE"
  ) {
    return new Decimal(0);
  }

  const { diff } = rawInfo.data;

  if (diff.sign === "MINUS") {
    return new Decimal(-diff.digits);
  }

  return new Decimal(diff.digits);
};

export const getAssetPriceInUsd = (
  rawInfo: SolanaExpectedStateChange["rawInfo"]
): number | null => {
  const pricePerToken = getAssetPricePerToken(rawInfo);

  if (isNftStateChange(rawInfo)) {
    return getAssetPricePerToken(rawInfo);
  }

  if (isCurrencyStateChange(rawInfo) && pricePerToken !== null) {
    const difference = getSimulationDiff(rawInfo).abs();

    return new Decimal(pricePerToken)
      .times(difference)
      .dividedBy(new Decimal(10).pow(rawInfo.data.asset.decimals))
      .toNumber();
  }

  return null;
};

export const getAssetPricePerToken = (
  rawInfo: SolanaExpectedStateChange["rawInfo"]
): number | null => {
  if ("asset" in rawInfo.data) {
    return rawInfo.data.asset.price?.dollarValuePerToken || null;
  }

  return null;
};

export const formatMetaplexStandard = (
  metaplexTokenStandard: MetaplexTokenStandard
) => (metaplexTokenStandard ?? "").split("_").map(capitalize).join(" ");

export const createValidURL = (url: string): URL | undefined => {
  try {
    return new URL(url);
  } catch (error) {
    return undefined;
  }
};

export interface BlockExplorerUrlOptions {
  chainNetwork?: SolanaChainNetwork;
  address: string;
  type: "token" | "address";
}

export const chainToBlockExplorerUrl = ({
  chainNetwork,
  address,
  type,
}: BlockExplorerUrlOptions): string => {
  const clusterQuery =
    !chainNetwork || chainNetwork == "mainnet"
      ? ""
      : `?cluster=${chainNetwork}.`;

  return `https://solscan.io/${type}/${address}${clusterQuery}`;
};
