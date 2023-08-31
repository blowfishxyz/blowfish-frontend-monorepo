import {
  EvmDecodedCalldata,
  EvmDecodedLog,
  EvmExpectedStateChange,
  ScanMessageEvm200ResponseSimulationResults,
  ScanMessageEvm200ResponseSimulationResultsError,
  EvmSimulationResults,
  EvmAggregatedSimulationError,
} from "@blowfishxyz/api-client";

export const getErrorFromScanResponse = (
  simulationResults:
    | EvmSimulationResults
    | ScanMessageEvm200ResponseSimulationResults
    | null
    | undefined
):
  | EvmAggregatedSimulationError
  | ScanMessageEvm200ResponseSimulationResultsError
  | null => {
  if (!simulationResults) return null;

  if ("aggregated" in simulationResults) {
    return simulationResults.aggregated?.error;
  } else {
    return simulationResults.error;
  }
};

export const getResultsFromScanResponse = (
  simulationResults:
    | EvmSimulationResults
    | ScanMessageEvm200ResponseSimulationResults
    | null
): {
  expectedStateChanges: EvmExpectedStateChange[] | undefined;
  decodedCalldata?: EvmDecodedCalldata | null;
  decodedLogs?: EvmDecodedLog[];
} | null => {
  if (!simulationResults) return null;

  if ("aggregated" in simulationResults) {
    const aggregated = simulationResults.aggregated;
    const { userAccount } = aggregated;
    return {
      expectedStateChanges: aggregated.expectedStateChanges[userAccount],
      decodedCalldata: simulationResults.perTransaction[0]?.decodedCalldata,
      decodedLogs: simulationResults.perTransaction[0]?.decodedLogs,
    };
  } else {
    return {
      expectedStateChanges: simulationResults.expectedStateChanges,
    };
  }
};
