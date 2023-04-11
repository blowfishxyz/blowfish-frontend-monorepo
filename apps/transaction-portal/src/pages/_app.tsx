import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "~utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { GlobalStyle } from "~styles/global";

import { themes } from "~styles/theme";
import { useRequestChainId } from "~hooks/useRequestChainId";

export default function App({ Component, pageProps }: AppProps) {
  const requestChainId = useRequestChainId();

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
            }}
          >
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
