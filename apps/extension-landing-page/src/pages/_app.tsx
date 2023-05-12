import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "styled-components";
import { useMatomoAnalytics } from "@blowfish/hooks";

import { GlobalStyle } from "../styles/global";
import { theme } from "../styles/theme";
import { Header } from "../components/Header";
import Head from "next/head";

import { MATOMO_SITE_ID } from "../config";

const IS_PROD = process.env.NODE_ENV === "production";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname() || undefined;
  useMatomoAnalytics(IS_PROD, MATOMO_SITE_ID, pathname);
  return (
    <>
      <Head>
        <title>Blowfish</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
