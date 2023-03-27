import React from "react";
import { ThemeProvider } from "styled-components";
import { WagmiConfig } from "wagmi";
import { GlobalStyle } from "../styles/global";
import { wagmiClient } from "../utils/wagmi";
import { ConnectKitProvider } from "connectkit";

import { themes } from "../styles/theme";

// NOTE: All global providers should be added here
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyle />
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};
