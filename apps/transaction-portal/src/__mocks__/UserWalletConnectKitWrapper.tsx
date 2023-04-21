import React from "react";
import { UserWallet } from "~components/UserWallet";

export const UserWalletConnectKitWrapper: React.FC = () => {
  return (
    <UserWallet
      show={() => console.log("show")}
      truncatedAddress="0x2dB2••••f5f3"
      ensName="vitalik.eth"
      isConnecting={false}
      isConnected={true}
      chain={{
        id: 1,
        network: "homestead",
        name: "Ethereum",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: {
          alchemy: {
            http: ["https://eth-mainnet.g.alchemy.com/v2"],
            webSocket: ["wss://eth-mainnet.g.alchemy.com/v2"],
          },
          infura: {
            http: ["https://mainnet.infura.io/v3"],
            webSocket: ["wss://mainnet.infura.io/ws/v3"],
          },
          public: {
            http: ["https://cloudflare-eth.com"],
          },
          default: {
            http: [],
          },
        },
        blockExplorers: {
          etherscan: {
            name: "Etherscan",
            url: "https://etherscan.io",
          },
          default: {
            name: "Etherscan",
            url: "https://etherscan.io",
          },
        },
        contracts: {
          ensRegistry: {
            address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          },
          ensUniversalResolver: {
            address: "0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376",
            blockCreated: 16172161,
          },
          multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 14353601,
          },
        },
        unsupported: false,
      }}
    />
  );
};
