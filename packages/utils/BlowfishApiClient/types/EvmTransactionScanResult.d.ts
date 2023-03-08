import type { Action } from "./Action";
import type { EvmSimulationResult } from "./EvmSimulationResult";
import type { Warning } from "./Warning";
export interface EvmTransactionScanResult {
    action: Action;
    warnings: Array<Warning>;
    simulationResults: EvmSimulationResult;
}
//# sourceMappingURL=EvmTransactionScanResult.d.ts.map