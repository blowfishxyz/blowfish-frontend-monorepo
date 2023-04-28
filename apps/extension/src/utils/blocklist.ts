import { logger } from "@blowfish/utils/logger";
import {
  Action,
  BloomFilter,
  fetchDomainBlocklist,
  fetchDomainBlocklistBloomFilter,
} from "@blowfishxyz/blocklist";
import {
  DomainBlocklist,
  scanDomain as scanDomainBlocklist,
} from "@blowfishxyz/blocklist";

import { Storage } from "@plasmohq/storage";

import { BLOWFISH_API_BASE_URL } from "~config";
import {
  BLOWFISH_ALLOWLIST_STORAGE_KEY,
  BLOWFISH_BLOCKLIST_STORAGE_KEY,
} from "~constants";

// The blocklist exceeds the "sync" storage capacity (https://developer.chrome.com/docs/extensions/reference/storage/#property-sync)
const blocklistStorage = new Storage({ area: "local" });

export const getStoredBlocklist = async () => {
  return blocklistStorage.get<Blocklist | undefined>(
    BLOWFISH_BLOCKLIST_STORAGE_KEY
  );
};

export const setStoredBlocklist = async (data: Blocklist) => {
  await blocklistStorage.set(BLOWFISH_BLOCKLIST_STORAGE_KEY, data);
};

export const getStoredAllowlist = async () => {
  return (
    (await blocklistStorage.get<string[] | undefined>(
      BLOWFISH_ALLOWLIST_STORAGE_KEY
    )) || []
  );
};

export const updateStoredAllowlist = async (domain: string) => {
  const existing = await getStoredAllowlist();
  await blocklistStorage.set(
    BLOWFISH_ALLOWLIST_STORAGE_KEY,
    existing.concat(domain)
  );
};

export type Blocklist = {
  blocklist: DomainBlocklist;
  bloomFilter: BloomFilter;
};

export async function createBlocklistFilter(): Promise<Blocklist> {
  logger.debug("Blocklist fetch start");

  const url = `${BLOWFISH_API_BASE_URL}/v0/domains/blocklist`;
  const blocklist = await fetchDomainBlocklist(
    {
      domainBlocklistUrl: url,
    },
    null,
    null,
    (err) => logger.error("Blocklist fetch", err)
  );
  const existingBlocklist = await getStoredBlocklist();

  if (
    existingBlocklist &&
    existingBlocklist.blocklist &&
    existingBlocklist.blocklist.bloomFilter.hash === blocklist?.bloomFilter.hash
  ) {
    return existingBlocklist;
  }

  if (!blocklist) {
    throw new Error("Failed to fetch blocklist");
  }

  const bloomFilter = await fetchDomainBlocklistBloomFilter(
    blocklist.bloomFilter.url,
    (err) => logger.error("Blocklist bloom filter fetch", err)
  );

  if (!bloomFilter) {
    throw new Error("Failed to fetch bloom filter");
  }

  logger.debug("Blocklist fetched", {
    blocklist,
    bloomFilter,
  });

  await setStoredBlocklist({
    blocklist,
    bloomFilter,
  });

  return {
    blocklist,
    bloomFilter,
  };
}

export async function scanDomain(domain: string): Promise<Action> {
  let storedBlocklist = await getStoredBlocklist();

  if (!storedBlocklist) {
    storedBlocklist = await createBlocklistFilter();
    setStoredBlocklist(storedBlocklist);
    logger.debug("blocklist missing in storage");
  } else {
    logger.debug("blocklist from storage");
  }

  const { blocklist, bloomFilter } = storedBlocklist;

  const action = scanDomainBlocklist(
    bloomFilter,
    blocklist.recentlyAdded,
    blocklist.recentlyRemoved,
    domain
  );

  if (action === Action.BLOCK) {
    const allowlist = await getStoredAllowlist();
    const hostname = new URL(domain).hostname;
    if (allowlist.includes(hostname)) {
      logger.debug("Block prevented by allowlist");
      return Action.NONE;
    }
  }

  return action;
}

export { Action };
