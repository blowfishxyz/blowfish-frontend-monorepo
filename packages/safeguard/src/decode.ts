import bs58 from "bs58";

/**
 * Decode a raw transaction
 * Either a base58 or base64 encoded transaction
 * @param {string} rawTx
 */
export function decodeRawTransaction(rawTx: string): Uint8Array {
  if (/[0OIl+/]/.test(rawTx)) {
    return new Uint8Array(Buffer.from(rawTx, "base64"));
  } else {
    return bs58.decode(rawTx);
  }
}
