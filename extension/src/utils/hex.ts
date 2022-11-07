import { getAddress } from "@ethersproject/address";
export const shortenAddress = (address: string): string => {
  const checksummedAddress = getAddress(address);
  return `${checksummedAddress.slice(0, 6)}...${checksummedAddress.slice(-4)}`;
};
