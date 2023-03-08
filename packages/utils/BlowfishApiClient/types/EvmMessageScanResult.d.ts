import type { Action } from "./Action";
import type { EvmMessageSimulationResult } from "./EvmMessageSimulationResult";
import type { Warning } from "./Warning";
export interface EvmMessageScanResult {
    action: Action;
    warnings: Array<Warning>;
    simulationResults: EvmMessageSimulationResult | null;
}
//# sourceMappingURL=EvmMessageScanResult.d.ts.map