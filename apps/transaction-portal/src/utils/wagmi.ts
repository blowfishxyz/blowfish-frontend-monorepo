import {
  mainnet,
  polygon,
  goerli,
  arbitrum,
  bsc,
  optimismGoerli,
  optimism,
} from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { configureChains, createClient, useConnect, useNetwork } from "wagmi";

import {
  ALCHEMY_API_KEY,
  ALCHEMY_API_KEY_ARBITRUM,
  ALCHEMY_API_KEY_OPTIMISM,
  ALCHEMY_API_KEY_POLYGON,
} from "../config";
import { EthereumIcon } from "@blowfish/protect-ui/icons";

const base = {
  id: 8453,
  network: "base",
  name: "Base",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"],
    },
    public: {
      http: ["https://mainnet.base.org"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Basescan",
      url: "https://basescan.org",
    },
    default: {
      name: "Basescan",
      url: "https://basescan.org",
    },
  },
  testnet: false,
};

const immutableZkevm = {
  id: 13371,
  network: "immutable_zkevm",
  name: "Immutable",
  nativeCurrency: {
    name: "IMX",
    symbol: "IMX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.immutable.com"],
    },
    public: {
      http: ["https://rpc.immutable.com"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Immutable explorer",
      url: "https://explorer.immutable.com",
    },
    default: {
      name: "Immutable explorer",
      url: "https://explorer.immutable.com",
    },
  },
  testnet: false,
};

const immutableZkevmTestnet = {
  id: 13473,
  network: "immutable_zkevm",
  name: "Immutable testnet",
  nativeCurrency: {
    name: "test-IMX",
    symbol: "test-IMX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.immutable.com"],
    },
    public: {
      http: ["https://rpc.testnet.immutable.com"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Immutable explorer",
      url: "https://explorer.testnet.immutable.com",
    },
    default: {
      name: "Immutable explorer",
      url: "https://explorer.testnet.immutable.com",
    },
  },
  testnet: false,
};

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

const getRpcUrl = (chainId: number, protocol: "https" | "wss") => {
  switch (chainId) {
    case 1:
      return `${protocol}://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;
    case 137:
      return `${protocol}://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`;
    case 10:
      return `${protocol}://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_OPTIMISM}`;
    case 42161:
      return `${protocol}://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_ARBITRUM}`;
    default:
      return undefined;
  }
};

export const createWagmiClient = () => {
  const { chains, provider } = configureChains(
    [
      mainnet,
      polygon,
      goerli,
      arbitrum,
      bsc,
      optimismGoerli,
      optimism,
      base,
      immutableZkevm,
      immutableZkevmTestnet,
    ],
    [
      jsonRpcProvider({
        priority: 0,
        rpc: (chain) => {
          const http = getRpcUrl(chain.id, "https");
          const webSocket = getRpcUrl(chain.id, "wss");
          if (http && webSocket) {
            return {
              http,
              webSocket,
            };
          }
          return null;
        },
      }),
      publicProvider({ priority: 1 }),
    ]
  );

  const connectors = [
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
  ];
  return createClient({
    autoConnect: true,
    connectors,
    provider,
  });
};
