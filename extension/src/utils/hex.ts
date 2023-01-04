import { getAddress, isAddress } from "@ethersproject/address";

export const shortenHex = (hex: string, length = 5): string => {
  const prettyHex = isAddress(hex) ? getAddress(hex) : hex;
  return `${prettyHex.slice(0, length + 2)}...${prettyHex.slice(-length)}`;
};

export const isHex = (value: string): boolean =>
  typeof value === "string" && /^0x[0-9A-Fa-f]*$/.test(value);

export const isNativeAsset = (address: string): boolean =>
  address.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
