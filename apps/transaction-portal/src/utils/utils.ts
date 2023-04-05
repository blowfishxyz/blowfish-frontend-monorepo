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
