import {
  ScanTransactionsSolana200Response,
  BlowfishSimulationError,
  SolanaSimulationError,
  ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner,
} from "@blowfishxyz/api-client";

export const getErrorFromSolanaScanResponse = (
  simulationResults: ScanTransactionsSolana200Response | null | undefined
): BlowfishSimulationError | SolanaSimulationError | null => {
  if (!simulationResults) return null;

  if ("aggregated" in simulationResults) {
    return (
      simulationResults.aggregated?.error ||
      simulationResults.perTransaction[0]?.error
    );
  } else {
    return null;
  }
};

export const getResultsFromSolanaScanResponse = (
  simulationResults: ScanTransactionsSolana200Response | null | undefined,
  userAccount: string | undefined
): {
  expectedStateChanges:
    | ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner[]
    | undefined;
} | null => {
  if (!simulationResults) {
    return null;
  }
  if (!userAccount) {
    return null;
  }

  if ("aggregated" in simulationResults && simulationResults.aggregated) {
    return {
      expectedStateChanges:
        simulationResults.aggregated.expectedStateChanges[userAccount],
    };
  } else {
    return null;
  }
};
