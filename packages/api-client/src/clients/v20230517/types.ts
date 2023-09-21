import {
  ScanTransactionsEvmOperationChainFamilyEnum,
  ScanTransactionsEvmOperationChainNetworkEnum,
  ScanTransactionsSolanaOperationChainNetworkEnum,
} from "../../generated/v20230517";
import type {
  ScanMessageEvm200Response,
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner,
  ScanTransactionEvm200Response,
  ScanTransactionsEvm200Response,
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
  ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner,
  ScanTransactionsSolana200Response,
} from "../../generated/v20230517/models";

// TODO: use a separate ref in the schema to generate a standalone enum
export type EvmChainFamily = ScanTransactionsEvmOperationChainFamilyEnum;
export type EvmChainNetwork = ScanTransactionsEvmOperationChainNetworkEnum;
export type SolanaChainFamily = "solana";
export type SolanaChainNetwork =
  ScanTransactionsSolanaOperationChainNetworkEnum;

export type EvmMessageExpectedStateChange =
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner;

export type EvmTransactionExpectedStateChange = EvmExpectedStateChangesInner;

export type EvmNftStateChange =
  | EvmStateChangeErc1155ApprovalForAll
  | EvmStateChangeErc1155Transfer
  | EvmStateChangeErc721Approval
  | EvmStateChangeErc721ApprovalForAll
  | EvmStateChangeErc721Transfer;

export type EvmCurrencyStateChange =
  | EvmStateChangeNativeAssetTransfer
  | EvmStateChangeErc20Transfer
  | EvmStateChangeErc20Permit
  | EvmStateChangeErc20Approval;

export type EvmExpectedStateChange =
  | EvmMessageExpectedStateChange
  | EvmTransactionExpectedStateChange;

export type EvmTransactionScanResult = ScanTransactionEvm200Response;
export type EvmTransactionsScanResult = ScanTransactionsEvm200Response;
export type EvmMessageScanResult = ScanMessageEvm200Response;

export type SolanaTransactionsResult = ScanTransactionsSolana200Response;
export type SolanaExpectedStateChange =
  ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner;

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

export * from "../../generated/v20230517/models";
