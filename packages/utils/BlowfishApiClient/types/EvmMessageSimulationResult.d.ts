import type { EvmExpectedStateChange } from "./EvmExpectedStateChange";
import type { EvmMessageSimulationError } from "./EvmMessageSimulationError";
export interface EvmMessageSimulationResult {
    expectedStateChanges: Array<EvmExpectedStateChange>;
    error: EvmMessageSimulationError | null;
}
//# sourceMappingURL=EvmMessageSimulationResult.d.ts.map