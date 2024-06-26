import bs58 from "bs58";

// Note: Use @blowfishxyz/safeguard when merged
export function decodeRawTransaction(rawTx: string): Uint8Array {
  return /[0OIl+/]/.test(rawTx)
    ? new Uint8Array(Buffer.from(rawTx, "base64"))
    : bs58.decode(rawTx);
}
