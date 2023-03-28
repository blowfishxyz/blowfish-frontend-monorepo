import { BlowfishOption } from "@blowfish/utils/types";

import { Storage } from "@plasmohq/storage";

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
