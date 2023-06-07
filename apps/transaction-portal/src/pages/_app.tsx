import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "~utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { GlobalStyle } from "~styles/global";

import { themes } from "@blowfish/ui/core";
import { useRequestChainId } from "~hooks/useRequestChainId";
import { useQueryParams } from "~hooks/useQueryParams";

export default function App({ Component, pageProps }: AppProps) {
  const requestChainId = useRequestChainId();
  const { v2: isV2Enabled } = useQueryParams<{ v2?: boolean }>();

  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <ThemeProvider theme={themes.light}>
        <GlobalStyle />
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider
            options={{
              initialChainId: requestChainId,
              enforceSupportedChains: !isV2Enabled,
            }}
            mode="light"
          >
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
