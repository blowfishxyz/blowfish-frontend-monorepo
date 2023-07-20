import {
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfishxyz/api-client";
import {
  RequestType,
  SignMessageRequest,
  SignTypedDataRequest,
  SignTypedDataVersion,
  TransactionRequest,
} from "@blowfish/utils/types";

import {
  approveAllErc721,
  permitErc20NoExpiration,
  receiveErc721,
  sendErc20,
} from "./state-changes";

export const exampleTransactionRequest: TransactionRequest = {
  type: RequestType.Transaction,
  chainId: "1",
  extensionVersion: "10.0.0",
  userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  payload: {
    from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    data: "0xa9059cbb00000000000000000000000013890a1dbfee3b7debc2b2dfeb9fef2fbf81bd50000000000000000000000000000000000000000000000000000000174876e800",
    value: undefined,
  },
};

export const exampleNftSignTypedDataRequest: SignTypedDataRequest = {
  type: RequestType.SignTypedData,
  signTypedDataVersion: SignTypedDataVersion.V4,
  chainId: "1",
  extensionVersion: "10.0.0",
  userAccount: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
  payload: {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      OrderComponents: [
        { name: "offerer", type: "address" },
        { name: "zone", type: "address" },
        { name: "offer", type: "OfferItem[]" },
        { name: "consideration", type: "ConsiderationItem[]" },
        { name: "orderType", type: "uint8" },
        { name: "startTime", type: "uint256" },
        { name: "endTime", type: "uint256" },
        { name: "zoneHash", type: "bytes32" },
        { name: "salt", type: "uint256" },
        { name: "conduitKey", type: "bytes32" },
        { name: "counter", type: "uint256" },
      ],
      OfferItem: [
        { name: "itemType", type: "uint8" },
        { name: "token", type: "address" },
        { name: "identifierOrCriteria", type: "uint256" },
        { name: "startAmount", type: "uint256" },
        { name: "endAmount", type: "uint256" },
      ],
      ConsiderationItem: [
        { name: "itemType", type: "uint8" },
        { name: "token", type: "address" },
        { name: "identifierOrCriteria", type: "uint256" },
        { name: "startAmount", type: "uint256" },
        { name: "endAmount", type: "uint256" },
        { name: "recipient", type: "address" },
      ],
    },
    primaryType: "OrderComponents",
    domain: {
      name: "Seaport",
      version: "1.1",
      chainId: "1",
      verifyingContract: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
    },
    message: {
      offerer: "0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236",
      offer: [
        {
          itemType: "2",
          token: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          identifierOrCriteria: "1726",
          startAmount: "1",
          endAmount: "1",
        },
      ],
      consideration: [
        {
          itemType: "0",
          token: "0x0000000000000000000000000000000000000000",
          identifierOrCriteria: "0",
          startAmount: "94050000000000000000",
          endAmount: "94050000000000000000",
          recipient: "0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236",
        },
        {
          itemType: "0",
          token: "0x0000000000000000000000000000000000000000",
          identifierOrCriteria: "0",
          startAmount: "2475000000000000000",
          endAmount: "2475000000000000000",
          recipient: "0x0000a26b00c1F0DF003000390027140000fAa719",
        },
        {
          itemType: "0",
          token: "0x0000000000000000000000000000000000000000",
          identifierOrCriteria: "0",
          startAmount: "2475000000000000000",
          endAmount: "2475000000000000000",
          recipient: "0xA858DDc0445d8131daC4d1DE01f834ffcbA52Ef1",
        },
      ],
      startTime: "1664436437",
      endTime: "1667028437",
      orderType: "2",
      zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
      zoneHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      salt: "24446860302761739304752683030156737591518664810215442929818054330004503495628",
      conduitKey:
        "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
      totalOriginalConsiderationItems: "3",
      counter: "53",
    },
  },
};

export const examplePermitSignTypeDataRequest: SignTypedDataRequest = {
  type: RequestType.SignTypedData,
  signTypedDataVersion: SignTypedDataVersion.V4,
  chainId: "1",
  userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  extensionVersion: "10.0.0",
  payload: {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    domain: {
      name: "USD Coin",
      version: "2",
      verifyingContract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      chainId: "1",
    },
    primaryType: "Permit",
    message: {
      owner: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      spender: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      value: "123000000000",
      nonce: "7",
      deadline:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    },
  },
};

export const exampleEthSignRequest: SignMessageRequest = {
  type: RequestType.SignMessage,
  payload: {
    method: "eth_sign",
    message:
      "0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0",
  },
  chainId: "1",
  userAccount: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  isImpersonatingWallet: true,
  extensionVersion: "10.0.0",
};

export const transactionNoActionScanResult: EvmTransactionScanResult = {
  action: "NONE",
  simulationResults: {
    error: null,
    protocol: null,
    gas: {
      gasLimit: null,
    },
    expectedStateChanges: [receiveErc721, sendErc20],
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      kind: "ETH_SIGN_TX_HASH" as any,
      message:
        "You are signing what could be a transaction hash, which is a valid Ethereum transaction. Approving may lead to loss of funds.",
      severity: "WARNING",
    },
  ],
  simulationResults: null,
};

export const exampleDappUrl = "https://app.uniswap.org/#/swap";
