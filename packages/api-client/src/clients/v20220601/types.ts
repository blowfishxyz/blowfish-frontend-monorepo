import {
  ScanTransactionEvmOperationChainFamilyEnum,
  ScanTransactionEvmOperationChainNetworkEnum,
  ScanTransactionsSolanaOperationChainNetworkEnum,
} from "../../generated/v20220601";
import type {
  ScanMessageEvm200Response,
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner,
  ScanTransactionEvm200Response,
  ScanTransactionEvm200ResponseSimulationResultsExpectedStateChangesInner,
  EvmStateChangeErc1155ApprovalForAll,
  EvmStateChangeErc1155Transfer,
  EvmStateChangeErc721Approval,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  EvmStateChangeNativeAssetTransfer,
  EvmStateChangeErc20Approval,
  EvmStateChangeErc20Permit,
  EvmStateChangeErc20Transfer,
  ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner,
  ScanTransactionsSolana200Response,
} from "../../generated/v20220601/models";

// TODO: use a separate ref in the schema to generate a standalone enum
export type EvmChainFamily = ScanTransactionEvmOperationChainFamilyEnum;
export type EvmChainNetwork = ScanTransactionEvmOperationChainNetworkEnum;
export type SolanaChainFamily = "solana";
export type SolanaChainNetwork =
  ScanTransactionsSolanaOperationChainNetworkEnum;

export type EvmMessageExpectedStateChange =
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner;

export type EvmTransactionExpectedStateChange =
  ScanTransactionEvm200ResponseSimulationResultsExpectedStateChangesInner;

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
export type EvmTransactionsScanResult = ScanTransactionEvm200Response;
export type EvmMessageScanResult = ScanMessageEvm200Response;

export type SolanaTransactionsResult = ScanTransactionsSolana200Response;
export type SolanaExpectedStateChange =
  ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner;

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

export * from "../../generated/v20220601/models";
