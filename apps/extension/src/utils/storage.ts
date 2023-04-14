import { BlowfishOption } from "@blowfish/utils/types";

import { Storage } from "@plasmohq/storage";

import { BLOWFISH_TRANSACTION_PORTAL_URL } from "~config";

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

type PortalUrlOptionValue = {
  url: string | undefined;
  enabled: boolean;
};

export const getBlowfishPortalUrl = async () => {
  try {
    const fetched = await storage.get<PortalUrlOptionValue | undefined>(
      BlowfishOption.PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL
    );

    return {
      url: fetched?.url ?? BLOWFISH_TRANSACTION_PORTAL_URL,
      enabled: fetched ? fetched.enabled : false,
    };
  } catch (error) {
    return {
      url: BLOWFISH_TRANSACTION_PORTAL_URL,
      enabled: false,
    };
  }
};

export const setBlowfishPortalUrl = async ({
  url,
  enabled,
}: {
  url: string | undefined;
  enabled: boolean;
}) => {
  await storage.set(BlowfishOption.PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL, {
    url: url ?? BLOWFISH_TRANSACTION_PORTAL_URL,
    enabled,
  });
};
