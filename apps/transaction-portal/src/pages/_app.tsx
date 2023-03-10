import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { GlobalStyle } from "../styles/global";
import { themes } from "../styles/theme";
import Head from "next/head";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <ThemeProvider theme={themes.light}>
        <GlobalStyle />
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
