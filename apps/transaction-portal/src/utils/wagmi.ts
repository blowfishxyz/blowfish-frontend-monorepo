import { mainnet, polygon, goerli, arbitrum, bsc } from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { configureChains, createClient } from "wagmi";

import { ALCHEMY_API_KEY } from "../config";

const { chains, provider } = configureChains(
  [mainnet, polygon, goerli, arbitrum, bsc],
  [
    alchemyProvider({
      apiKey: ALCHEMY_API_KEY,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

export const connectors = [
  new MetaMaskConnector({
    chains,
    options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  }),
  new InjectedConnector({ chains, options: { shimDisconnect: true } }),
];

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
});
