import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import { PopupContainer } from "../components/PopupContainer";
import { ScanResults } from "../components/ScanResults";

import { EvmTransactionScanResult } from "../utils/BlowfishApiClient";

export default {
  title: "PopupContainer",
  component: PopupContainer,
  args: {
    userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof PopupContainer>;

export const Container: ComponentStory<typeof PopupContainer> = (props) => (
  <div style={{ width: "368px", height: "625px" }}>
    <Providers>
      <PopupContainer {...props}>
        <ScanResults
          transaction={exampleTransaction}
          scanResults={exampleScanResults}
          dappUrl={exampleDappUrl}
          onContinue={async () => {
            console.log("CONTINUE");
          }}
          onCancel={async () => {
            console.log("CANCEL");
          }}
        />
      </PopupContainer>
    </Providers>
  </div>
);

// TODO(kimpers): move into story
const exampleTransaction = {
  from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  data: "0xa9059cbb00000000000000000000000013890a1dbfee3b7debc2b2dfeb9fef2fbf81bd50000000000000000000000000000000000000000000000000000000174876e800",
  value: null,
};

const exampleScanResults: EvmTransactionScanResult = {
  action: "NONE",
  simulationResults: {
    error: null,
    expectedStateChanges: [
      {
        humanReadableDiff: "Receive PudgyPenguins #7238",
        rawInfo: {
          data: {
            amount: {
              after: "1",
              before: "0",
            },
            contract: {
              address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
              kind: "ACCOUNT",
            },
            metadata: {
              rawImageUrl:
                "https://ipfs.io/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/7238.png",
            },
            name: "PudgyPenguins",
            symbol: "PPG",
            tokenId: "7238",
          },
          kind: "ERC721_TRANSFER",
        },
      },
      {
        humanReadableDiff: "Send 3.181 ETH",
        rawInfo: {
          data: {
            amount: {
              after: "998426264937289938488",
              before: "1001607264937289938488",
            },
            contract: {
              address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              kind: "ACCOUNT",
            },
            decimals: 18,
            name: "Ether",
            symbol: "ETH",
          },
          kind: "NATIVE_ASSET_TRANSFER",
        },
      },
    ],
  },
  warnings: [],
};

const exampleDappUrl = "https://app.uniswap.org/#/swap";
