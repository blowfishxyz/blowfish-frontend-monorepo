import React from "react";
import type { AppProps } from "next/app";
import { BaseProviders } from "../components/Providers";
import Head from "next/head";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "../utils/wagmi";
import { ConnectKitProvider } from "connectkit";
import { useRequestQueryParams } from "../hooks/useRequestQueryParams";

export default function App({ Component, pageProps }: AppProps) {
  const { chainId } = useRequestQueryParams();
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <BaseProviders>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider
            options={{
              initialChainId: chainId,
            }}
          >
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
      </BaseProviders>
    </>
  );
}
