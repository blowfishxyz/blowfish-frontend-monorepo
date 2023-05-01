import type {
  ScanMessageEvm200Response,
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner,
  ScanTransactionEvm200Response,
  ScanTransactionEvm200ResponseSimulationResultsExpectedStateChangesInner,
} from "./client/models";

export type EvmMessageExpectedStateChangeV2 =
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner;

export type EvmTransactionExpectedStateChangeV2 =
  ScanTransactionEvm200ResponseSimulationResultsExpectedStateChangesInner;

export type EvmExpectedStateChangeV2 =
  | EvmMessageExpectedStateChangeV2
  | EvmTransactionExpectedStateChangeV2;

export type EvmTransactionScanResultV2 = ScanTransactionEvm200Response;

export type EvmMessageScanResultV2 = ScanMessageEvm200Response;

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
