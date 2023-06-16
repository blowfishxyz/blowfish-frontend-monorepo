import {
  mainnet,
  polygon,
  goerli,
  arbitrum,
  bsc,
  optimismGoerli,
  optimism,
} from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { configureChains, createClient, useNetwork } from "wagmi";

import { ALCHEMY_API_KEY } from "../config";

export const useConnectedChainId = () => {
  const network = useNetwork();
  return network.chain?.id;
};

type ConnectorMetadata = {
  id: "metamask" | "coinbase" | "injected" | "unknown";
  label: string;
  installLink?: string;
  logoPath: string | undefined;
};

export const getConnectorMetadata = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): ConnectorMetadata => {
  if (
    id === "injected" &&
    (name === "MetaMask" || name === "Coinbase Wallet")
  ) {
    return {
      id: "injected",
      label: name === "Coinbase Wallet" ? "Coinbase" : "Metamask",
      logoPath:
        name === "Coinbase Wallet"
          ? "/images/logo-coinbase.png"
          : "/images/logo-metamask.png",
    };
  }

  if (name === "MetaMask") {
    return {
      id: "metamask",
      label: "Metamask",
      installLink: `https://metamask.io/download/`,
      logoPath: "/images/logo-metamask.png",
    };
  }
  if (name === "Coinbase Wallet") {
    return {
      id: "coinbase",
      label: "Coinbase",
      logoPath: "/images/logo-coinbase.png",
    };
  }

  return { id: "unknown", label: "Unknown", logoPath: undefined };
};

export const createWagmiClient = (v2Enabled: boolean) => {
  const { chains, provider } = configureChains(
    [mainnet, polygon, goerli, arbitrum, bsc, optimismGoerli, optimism],
    [
      alchemyProvider({
        apiKey: ALCHEMY_API_KEY,
        priority: 0,
      }),
      publicProvider({ priority: 1 }),
    ]
  );

  const connectors = v2Enabled
    ? [
        new MetaMaskConnector({
          chains,
          options: {
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
          },
        }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: "Blowfish Protect",
          },
        }),
        new InjectedConnector({ chains, options: { shimDisconnect: true } }),
      ]
    : [
        new MetaMaskConnector({
          chains,
          options: {
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
          },
        }),
        new InjectedConnector({ chains, options: { shimDisconnect: true } }),
      ];

  return createClient({
    autoConnect: true,
    connectors,
    provider,
  });
};
