import {
  EvmExpectedStateChange,
  EvmExpectedStateChangesInnerRawInfo,
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo,
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
  OUTDATED_EXTENSION = "OUTDATED_EXTENSION",
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

export const containsPunycode = (url: string): boolean => {
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

const filterNullImageUrls = (imageUrl: string | undefined | null) => {
  if (imageUrl === null) {
    return undefined;
  } else {
    return imageUrl;
  }
};

export const getTxnSimulationData = (
  rawInfo: EvmExpectedStateChangesInnerRawInfo
) => {
  let name = "";
  let imageSrc;
  let symbol = "";
  let isNft = false;
  let displayText = "";

  if (
    rawInfo.kind === "ERC721_APPROVAL" ||
    rawInfo.kind === "ERC721_TRANSFER"
  ) {
    isNft = true;
    name = rawInfo.data.name;
    imageSrc = filterNullImageUrls(rawInfo.data.metadata.rawImageUrl);

    displayText = `${name} #${rawInfo.data.tokenId}`;
  } else if (
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "ERC20_TRANSFER" ||
    rawInfo.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    isNft = false;
    name = rawInfo.data.asset.name;
    imageSrc = filterNullImageUrls(rawInfo.data.asset.imageUrl);

    symbol = rawInfo.data.asset.symbol;
    displayText = `${name} (${symbol})`;
  }

  return {
    name,
    imageSrc,
    symbol,
    isNft,
    displayText,
  };
};

export const checkIsApproval = (
  rawInfo: EvmExpectedStateChangesInnerRawInfo
): boolean => {
  const { kind } = rawInfo;

  if (
    kind === "ERC20_APPROVAL" ||
    kind === "ERC1155_APPROVAL_FOR_ALL" ||
    kind === "ERC721_APPROVAL_FOR_ALL"
  ) {
    return true;
  }

  return false;
};

export const calculateTotalValue = (
  kind: string,
  data: any,
  pricePerToken: number
): number | null => {
  if (
    kind === "ERC20_TRANSFER" ||
    kind === "ERC20_APPROVAL" ||
    kind === "NATIVE_ASSET_TRANSFER"
  ) {
    const { before, after } = data.amount;

    const difference = new Decimal(before).sub(after).abs();

    if (kind === "ERC20_APPROVAL" && difference.eq(U256_MAX_VALUE)) {
      return null;
    }

    return new Decimal(pricePerToken)
      .times(difference)
      .dividedBy(new Decimal(10).pow(data.asset.decimals))
      .toNumber();
  }

  if (
    kind === "ERC721_TRANSFER" ||
    kind === "ERC1155_TRANSFER" ||
    kind === "ERC721_APPROVAL"
  ) {
    return pricePerToken;
  }

  return null;
};

export const getAssetPricePerToken = (
  rawInfo:
    | EvmExpectedStateChangesInnerRawInfo
    | ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo
): number | null => {
  if ("asset" in rawInfo.data) {
    return rawInfo.data.asset.price?.dollarValuePerToken || null;
  }

  if ("assetPrice" in rawInfo.data) {
    return rawInfo.data.assetPrice?.dollarValuePerToken || null;
  }

  return null;
};

export const getImageInfo = (
  rawInfo:
    | EvmExpectedStateChangesInnerRawInfo
    | ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo
): {
  altText: string;
  imageSrc: string | undefined;
  verified?: boolean;
} => {
  let altText = "Asset";
  let imageSrc;
  let verified;

  if (
    rawInfo.kind === "ERC721_TRANSFER" ||
    rawInfo.kind === "ERC721_APPROVAL" ||
    rawInfo.kind === "ERC1155_TRANSFER"
  ) {
    altText =
      rawInfo.kind !== "ERC1155_TRANSFER"
        ? rawInfo.data.name
        : `${altText} ${rawInfo.data.tokenId}`;
    imageSrc = filterNullImageUrls(rawInfo.data?.metadata?.rawImageUrl);

    return { altText, imageSrc };
  } else if (
    rawInfo.kind === "ERC20_TRANSFER" ||
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "ERC20_PERMIT" ||
    rawInfo.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    imageSrc = filterNullImageUrls(rawInfo.data.asset?.imageUrl);

    altText = rawInfo.data.asset.name;
    verified = rawInfo.data.asset.verified;
    return { altText, imageSrc, verified };
  }

  return { altText: "Asset", imageSrc: undefined };
};
