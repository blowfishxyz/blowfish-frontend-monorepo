import { mainnet, polygon, goerli, arbitrum, bsc } from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { configureChains, createClient, useNetwork } from "wagmi";

import { ALCHEMY_API_KEY } from "../config";

export const useConnectedChainId = () => {
  const network = useNetwork();
  return network.chain?.id;
};

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
  // TODO(Alex): investigate bug when both extensions enabled
  // new CoinbaseWalletConnector({
  //   chains,
  //   options: {
  //     appName: "Blowfish Protect",
  //   },
  // }),
  new InjectedConnector({ chains, options: { shimDisconnect: true } }),
];

type ConnectorMetadata = {
  id: "metamask" | "coinbase" | "unknown";
  label: string;
  installLink?: string;
  logoPath: string;
};

export const getConnectorMetadata = (
  connectorId: string
): ConnectorMetadata => {
  if (connectorId === "metaMask") {
    return {
      id: "metamask",
      label: "Metamask",
      installLink: `https://metamask.io/download/`,
      logoPath: "/images/logo-metamask.png",
    };
  }
  if (connectorId === "coinbaseWallet") {
    return {
      id: "coinbase",
      label: "Coinbase",
      logoPath: "/images/logo-coinbase.png",
    };
  }

  return { id: "unknown", label: "Unknown", logoPath: "" };
};

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
