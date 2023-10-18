import {
  Action,
  BlowfishBlocklistStorage,
  BlowfishBlocklistStorageKey,
  BlowfishLocalBlocklist,
} from "@blowfishxyz/blocklist";

import { Storage } from "@plasmohq/storage";

import { BLOWFISH_API_BASE_URL } from "~config";

// The blocklist exceeds the "sync" storage capacity (https://developer.chrome.com/docs/extensions/reference/storage/#property-sync)
const localStorage = new Storage({ area: "local" });

const storage: BlowfishBlocklistStorage = {
  getItem: async (key: BlowfishBlocklistStorageKey) => {
    return localStorage.get(key);
  },
  setItem: async (key: BlowfishBlocklistStorageKey, value: unknown) => {
    localStorage.set(key, value);
  },
};

export const blocklist = new BlowfishLocalBlocklist(
  { basePath: BLOWFISH_API_BASE_URL, apiKey: undefined },
  undefined,
  storage
);

export async function scanDomain(url: string): Promise<Action> {
  return blocklist.scanDomain(url);
}

export const updateStoredAllowlist = async (domain: string) => {
  blocklist.allowDomainLocally(domain);
};

export const createBlocklistFilter = async () => {
  await blocklist.fetchBlocklist();
};

export { Action };
