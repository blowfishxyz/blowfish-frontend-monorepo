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
import { configureChains, createClient, useConnect, useNetwork } from "wagmi";

import { ALCHEMY_API_KEY } from "../config";
import { EthereumIcon } from "@blowfish/ui/icons";

export const useConnectedChainId = () => {
  const network = useNetwork();
  return network.chain?.id;
};

export const useConnectors = () => {
  const { connectors } = useConnect();
  const injectedConnector = connectors.find(
    (x) => x.id === "injected" && x.ready
  );

  const displayedConnectors = injectedConnector
    ? [
        injectedConnector,
        ...connectors.filter((x) => x.name !== injectedConnector.name),
      ]
    : connectors.filter((x) => x.id !== "injected");

  return displayedConnectors.filter((x) => x.ready);
};

type ConnectorMetadata = {
  id: "metamask" | "coinbase" | "injected" | "unknown";
  label: string;
  installLink?: string;
  logoPath: string | React.FC | undefined;
};

export const getConnectorMetadata = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): ConnectorMetadata => {
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

  if (id === "injected") {
    return {
      id: "injected",
      label: name,
      logoPath: EthereumIcon,
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
        new InjectedConnector({
          chains,
          options: { shimDisconnect: true },
        }),
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
