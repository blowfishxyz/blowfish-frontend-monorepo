import React, { memo, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { WagmiConfig } from "wagmi";
import { createWagmiClient } from "~utils/wagmi";
import { ConnectKitProvider } from "connectkit";

import { themes } from "@blowfish/ui";
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
  const wagmiClient = useMemo(() => createWagmiClient(v2Enabled), [v2Enabled]);
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
