import { EvmTransactionScanResult } from "../../utils/BlowfishApiClient";

export const exampleTransaction = {
  from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  data: "0xa9059cbb00000000000000000000000013890a1dbfee3b7debc2b2dfeb9fef2fbf81bd50000000000000000000000000000000000000000000000000000000174876e800",
  value: null,
};

export const noActionScanResult: EvmTransactionScanResult = {
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

export const warningScanResult: EvmTransactionScanResult = {
  action: "WARN",
  simulationResults: {
    error: null,
    expectedStateChanges: [
      {
        humanReadableDiff: "Approve to transfer all your BoredApeYachtClub",
        rawInfo: {
          data: {
            amount: {
              after:
                "115792089237316195423570985008687907853269984665640564039457584007913129639935",
              before: "0",
            },
            contract: {
              address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              kind: "ACCOUNT",
            },
            name: "BoredApeYachtClub",
            owner: {
              address: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
              kind: "ACCOUNT",
            },
            spender: {
              address: "0x00000000006c3852cbef3e08e8df289169ede581",
              kind: "ACCOUNT",
            },
            symbol: "BAYC",
          },
          kind: "ERC721_APPROVAL_FOR_ALL",
        },
      },
    ],
  },
  warnings: [
    {
      kind: "UNLIMITED_ALLOWANCE_TO_NFTS",
      message:
        "You are allowing this dApp to withdraw funds from your account in the future",
      severity: "WARNING",
    },
  ],
};
export const blockScanResult: EvmTransactionScanResult = {
  action: "BLOCK",
  simulationResults: {
    error: null,
    expectedStateChanges: [
      {
        humanReadableDiff: "Approve to transfer all your BoredApeYachtClub",
        rawInfo: {
          data: {
            amount: {
              after:
                "115792089237316195423570985008687907853269984665640564039457584007913129639935",
              before: "0",
            },
            contract: {
              address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              kind: "ACCOUNT",
            },
            name: "BoredApeYachtClub",
            owner: {
              address: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
              kind: "ACCOUNT",
            },
            spender: {
              address: "0x00000000006c3852cbef3e08e8df289169ede581",
              kind: "ACCOUNT",
            },
            symbol: "BAYC",
          },
          kind: "ERC721_APPROVAL_FOR_ALL",
        },
      },
    ],
  },
  warnings: [
    {
      kind: "UNLIMITED_ALLOWANCE_TO_NFTS",
      message:
        "You are allowing this dApp to withdraw funds from your account in the future",
      severity: "WARNING",
    },
  ],
};

export const exampleDappUrl = "https://app.uniswap.org/#/swap";
