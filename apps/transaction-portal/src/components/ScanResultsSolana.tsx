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
import { Divider } from "./cards/common";
import { VERIFY_ERROR, verifyTransactions } from "@blowfishxyz/safeguard";

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
  const [, setLayoutConfig] = useLayoutConfig();
  const error = getErrorFromSolanaScanResponse(scanResults);
  const safeguardAssertErrors = getSafeguardErrors(safeguardScanResults);
  const safeguardVerifyError = getSafeguardVerifyError(
    request.transactions,
    scanResults.safeguard?.transactions
  );

  const result = getResultsFromSolanaScanResponse(
    scanResults,
    request.userAccount
  );

  const reportTransaction = useReportTransaction();

  const warnings: UIWarning[] = useMemo(() => {
    // Take warnings return from API first hand
    const warnings = scanResults.aggregated.warnings || [];

    function getInferedWarnings(): UIWarning[] | undefined {
      const simulationResults = scanResults || undefined;
      const allSafeguardErrors = [];
      if (safeguardVerifyError) {
        allSafeguardErrors.push({
          severity: "WARNING",
          kind: "SAFEGUARD_VERIFY_ERROR",
          message: safeguardVerifyError,
        } as UIWarning);
      }
      if (safeguardAssertErrors) {
        allSafeguardErrors.push(
          ...safeguardAssertErrors.map(
            (safeguardAssertError) =>
              ({
                severity: "WARNING",
                kind: "SAFEGUARD_ASSERTION_ERROR",
                message: safeguardAssertError.humanReadableError,
              } as UIWarning)
          )
        );
      }
      if (allSafeguardErrors.length > 0) {
        return allSafeguardErrors;
      }

      if (error) {
        return [
          {
            severity: "WARNING",
            message: error.humanReadableError,
          },
        ];
      }
      if (!simulationResults) {
        return [
          {
            severity: "WARNING",
            message: `We are unable to simulate this message. Proceed with caution`,
          },
        ];
      }
    }

    const inferredWarnings = getInferedWarnings();
    if (inferredWarnings) {
      return [...warnings, ...inferredWarnings];
    }

    return warnings;
  }, [scanResults, error, safeguardAssertErrors, safeguardVerifyError]);

  const severity = useMemo(() => {
    if (
      scanResults?.aggregated.action === "NONE" &&
      !result?.expectedStateChanges &&
      error
    ) {
      return "WARNING";
    }

    if (safeguardAssertErrors) {
      return "WARNING";
    }

    if (safeguardVerifyError) {
      return "WARNING";
    }

    return scanResults?.aggregated.action
      ? actionToSeverity(scanResults?.aggregated.action)
      : "INFO";
  }, [
    scanResults?.aggregated.action,
    error,
    result?.expectedStateChanges,
    safeguardAssertErrors,
    safeguardVerifyError,
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
          <>
            <AdvancedDetails
              request={request}
              scanResults={scanResults}
              safeguardScanResults={undefined}
              decodedLogs={undefined}
            />
            {!!safeguardScanResults && (
              <>
                <Divider $margin="16px 0" />
                <AdvancedDetails
                  request={request}
                  scanResults={undefined}
                  safeguardScanResults={safeguardScanResults}
                  decodedLogs={undefined}
                />{" "}
              </>
            )}
          </>
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

function getSafeguardErrors(
  simulationResults: ScanTransactionsSolana200Response | undefined
): BlowfishSimulationError[] | undefined {
  const lighthouseErrorTxs = simulationResults?.perTransaction.filter((tx) => {
    return (
      tx.error?.kind === "PROGRAM_ERROR" &&
      tx.error.solanaProgramAddress ===
        "L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK"
    );
  });
  if (!lighthouseErrorTxs) {
    return;
  }

  if (lighthouseErrorTxs.length === 0) {
    return;
  }

  const errors = lighthouseErrorTxs
    .map((tx) => {
      if (!tx.raw.logs) {
        return;
      }

      const endLogIdx = tx.raw.logs.findIndex((log) => {
        return log.startsWith(
          "Program L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK failed"
        );
      });

      if (endLogIdx === -1) {
        return;
      }

      const startLogIdx = endLogIdx - 3;

      const instruction = tx.raw.logs[startLogIdx]?.split("Instruction:")?.[1];
      const assertTxt = tx.raw.logs[startLogIdx + 1]?.split("Result:")?.[1];

      return {
        kind: "SIMULATION_FAILED",
        humanReadableError: `${instruction}: ${assertTxt}`,
      } as BlowfishSimulationError;
    })
    .filter(Boolean) as BlowfishSimulationError[];
  return errors;
}

function getSafeguardVerifyError(
  originalTxs: string[],
  safeguardTxs: string[] | undefined
): VERIFY_ERROR | undefined {
  if (!safeguardTxs) {
    return;
  }
  try {
    verifyTransactions(originalTxs, safeguardTxs, {
      // TODO: fetch from API
      solUsdRate: 141.74,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message as VERIFY_ERROR;
    }
  }
}

export default ScanResultsSolana;
