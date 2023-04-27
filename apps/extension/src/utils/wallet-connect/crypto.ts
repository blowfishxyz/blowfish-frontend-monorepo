import { ChaCha20Poly1305 } from "@stablelib/chacha20poly1305";

import { loadKeychainFromLocalStorage } from "~utils/wallet-connect/localStorage";

import type { EncryptedPayloadV1, SocketMessageV1 } from "./types";
import {
  byteArrayToHexString,
  decodeTypeByte,
  hexStringToByteArray,
  hexToUint8Array,
} from "./utils";

export const TYPE_0 = 0;
export const TYPE_1 = 1;
export const ZERO_INDEX = 0;
export const TYPE_LENGTH = 1;
export const IV_LENGTH = 12;
export const KEY_LENGTH = 32;

// Wallet Connect v2
export const decryptRPCRequestV2 = (topic: string, encodedMessage: string) => {
  try {
    const keychain = loadKeychainFromLocalStorage();
    const symKey = keychain[topic];
    const decryptedMessage = decryptMessage(symKey, encodedMessage);
    return JSON.parse(decryptedMessage);
  } catch (e) {
    return null;
  }
};

export const decryptMessage = (symKey: string, encodedMessage: string) => {
  const box = new ChaCha20Poly1305(Buffer.from(symKey, "hex"));
  const { sealed, iv } = deserialize(encodedMessage);
  const message = box.open(iv, sealed);
  if (message === null) throw new Error("Failed to decrypt");
  return new TextDecoder().decode(message);
};

const deserialize = (encoded: string) => {
  const bytes = new Uint8Array(Buffer.from(encoded, "base64"));
  const type = bytes.slice(ZERO_INDEX, TYPE_LENGTH);
  const slice1 = TYPE_LENGTH;
  // todo: is this actually needed?
  if (decodeTypeByte(type) === TYPE_1) {
    const slice2 = slice1 + KEY_LENGTH;
    const slice3 = slice2 + IV_LENGTH;
    const senderPublicKey = bytes.slice(slice1, slice2);
    const iv = bytes.slice(slice2, slice3);
    const sealed = bytes.slice(slice3);
    return { type, sealed, iv, senderPublicKey };
  }
  // default to type 0 envelope
  const slice2 = slice1 + IV_LENGTH;
  const iv = bytes.slice(slice1, slice2);
  const sealed = bytes.slice(slice2);
  return { type, sealed, iv };
};

export const decryptRPCRequestV1 = async (data: string, key: string) => {
  try {
    const socketMessage: SocketMessageV1 = JSON.parse(data);
    if (socketMessage.payload === "") return;

    const encryptedPayload = JSON.parse(socketMessage.payload);
    return JSON.parse(await decryptMessageV1(encryptedPayload, key));
  } catch {
    return false;
  }
};

// Wallet Connect V1
export const generateEncryptedPayloadV1 = async (
  jsonString: string,
  key: string
): Promise<{ data: string; hmac: string; iv: string }> => {
  const randomBytes = async (length: number): Promise<Uint8Array> => {
    const byteLength = (length || 256) / 8;
    return crypto.getRandomValues(new Uint8Array(byteLength));
  };

  const iv = await randomBytes(128);
  const ivHex = byteArrayToHexString(iv);
  const plainText = new TextEncoder().encode(jsonString);

  const encryptedData = await encryptData(plainText, iv, key);
  const encryptedDataHex = byteArrayToHexString(new Uint8Array(encryptedData));

  const combinedData = new Uint8Array([
    ...new Uint8Array(encryptedData),
    ...iv,
  ]);
  const hmac = await generateHmac(key, combinedData);
  const hmacHex = byteArrayToHexString(new Uint8Array(hmac));

  return {
    data: encryptedDataHex,
    hmac: hmacHex,
    iv: ivHex,
  };
};

const encryptData = async (
  data: Uint8Array,
  iv: Uint8Array,
  key: string
): Promise<ArrayBuffer> => {
  const importedKey = await importAESKey(key);
  return crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    importedKey,
    data
  );
};

const generateHmac = async (
  key: string,
  data: Uint8Array
): Promise<ArrayBuffer> => {
  const importedKey = await crypto.subtle.importKey(
    "raw",
    hexToUint8Array(key),
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign"]
  );
  return crypto.subtle.sign("HMAC", importedKey, data);
};

export const decryptMessageV1 = async (
  encryptedPayload: EncryptedPayloadV1,
  key: string
) => {
  const cryptoKey = await importKey(key);
  const iv = hexToUint8Array(encryptedPayload.iv);
  const data = hexToUint8Array(encryptedPayload.data);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv },
    cryptoKey,
    data
  );

  return new TextDecoder().decode(decrypted);
};

const importKey = async (key: string) => {
  return crypto.subtle.importKey(
    "raw",
    hexToUint8Array(key),
    { name: "AES-CBC" },
    true,
    ["encrypt", "decrypt"]
  );
};

const importAESKey = (key: string): Promise<CryptoKey> => {
  return crypto.subtle.importKey(
    "raw",
    hexStringToByteArray(key),
    {
      name: "AES-CBC",
    },
    true,
    ["encrypt", "decrypt"]
  );
};
