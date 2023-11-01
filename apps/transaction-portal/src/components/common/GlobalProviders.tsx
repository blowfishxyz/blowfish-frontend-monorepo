import React, { memo, useMemo } from "react";
import { WagmiConfig } from "wagmi";
import { createWagmiClient } from "~utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "styled-components";

import { BlowfishUIProvider, light } from "@blowfishxyz/ui";
import { useRequestChainId } from "~hooks/useRequestChainId";
import { useChainMetadataProvider } from "~hooks/useChainMetadata";

export const GlobalProviders = memo(function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestChainId = useRequestChainId();
  const wagmiClient = useMemo(() => createWagmiClient(), []);
  useChainMetadataProvider();

  return (
    <ThemeProvider theme={light}>
      <BlowfishUIProvider mode="light">
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider
            options={{
              initialChainId: requestChainId,
              enforceSupportedChains: false,
            }}
            mode="light"
          >
            {children}
          </ConnectKitProvider>
        </WagmiConfig>
      </BlowfishUIProvider>
    </ThemeProvider>
  );
});
