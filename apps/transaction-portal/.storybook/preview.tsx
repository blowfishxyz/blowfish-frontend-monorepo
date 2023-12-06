import React, { useEffect } from "react";
import type { Story as StoryType } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { MockConnector } from "wagmi/connectors/mock";
import { mainnet } from "wagmi/chains";
import { GlobalStyle } from "../src/styles/global";
import { useChainMetadataContext } from "../src/hooks/useChainMetadata";
import { ApiClientProvider, BlowfishUIProvider, light } from "@blowfishxyz/ui";
import { QueryClientProvider, QueryClient } from "react-query";
import { Wallet } from "ethers";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "styled-components";

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
  (Story: StoryType) => {
    const [, setChainMetadata] = useChainMetadataContext();
    const queryClient = new QueryClient();

    useEffect(() => {
      setChainMetadata({
        chainId: 1,
        chainInfo: {
          chainFamily: "ethereum",
          chainNetwork: "mainnet",
        },
      });
    }, []);

    return (
      <ThemeProvider theme={light}>
        <BlowfishUIProvider mode="light">
          <QueryClientProvider client={queryClient}>
            <ApiClientProvider chainFamily="ethereum" chainNetwork="mainnet">
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
            </ApiClientProvider>
          </QueryClientProvider>
        </BlowfishUIProvider>
      </ThemeProvider>
    );
  },
];
