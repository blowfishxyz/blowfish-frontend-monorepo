import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GlobalProviders } from "~modules/common/components/GlobalProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <GlobalProviders>
        <Component {...pageProps} />
      </GlobalProviders>
    </>
  );
}
