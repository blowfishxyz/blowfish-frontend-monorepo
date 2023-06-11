import {
  CurrencyStateChange,
  EvmExpectedStateChange,
  EvmStateChangeErc1155ApprovalForAll,
  EvmStateChangeErc1155Transfer,
  EvmStateChangeErc20Approval,
  EvmStateChangeErc721Approval,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  NftStateChange,
} from "@blowfish/api-client";
import { DappRequest, Message } from "@blowfish/utils/types";
import Decimal from "decimal.js";

import {
  CHROMIMUM_INSTALL_EXTENSION_URL,
  MINIMUM_SUPPORTED_EXTENSION_VERSION,
} from "~config";
import { U256_MAX_VALUE } from "../constants";
import { logger } from "~utils/logger";

// NOTE: the require statement below is to ensure we are using the punycode userland modules and not the deprecated core modules.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const punycode = require("punycode/");

export const sleep = (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

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

// NOTE: the default value for extensionVersion is set to 0.0.9. It's the first version that uses the portal, but due to a bug doesn't send the version number.
export const isVersionCompatible = (extensionVersion = "0.0.9") => {
  const minimum = MINIMUM_SUPPORTED_EXTENSION_VERSION.split(".").map(Number);
  const provided = extensionVersion.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    if (provided[i] < minimum[i]) {
      return false;
    } else if (provided[i] > minimum[i]) {
      return true;
    }
  }

  // Versions are equal
  return true;
};

// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browsers
export const getExtensionInstallationUrl = async () => {
  const isChrome = !!window.chrome;
  const isBrave =
    (navigator.brave && (await navigator.brave.isBrave())) || false;
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

  // TODO:(Andrei) - when we support firefox
  // const isFirefox = typeof InstallTrigger !== "undefined";
  // if (isFirefox) {
  //   return "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
  // }

  if (isChrome || isBrave || isEdgeChromium) {
    return CHROMIMUM_INSTALL_EXTENSION_URL;
  }

  logger.error("Unsupported browser");
  return null;
};

export type TransformFunction = (
  request: Message<DappRequest["type"], DappRequest>
) => Message<DappRequest["type"], DappRequest>;

export const EXTENSION_VERSION_TRANSFORMERS: Record<
  string,
  TransformFunction[]
> = {};

export const getTransformersForVersion = (extensionVersion: string) => {
  if (EXTENSION_VERSION_TRANSFORMERS[extensionVersion])
    return EXTENSION_VERSION_TRANSFORMERS[extensionVersion];

  const ids = Object.keys(EXTENSION_VERSION_TRANSFORMERS).sort();
  const index = ids.findIndex((id) => id >= extensionVersion);
  if (index === -1) {
    return null;
  } else {
    return EXTENSION_VERSION_TRANSFORMERS[ids[index]];
  }
};

export enum MessageError {
  PARAMS_NOT_OK = "PARAMS_NOT_OK",
  MESSAGE_MISSING = "MESSAGE_MISSING",
  OUTDATED_EXTENSION = "OUTDATED_EXTENSION",
  FETCH_ERROR = "FETCH_ERROR",
}

export const checkVersionAndTransformMessage = (
  message: Message<DappRequest["type"], DappRequest>
) => {
  if (Object.keys(message).length === 0) {
    throw new Error(MessageError.PARAMS_NOT_OK);
  }
  const { extensionVersion } = message.data;

  if (!isVersionCompatible(extensionVersion)) {
    throw new Error(MessageError.OUTDATED_EXTENSION);
  }
  const transformers = getTransformersForVersion(extensionVersion);

  const transformedMessage = transformers?.reduce(
    (transformed, transformerFn) => transformerFn(transformed),
    message
  );

  return transformedMessage || message;
};

const EVM_STATE_CHANGE_KIND_WITH_IMAGE = [
  "ERC721_TRANSFER",
  "ERC721_APPROVAL",
  "ERC1155_TRANSFER",
  "ERC20_TRANSFER",
  "ERC20_APPROVAL",
  "ERC20_PERMIT",
  "NATIVE_ASSET_TRANSFER",
];

export const evmStateChangeHasImage = (
  kind: EvmExpectedStateChange["rawInfo"]["kind"]
) => {
  return EVM_STATE_CHANGE_KIND_WITH_IMAGE.includes(kind);
};

export const containsPunycode = (url: string | undefined): boolean => {
  try {
    const decoded = punycode.toUnicode(url);
    return decoded !== url;
  } catch (err) {
    return false;
  }
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
  return rawInfo.kind.includes("ERC721") || rawInfo.kind.includes("ERC1155");
};

export const isCurrencyStateChange = (
  rawInfo: EvmExpectedStateChange["rawInfo"]
): rawInfo is CurrencyStateChange => {
  return (
    rawInfo.kind.includes("ERC20") || rawInfo.kind.includes("NATIVE_ASSET")
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

  if ("assetPrice" in rawInfo.data) {
    return rawInfo.data.assetPrice?.dollarValuePerToken || null;
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
