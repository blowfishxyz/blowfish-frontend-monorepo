import { loadSessionFromLocalStorage } from "~utils/wallet-connect/localStorage";

export const getChainId = (chain: string) => {
  return chain.includes("eip155") ? Number(chain.split(":")[1]) : Number(chain);
};

export const getUserAccount = () => {
  try {
    const session = loadSessionFromLocalStorage()[0];
    const { eip155 } = session.namespaces;
    const accountsFromLocalStorage = eip155.accounts;
    if (accountsFromLocalStorage.length > 0) {
      return accountsFromLocalStorage[0].split(":")[2];
    }
  } catch (e) {
    return null;
  }
};

export const hexToUint8Array = (hexString: string): Uint8Array => {
  const match = hexString.match(/.{1,2}/g);
  return match != null
    ? new Uint8Array(match.map((byte) => parseInt(byte, 16)))
    : new Uint8Array();
};

export const byteArrayToHexString = (byteArray: Uint8Array): string => {
  return byteArray
    .reduce((result: string[], byte: number) => {
      result.push(byte.toString(16).padStart(2, "0"));
      return result;
    }, [])
    .join("");
};

export const hexStringToByteArray = (hexString: string): Uint8Array => {
  const pairs = hexString.match(/.{1,2}/g);
  return pairs != null
    ? new Uint8Array(pairs.map((e) => parseInt(e, 16)))
    : new Uint8Array();
};

export const decodeTypeByte = (byteArray: Uint8Array) => {
  const uint8Array = new Uint8Array(byteArray);
  const string = new TextDecoder().decode(uint8Array);
  const intArray = string.split("").map(function (char) {
    return parseInt(char, 10);
  });
  return Number(intArray.join(""));
};

export const generateErrorRpcResponse = (id: number, message: string) => ({
  id: id,
  jsonrpc: "2.0",
  error: {
    code: -32000,
    message,
  },
});
