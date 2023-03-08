import type { EvmTransactionObject } from "./EvmTransactionObject";
import type { RequestMetadata } from "./RequestMetadata";
export interface EvmTransactionRequest {
    txObject: EvmTransactionObject;
    metadata: RequestMetadata;
    userAccount: string | null;
}
//# sourceMappingURL=EvmTransactionRequest.d.ts.map