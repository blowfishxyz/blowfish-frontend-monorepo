import {
  EvmExpectedStateChange,
  EvmProtocol,
  ScanMessageEvm200ResponseSimulationResults,
  ScanMessageEvm200ResponseSimulationResultsError,
  ScanTransactionsEvm200ResponseSimulationResults,
  ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError,
} from "@blowfishxyz/api-client";
import { DappRequest, Message } from "@blowfish/utils/types";

import {
  CHROMIMUM_INSTALL_EXTENSION_URL,
  MINIMUM_SUPPORTED_EXTENSION_VERSION,
} from "~config";
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

export const createValidURL = (url: string): URL | undefined => {
  try {
    return new URL(url);
  } catch (error) {
    return undefined;
  }
};

export const getProtocol = (
  simulationResults:
    | ScanTransactionsEvm200ResponseSimulationResults
    | ScanMessageEvm200ResponseSimulationResults
    | null
): EvmProtocol | null => {
  if (simulationResults && "aggregated" in simulationResults) {
    return simulationResults.perTransaction[0].protocol;
  } else if (simulationResults && "protocol" in simulationResults) {
    return simulationResults.protocol;
  }
  return null;
};

export const getErrorFromScanResponse = (
  simulationResults:
    | ScanTransactionsEvm200ResponseSimulationResults
    | ScanMessageEvm200ResponseSimulationResults
    | null
):
  | ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError
  | ScanMessageEvm200ResponseSimulationResultsError
  | null => {
  if (!simulationResults) return null;

  if ("aggregated" in simulationResults) {
    return simulationResults.aggregated?.error;
  } else {
    return simulationResults.error;
  }
};

export const getResultsFromScanResponse = (
  simulationResults:
    | ScanTransactionsEvm200ResponseSimulationResults
    | ScanMessageEvm200ResponseSimulationResults
    | null
) => {
  if (!simulationResults) return null;

  let result;
  let expectedStateChanges;
  let decodedCalldata;

  if ("aggregated" in simulationResults) {
    result = simulationResults.aggregated;
    expectedStateChanges =
      simulationResults.aggregated.expectedStateChanges[
        simulationResults.aggregated.userAccount
      ];
      decodedCalldata = simulationResults.perTransaction[0].decodedCalldata;
  } else {
    result = simulationResults;
    expectedStateChanges = simulationResults.expectedStateChanges;
  }

  return { result, expectedStateChanges, decodedCalldata };
};
