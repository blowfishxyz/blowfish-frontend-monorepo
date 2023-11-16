import { EvmTransactionsScanResult } from "../../clients/v20230605/types";
import {
  approveAllErc1155,
  approveAllErc721,
  approveErc20,
  approveErc721,
  receiveErc1155,
  receiveErc20,
  receiveErc721,
  sendErc20,
  sendNativeToken,
} from "../state-change";

export const buyErc721WithEth: EvmTransactionsScanResult = {
  action: "NONE",
  warnings: [],
  simulationResults: {
    aggregated: {
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [
          receiveErc721,
          sendNativeToken,
        ],
      },
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      error: null,
    },
    perTransaction: [
      {
        protocol: null,
        error: null,
        gas: {
          gasLimit: null,
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
};

export const error: EvmTransactionsScanResult = {
  action: "NONE",
  warnings: [],
  simulationResults: {
    aggregated: {
      expectedStateChanges: {},
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      error: {
        kind: "UNKNOWN_ERROR",
        humanReadableError: "Some human readable error",
      },
    },
    perTransaction: [],
  },
};

export const buyErc1155WithEth: EvmTransactionsScanResult = {
  action: "NONE",
  simulationResults: {
    aggregated: {
      error: null,
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [
          sendNativeToken,
          receiveErc1155,
        ],
      },
    },
    perTransaction: [
      {
        protocol: null,
        error: null,
        gas: {
          gasLimit: null,
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
  warnings: [],
};

export const erc20SwapWethforUsdc: EvmTransactionsScanResult = {
  action: "NONE",
  warnings: [],
  simulationResults: {
    aggregated: {
      expectedStateChanges: {
        "0x397ff1542f962076d0bfe58ea045ffa2d347aca0": [sendErc20, receiveErc20],
        "0x06924592cdf28acd3c1d23c37875c6c6a667bdf7": [
          sendErc20,
          receiveErc20,
          approveErc20,
        ],
        "0x4a86c01d67965f8cb3d0aaa2c655705e64097c31": [receiveErc20, sendErc20],
      },
      error: null,
      userAccount: "0x06924592cdf28acd3c1d23c37875c6c6a667bdf7",
    },
    perTransaction: [
      {
        error: null,
        gas: {
          gasLimit: "190743",
        },
        protocol: {
          trustLevel: "TRUSTED",
          name: "SushiSwap",
          description: "A decentralized exchange for tokens",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attQeriKD4vpwX3sc.png",
          websiteUrl: "https://www.sushi.com/",
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
};

export const approveErc20ScanResult: EvmTransactionsScanResult = {
  action: "NONE",
  warnings: [],
  simulationResults: {
    aggregated: {
      error: null,
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [approveErc20],
      },
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    },
    perTransaction: [
      {
        protocol: null,
        error: null,
        gas: {
          gasLimit: null,
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
};

export const approveErc721ScanResult: EvmTransactionsScanResult = {
  action: "NONE",
  warnings: [],
  simulationResults: {
    aggregated: {
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [approveErc721],
      },
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      error: null,
    },
    perTransaction: [
      {
        protocol: null,
        error: null,
        gas: {
          gasLimit: null,
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
};

export const approveAllErc721ScanResult: EvmTransactionsScanResult = {
  action: "WARN",
  warnings: [
    {
      kind: "UNLIMITED_ALLOWANCE_TO_NFTS",
      message:
        "You are allowing this website to withdraw funds from your account in the future.",
      severity: "WARNING",
    },
  ],
  simulationResults: {
    aggregated: {
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [approveAllErc721],
      },
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      error: null,
    },
    perTransaction: [
      {
        protocol: null,
        error: null,
        gas: {
          gasLimit: null,
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
};

export const approveAllErc1155ScanResult: EvmTransactionsScanResult = {
  action: "WARN",
  warnings: [
    {
      kind: "UNLIMITED_ALLOWANCE_TO_NFTS",
      message:
        "You are allowing this website to withdraw funds from your account in the future.",
      severity: "WARNING",
    },
  ],
  simulationResults: {
    aggregated: {
      error: null,
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [approveAllErc1155],
      },
    },
    perTransaction: [
      {
        protocol: null,
        error: null,
        gas: {
          gasLimit: null,
        },
        logs: [],
        decodedLogs: [],
        decodedCalldata: null,
      },
    ],
  },
};

export const transactionsNoActionScanResult: EvmTransactionsScanResult = {
  action: "NONE",
  simulationResults: {
    perTransaction: [],
    aggregated: {
      error: null,
      userAccount: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
      expectedStateChanges: {
        "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236": [
          receiveErc721,
          sendNativeToken,
        ],
      },
    },
  },
  warnings: [],
};

export const transactionWarningScanResult: EvmTransactionsScanResult = {
  action: "WARN",
  simulationResults: {
    perTransaction: [],
    aggregated: {
      error: null,
      userAccount: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
      expectedStateChanges: {
        "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236": [approveAllErc721],
      },
    },
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

export const transactionsWarningScanResult: EvmTransactionsScanResult = {
  action: "WARN",
  simulationResults: {
    aggregated: {
      error: null,
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [approveAllErc721],
      },
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    },
    perTransaction: [
      {
        decodedCalldata: null,
        decodedLogs: [
          {
            name: "Transfer",
            params: [
              {
                name: "from",
                paramType: "address",
                value: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
              },
            ],
            signature: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f5",
          },
        ],
        gas: { gasLimit: "119816" },
        logs: [],
        protocol: null,
        error: null,
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

export const transactionBlockScanResult: EvmTransactionsScanResult = {
  action: "BLOCK",
  simulationResults: {
    perTransaction: [],
    aggregated: {
      error: null,
      userAccount: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
      expectedStateChanges: {
        "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236": [approveAllErc721],
      },
    },
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

export const transactionsBlockScanResult: EvmTransactionsScanResult = {
  action: "BLOCK",
  simulationResults: {
    aggregated: {
      error: null,
      expectedStateChanges: {
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": [approveAllErc721],
      },
      userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    },
    perTransaction: [],
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
