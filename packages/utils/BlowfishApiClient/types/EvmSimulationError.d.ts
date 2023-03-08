export type EvmSimulationError = {
    kind: "UNKNOWN_ERROR";
    humanReadableError: string;
} | {
    kind: "SIMULATION_FAILED";
    humanReadableError: string;
    parsedErrorMessage: string;
} | {
    kind: "INVALID_TRANSACTION";
    humanReadableError: string;
};
//# sourceMappingURL=EvmSimulationError.d.ts.map