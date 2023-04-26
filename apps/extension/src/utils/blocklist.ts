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

// The blocklist exceeds the "sync" storage capacity (https://developer.chrome.com/docs/extensions/reference/storage/#property-sync)
const blocklistStorage = new Storage({ area: "local" });

export const getStoredBlocklist = async () => {
  return blocklistStorage.get<Blocklist | undefined>("BF:blocklist");
};

export const setStoredBlocklist = async (data: Blocklist) => {
  await blocklistStorage.set("BF:blocklist", data);
};

export const getStoredWhitelist = async () => {
  return (
    (await blocklistStorage.get<string[] | undefined>(
      "BF:whitelisted-by-user"
    )) || []
  );
};

export const updateStoredWhitelist = async (domain: string) => {
  const existing = await getStoredWhitelist();
  await blocklistStorage.set("BF:whitelisted-by-user", existing.concat(domain));
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
  let stored = await getStoredBlocklist();

  if (!stored) {
    stored = await createBlocklistFilter();
    setStoredBlocklist(stored);
    logger.debug("blocklist missing in storage");
  } else {
    logger.debug("blocklist from storage");
  }

  const { blocklist, bloomFilter } = stored;

  const action = scanDomainBlocklist(
    bloomFilter,
    blocklist.recentlyAdded,
    blocklist.recentlyRemoved,
    domain
  );

  if (action === Action.BLOCK) {
    const whitelisted = await getStoredWhitelist();
    const hostname = new URL(domain).hostname;
    if (whitelisted.includes(hostname)) {
      return Action.NONE;
    }
  }

  return action;
}

export { Action };
