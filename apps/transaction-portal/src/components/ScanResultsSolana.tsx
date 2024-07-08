import React, { useMemo, useEffect } from "react";
import {
  Row,
  StateChangePreviewSolana,
  getErrorFromSolanaScanResponse,
  getResultsFromSolanaScanResponse,
  UIWarning,
} from "@blowfishxyz/ui";
import {
  BlowfishSimulationError,
  ScanTransactionsSolana200Response,
  ScanTransactionsSolanaRequest,
} from "@blowfishxyz/api-client";
import { ChainNetwork } from "@blowfish/utils/chains";
import { actionToSeverity } from "@blowfish/utils/types";
import { useLayoutConfig } from "~components/layout/Layout";
import { useReportTransaction } from "~hooks/useReportTransaction";
import { AdvancedDetails } from "./AdvancedDetails";
import { createValidURL } from "~utils/utils";
import { PreviewTxn } from "./cards/PreviewTxn";
import { sendAbort, sendSafeguardResult } from "~utils/messages";

interface ScanResultsSolanaProps {
  request: ScanTransactionsSolanaRequest;
  scanResults: ScanTransactionsSolana200Response;
  safeguardScanResults?: ScanTransactionsSolana200Response;
  chainNetwork: ChainNetwork;
  impersonatingAddress: string | undefined;
  messageId?: string;
}

const ScanResultsSolana: React.FC<ScanResultsSolanaProps> = ({
  request,
  scanResults,
  safeguardScanResults,
  impersonatingAddress,
  messageId,
}) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();
  const error = getErrorFromSolanaScanResponse(scanResults);
  const safeguardAssertError = getSafeguardError(safeguardScanResults);
  const result = getResultsFromSolanaScanResponse(
    scanResults,
    request.userAccount
  );

  const reportTransaction = useReportTransaction();

  const warnings: UIWarning[] = useMemo(() => {
    // Take warnings return from API first hand
    const warnings = scanResults.aggregated.warnings || [];

    function getInferedWarning(): UIWarning | undefined {
      const simulationResults = scanResults || undefined;
      if (safeguardAssertError) {
        return {
          severity: "WARNING",
          kind: "SAFEGUARD_ASSERTION_ERROR",
          message: safeguardAssertError.humanReadableError,
        };
      }
      if (error) {
        return {
          severity: "WARNING",
          message: error.humanReadableError,
        };
      }
      if (!simulationResults) {
        return {
          severity: "WARNING",
          message: `We are unable to simulate this message. Proceed with caution`,
        };
      }
    }

    const inferredWarning = getInferedWarning();
    if (inferredWarning) {
      return [...warnings, inferredWarning];
    }

    return warnings;
  }, [scanResults, error]);

  const severity = useMemo(() => {
    if (
      scanResults?.aggregated.action === "NONE" &&
      !result?.expectedStateChanges &&
      error
    ) {
      return "WARNING";
    }

    if (safeguardAssertError) {
      return "WARNING";
    }

    return scanResults?.aggregated.action
      ? actionToSeverity(scanResults?.aggregated.action)
      : "INFO";
  }, [
    scanResults?.aggregated.action,
    error,
    result?.expectedStateChanges,
    safeguardAssertError,
  ]);

  useEffect(() => {
    if (error && severity === "INFO") {
      setLayoutConfig((prev) => ({
        ...prev,
        severity: "WARNING",
        impersonatingAddress,
      }));
    } else {
      setLayoutConfig((prev) => ({ ...prev, severity, impersonatingAddress }));
    }
    return () => {
      setLayoutConfig((prev) => ({
        ...prev,
        severity: "INFO",
        impersonatingAddress,
      }));
    };
  }, [severity, impersonatingAddress, setLayoutConfig, error]);

  const dappUrl = useMemo(
    () => createValidURL(request.metadata.origin),
    [request.metadata.origin]
  );

  return (
    <Row justifyContent="center">
      <PreviewTxn
        simulationError={error?.humanReadableError}
        warnings={warnings}
        severity={severity}
        dappUrl={dappUrl}
        protocol={null}
        decodedCalldata={undefined}
        advancedDetails={
          <AdvancedDetails
            request={request}
            scanResults={
              layoutConfig.hasRequestParams ? scanResults : undefined
            }
            // Note(Lolu):  No logs for MVP, we can add it later
            decodedLogs={undefined}
          />
        }
        onReport={() => reportTransaction(scanResults.requestId)}
        onContinue={async () => {
          if (messageId) {
            await sendSafeguardResult(
              messageId,
              scanResults.safeguard?.transactions
            );
          }
          window.close();
          return Promise.resolve();
        }}
        onCancel={async () => {
          if (messageId) {
            await sendAbort(messageId);
          }
          window.close();
        }}
      >
        <StateChangePreviewSolana
          scanResult={scanResults}
          chainNetwork="mainnet"
          userAccount={request.userAccount}
        />
      </PreviewTxn>
    </Row>
  );
};

function getSafeguardError(
  simulationResults: ScanTransactionsSolana200Response | undefined
): BlowfishSimulationError | undefined {
  const tx = simulationResults?.perTransaction.find((tx) => {
    return (
      tx.error?.kind === "PROGRAM_ERROR" &&
      tx.error.solanaProgramAddress ===
        "L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK"
    );
  });
  if (!tx) {
    return;
  }
  if (!tx.raw.logs) {
    return;
  }
  const startLogIdx = tx.raw.logs.findIndex((log) => {
    return log.startsWith(
      "Program L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK invoke"
    );
  });
  const endLogIdx = tx.raw.logs.findIndex((log) => {
    return log.startsWith(
      "Program L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK consumed"
    );
  });

  if (startLogIdx !== -1 && endLogIdx !== -1) {
    const instruction =
      tx.raw.logs[startLogIdx + 1]?.split("Instruction:")?.[1];
    const assertTxt = tx.raw.logs[startLogIdx + 2]?.split("Result:")?.[1];
    return {
      kind: "SIMULATION_FAILED",
      humanReadableError: `${instruction}: ${assertTxt}`,
    };
  }
}

export default ScanResultsSolana;
