import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Analytics } from "@vercel/analytics/react";

import { GlobalStyle } from "../styles/global";
import { theme } from "../styles/theme";
import { Header } from "../components/Header";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  );
}
