import React, { memo } from "react";
import { ThemeProvider } from "styled-components";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "~utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { GlobalStyle } from "~styles/global";

import { themes } from "@blowfish/ui/core";
import { useRequestChainId } from "~hooks/useRequestChainId";
import { BLOWFISH_V2_ENABLED } from "~config";
import { useChainMetadataProvider } from "~modules/common/hooks/useChainMetadata";

export const GlobalProviders = memo(function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestChainId = useRequestChainId();
  useChainMetadataProvider();

  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyle />
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider
          options={{
            initialChainId: requestChainId,
            enforceSupportedChains: !BLOWFISH_V2_ENABLED,
          }}
          mode="light"
        >
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
});
