import {
  CHROMIMUM_INSTALL_EXTENSION_URL,
  MINIMUM_SUPPORTED_EXTENSION_VERSION,
} from "~config";
import { logger } from "~utils/logger";
import { DappRequest, Message } from "@blowfish/utils/types";
import { EvmStateChange } from "@blowfish/utils/BlowfishApiClient";

export const sleep = (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

export const opacify = (amount: number, hexColor: string) => {
  if (!hexColor.startsWith("#")) {
    return hexColor;
  }

  if (hexColor.length !== 7) {
    throw new Error(
      `opacify: provided color ${hexColor} was not in hexadecimal format (e.g. #000000)`
    );
  }

  if (amount < 0 || amount > 100) {
    throw new Error("opacify: provided amount should be between 0 and 100");
  }

  const opacityHex = Math.round((amount / 100) * 255).toString(16);
  const opacifySuffix = opacityHex.length < 2 ? `0${opacityHex}` : opacityHex;

  return `${hexColor.slice(0, 7)}${opacifySuffix}`;
};

export const isENS = (address = "") =>
  address.endsWith(".eth") || address.endsWith(".xyz");

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

export const evmStateChangeHasImage = (kind: EvmStateChange["kind"]) => {
  return EVM_STATE_CHANGE_KIND_WITH_IMAGE.includes(kind);
};
