import React from "react";
import type { Story as StoryType } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { ThemeProvider } from "styled-components";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { MockConnector } from "wagmi/connectors/mock";
import { mainnet } from "wagmi/chains";
import { GlobalStyle } from "../src/styles/global";
import { themes } from "@blowfish/ui/core";
import { Wallet } from "ethers";
import { ConnectKitProvider } from "connectkit";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// https://github.com/mikery/wagmi-storybook-demo/blob/main/.storybook/decorators.tsx
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "http://localhost:8545",
        webSocket: "ws://localhost:8545",
      }),
    }),
  ]
);

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MockConnector({
      chains,
      options: {
        signer: new Wallet(
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
        ),
        chainId: 1,
      },
    }),
  ],
});

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle,
  }),
  (Story: StoryType) => (
    <ThemeProvider theme={themes.light}>
      <WagmiConfig client={mockWagmiClient}>
        <ConnectKitProvider
          options={{
            initialChainId: 1,
          }}
          mode="light"
        >
          <Story />
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  ),
];
