import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GlobalProviders } from "~components/common/GlobalProviders";
import "../global.css?v=1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blowfish - Proactive defense for web3 wallets</title>
        <meta
          name="description"
          content="Blowfish makes it easy to identify & stop fraud before it happens. Join the leading wallets protecting their users funds with the blowfish security engine"
        />
        <meta property="og:url" content="https://protect.blowfish.xyz/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Blowfish - Proactive defense for web3 wallets"
        />
        <meta
          property="og:description"
          content="Blowfish makes it easy to identify & stop fraud before it happens. Join the leading wallets protecting their users funds with the blowfish security engine"
        />
        <meta property="og:image" content="/images/wallet-banner.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://protect.blowfish.xyz/"
        />
        <meta property="twitter:url" content="https://protect.blowfish.xyz/" />
        <meta
          name="twitter:title"
          content="Blowfish - Proactive defense for web3 wallets"
        />
        <meta
          name="twitter:description"
          content="Blowfish makes it easy to identify & stop fraud before it happens. Join the leading wallets protecting their users funds with the blowfish security engine"
        />
        <meta name="twitter:image" content="/images/wallet-banner.webp" />
      </Head>
      <GlobalProviders>
        <Component {...pageProps} />
      </GlobalProviders>
    </>
  );
}
