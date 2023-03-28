import {
  CHROMIMUM_INSTALL_EXTENSION_URL,
  MINIMUM_SUPPORTED_EXTENSION_VERSION,
} from "~config";
import { logger } from "~utils/logger";
import {
  DappRequest,
  Message,
  parseRequestFromMessage,
} from "@blowfish/utils/types";
import qs from "qs";

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

// TODO: move to utils
export const isVersionCompatible = (extensionVersion: string) => {
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
  NO_MESSAGE = "NO_MESSAGE",
  OUTDATED_EXTENSION = "OUTDATED_EXTENSION",
}

export const checkVersionAndTransformMessage = (
  message: Message<DappRequest["type"], DappRequest>
) => {
  if (Object.keys(message).length === 0) {
    throw new Error(MessageError.NO_MESSAGE);
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

export const getTransactionToScanFromUrl = (
  id: string,
  extensionVersion = "0.0.0",
  origin: string
) => {
  const windowQs = window.location.search;
  const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs;
  const parsedMessage = parseRequestFromMessage(
    qs.parse(cleanedQs) as unknown as Message<DappRequest["type"], DappRequest>
  );

  return {
    id,
    type: parsedMessage.type,
    origin,
    data: {
      ...parsedMessage,
      extensionVersion,
    },
  } as unknown as Message<DappRequest["type"], DappRequest>;
};
