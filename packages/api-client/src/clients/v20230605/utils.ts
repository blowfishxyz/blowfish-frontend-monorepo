import {
  ScanTransactionEvm200Response,
  ScanTransactionsEvm200Response,
} from "./types";

export function mapTransactionsToLegacy(
  response: ScanTransactionsEvm200Response
): ScanTransactionEvm200Response {
  const { simulationResults, ...rest } = response;
  const tx = simulationResults.perTransaction[0];
  if (!tx) {
    return {
      ...rest,
      simulationResults: {
        gas: {
          gasLimit: null,
        },
        protocol: null,
        error: simulationResults.aggregated.error,
        expectedStateChanges:
          simulationResults.aggregated.expectedStateChanges[
            simulationResults.aggregated.userAccount
          ] || [],
      },
    };
  }
  const expectedStateChanges =
    simulationResults.aggregated.expectedStateChanges[
      simulationResults.aggregated.userAccount
    ] || [];
  const item = {
    gas: tx.gas,
    error: tx.error,
    protocol: tx.protocol,
    expectedStateChanges,
  };

  return { ...rest, simulationResults: item };
}
