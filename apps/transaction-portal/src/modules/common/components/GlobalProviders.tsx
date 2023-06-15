import React, { memo } from "react";
import { ThemeProvider } from "styled-components";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "~utils/wagmi";
import { ConnectKitProvider } from "connectkit";

import { themes } from "@blowfish/ui/core";
import { useRequestChainId } from "~hooks/useRequestChainId";
import { useChainMetadataProvider } from "~modules/common/hooks/useChainMetadata";
import { useV2Enabled } from "~hooks/useV2Enabled";

export const GlobalProviders = memo(function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestChainId = useRequestChainId();
  const [v2Enabled] = useV2Enabled();
  useChainMetadataProvider();

  return (
    <ThemeProvider theme={themes.light}>
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider
          options={{
            initialChainId: requestChainId,
            enforceSupportedChains: !v2Enabled,
          }}
          mode="light"
        >
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
});
