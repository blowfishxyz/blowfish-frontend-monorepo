import type { EvmExpectedStateChange } from "./EvmExpectedStateChange";
import type { EvmSimulationError } from "./EvmSimulationError";
export interface EvmSimulationResult {
    expectedStateChanges: Array<EvmExpectedStateChange>;
    error: EvmSimulationError | null;
}
//# sourceMappingURL=EvmSimulationResult.d.ts.map