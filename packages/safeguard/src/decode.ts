import { Buffer } from "buffer";
import bs58 from "bs58";

/**
 * Decode a raw transaction
 * Either a base58 or base64 encoded transaction
 * @param {string} rawTx
 */
export function decodeRawTransaction(rawTx: string): Uint8Array {
  return /[0OIl+/]/.test(rawTx)
    ? new Uint8Array(Buffer.from(rawTx, "base64"))
    : bs58.decode(rawTx);
}
