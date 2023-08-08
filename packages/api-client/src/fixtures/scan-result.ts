import {
  EvmMessageScanResult,
  EvmTransactionScanResult,
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
