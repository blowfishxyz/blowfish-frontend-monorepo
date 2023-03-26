import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { WagmiConfig } from "wagmi";
import { GlobalStyle } from "../styles/global";
import { themes } from "../styles/theme";
import { wagmiClient } from "../utils/wagmi";
import { ConnectKitProvider, ConnectKitButton } from "connectkit";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <ThemeProvider theme={themes.light}>
        <GlobalStyle />
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <Component {...pageProps} />
            <ConnectKitButton />
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
