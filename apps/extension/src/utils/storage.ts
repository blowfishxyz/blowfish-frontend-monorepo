import { BlowfishOption } from "@blowfish/utils/types";

import { Storage } from "@plasmohq/storage";

import {
  BLOWFISH_TRANSACTION_PORTAL_URL,
  CUSTOM_PORTAL_URL_ENABLED,
  SOLANA_ENABLED,
} from "~config";

const PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY =
  "PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED";

export interface BlowfishImpersonationWalletInfo {
  address: string;
  ens: string | null;
}

export const storage = new Storage();

export const isUnsupportedChainDismissed = async (
  chainId: string
): Promise<boolean> => {
  const unsupportedChainsDismissed = await storage.get<{
    [key: string]: boolean;
  }>(PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY);

  return !!(unsupportedChainsDismissed && unsupportedChainsDismissed[chainId]);
};

export const setUnsupportedChainDismissed = async (
  chainId: string,
  value: boolean
) => {
  const currentPreferences = await storage.get<{
    [key: string]: boolean;
  }>(PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY);

  await storage.set(PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY, {
    ...currentPreferences,
    [chainId]: value,
  });
};

export const getBlowfishImpersonationWallet =
  async (): Promise<BlowfishImpersonationWalletInfo> => {
    return await storage.get(
      BlowfishOption.PREFERENCES_BLOWFISH_IMPERSONATION_WALLET
    );
  };

export const setBlowfishImpersonationWallet = async (
  address: string,
  ens: string | null
) => {
  await storage.set(BlowfishOption.PREFERENCES_BLOWFISH_IMPERSONATION_WALLET, {
    address,
    ens,
  });
};

export const getBlowfishPortalUrl = async () => {
  if (!CUSTOM_PORTAL_URL_ENABLED) {
    return BLOWFISH_TRANSACTION_PORTAL_URL;
  }
  try {
    const url = await storage.get<string | undefined>(
      BlowfishOption.PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL
    );
    return url || BLOWFISH_TRANSACTION_PORTAL_URL;
  } catch (error) {
    return BLOWFISH_TRANSACTION_PORTAL_URL;
  }
};

export const setBlowfishPortalUrl = async (url: string | undefined) => {
  if (!url) {
    return storage.remove(
      BlowfishOption.PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL
    );
  }
  return storage.set(
    BlowfishOption.PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL,
    url
  );
};

export const getBlowfishSolanaEnabled = async () => {
  if (!SOLANA_ENABLED) {
    return false;
  }
  try {
    const solanaEnabled = await storage.get<boolean | undefined>(
      BlowfishOption.PREFERENCES_BLOWFISH_SOLANA_ENABLED
    );

    return solanaEnabled === undefined || solanaEnabled === null
      ? SOLANA_ENABLED
      : solanaEnabled;
  } catch (error) {
    return SOLANA_ENABLED;
  }
};

export const setBlowfishSolanaEnabled = async (solanaEnabled: boolean) => {
  return storage.set(
    BlowfishOption.PREFERENCES_BLOWFISH_SOLANA_ENABLED,
    solanaEnabled
  );
};
