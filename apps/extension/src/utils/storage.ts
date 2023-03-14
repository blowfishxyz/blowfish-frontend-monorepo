import { Storage } from "@plasmohq/storage";

const PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED_KEY =
  "PREFERENCES_UNSUPPORTED_CHAINS_DISMISSED";

export const PREFERENCES_BLOWFISH_IMPERSONATION_WALLET =
  "PREFERENCES_BLOWFISH_IMPERSONATION_WALLET";

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

export const getBlowfishImpersonationWallet = async (): Promise<string> => {
  return await storage.get(PREFERENCES_BLOWFISH_IMPERSONATION_WALLET);
};

export const setBlowfishImpersonationWallet = async (address: string) => {
  await storage.set(PREFERENCES_BLOWFISH_IMPERSONATION_WALLET, address);
};
