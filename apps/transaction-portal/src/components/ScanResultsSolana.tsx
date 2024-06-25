import React, { useMemo, useEffect } from "react";
import {
  Row,
  StateChangePreviewSolana,
  getErrorFromSolanaScanResponse,
  getResultsFromSolanaScanResponse,
} from "@blowfishxyz/ui";
import {
  ScanTransactionsSolana200Response,
  ScanTransactionsSolanaRequest,
  WarningInnerKindEnum,
} from "@blowfishxyz/api-client";
import { ChainNetwork } from "@blowfish/utils/chains";
import { actionToSeverity } from "@blowfish/utils/types";
import { useLayoutConfig } from "~components/layout/Layout";
import { useReportTransaction } from "~hooks/useReportTransaction";
import { AdvancedDetails } from "./AdvancedDetails";
import { createValidURL } from "~utils/utils";
import { PreviewTxn } from "./cards/PreviewTxn";
import { sendResult, sendSafeguardResult } from "~utils/messages";

export type UIWarning = {
  message: string;
  kind?: WarningInnerKindEnum;
  severity: "WARNING" | "CRITICAL" | "INFO";
};

interface ScanResultsSolanaProps {
  request: ScanTransactionsSolanaRequest;
  scanResults: ScanTransactionsSolana200Response;
  chainNetwork: ChainNetwork;
  impersonatingAddress: string | undefined;
  messageId?: string;
}

const ScanResultsSolana: React.FC<ScanResultsSolanaProps> = ({
  request,
  scanResults,
  impersonatingAddress,
  messageId,
}) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();
  const error = getErrorFromSolanaScanResponse(scanResults);
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

    return scanResults?.aggregated.action
      ? actionToSeverity(scanResults?.aggregated.action)
      : "INFO";
  }, [scanResults?.aggregated.action, error, result?.expectedStateChanges]);

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
          return Promise.resolve();
        }}
        onCancel={() => window.close()}
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

export default ScanResultsSolana;
