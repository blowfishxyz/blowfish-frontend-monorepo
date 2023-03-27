import React from "react";
import type { AppProps } from "next/app";
import { Providers } from "../components/Providers";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}
