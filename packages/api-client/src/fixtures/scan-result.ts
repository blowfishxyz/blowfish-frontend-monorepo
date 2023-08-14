import {
  EvmMessageScanResult,
  EvmTransactionScanResult,
  EvmTransactionsScanResult,
} from "../clients/v20230605/types";
import {
  approveAllErc721,
  permitErc20NoExpiration,
  receiveErc721,
  sendNativeToken,
} from "./state-change";

export const transactionNoActionScanResult: EvmTransactionScanResult = {
  action: "NONE",
  simulationResults: {
    error: null,
    protocol: null,
    gas: {
      gasLimit: null,
    },
    expectedStateChanges: [receiveErc721, sendNativeToken],
  },
  warnings: [],
};

export const transactionsNoActionScanResult: EvmTransactionsScanResult = {
  action: "NONE",
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

export const transactionWarningScanResult: EvmTransactionScanResult = {
  action: "WARN",
  simulationResults: {
    error: null,
    protocol: null,
    gas: {
      gasLimit: null,
    },
    expectedStateChanges: [approveAllErc721],
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

export const transactionBlockScanResult: EvmTransactionScanResult = {
  action: "BLOCK",
  simulationResults: {
    error: null,
    protocol: null,
    gas: {
      gasLimit: null,
    },
    expectedStateChanges: [approveAllErc721],
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

export const messageNoActionScanResult: EvmMessageScanResult = {
  action: "NONE",
  simulationResults: {
    error: null,
    protocol: null,
    expectedStateChanges: [],
  },
  warnings: [],
};

export const messageWarnResultScanResult: EvmMessageScanResult = {
  action: "WARN",
  warnings: [
    {
      kind: "PERMIT_NO_EXPIRATION",
      message:
        "You are allowing this dApp to withdraw funds from your account in the future",
      severity: "WARNING",
    },
  ],
  simulationResults: {
    protocol: null,
    expectedStateChanges: [permitErc20NoExpiration],
    error: null,
  },
};

export const exampleEthSignScanResult: EvmMessageScanResult = {
  action: "WARN",
  warnings: [
    {
      kind: "ETH_SIGN_TX_HASH",
      message:
        "You are signing what could be a transaction hash, which is a valid Ethereum transaction. Approving may lead to loss of funds.",
      severity: "WARNING",
    },
  ],
  simulationResults: null,
};
