import type {
  ScanMessageEvm200Response,
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner,
  ScanTransactionEvm200Response,
  EvmExpectedStateChangesInner,
  EvmStateChangeErc1155ApprovalForAll,
  EvmStateChangeErc1155Transfer,
  EvmStateChangeErc721Approval,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  EvmStateChangeNativeAssetTransfer,
  EvmStateChangeErc20Approval,
  EvmStateChangeErc20Transfer,
  EvmStateChangeErc20Permit,
} from "./client/models";

export type ChainFamily =
  | "ethereum"
  | "polygon"
  | "arbitrum"
  | "bnb"
  | "optimism";
export type ChainNetwork = "mainnet" | "goerli" | "one";

export type EvmMessageExpectedStateChange =
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner;

export type EvmTransactionExpectedStateChange = EvmExpectedStateChangesInner;

export type NftStateChange =
  | EvmStateChangeErc1155ApprovalForAll
  | EvmStateChangeErc1155Transfer
  | EvmStateChangeErc721Approval
  | EvmStateChangeErc721ApprovalForAll
  | EvmStateChangeErc721Transfer;

export type CurrencyStateChange =
  | EvmStateChangeNativeAssetTransfer
  | EvmStateChangeErc20Transfer
  | EvmStateChangeErc20Permit
  | EvmStateChangeErc20Approval;

export type EvmExpectedStateChange =
  | EvmMessageExpectedStateChange
  | EvmTransactionExpectedStateChange;

export type EvmTransactionScanResult = ScanTransactionEvm200Response;

export type EvmMessageScanResult = ScanMessageEvm200Response;

export interface SignTypedDataPayload {
  domain: {
    chainId?: string | number | bigint;
    name?: string;
    salt?: `0x${string}`;
    verifyingContract?: `0x${string}`;
    version?: string;
  };
  message: { [key: string]: unknown };

  types: {
    // TODO(kimpers): Proper typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  // TODO(kimpers): Proper typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TypedDataV1Field {
  type: string;
  name: string;
  value: unknown;
}

export * from "./client/models";
