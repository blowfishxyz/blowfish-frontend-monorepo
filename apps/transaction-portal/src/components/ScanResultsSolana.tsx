import React, { useMemo, useEffect } from "react";
import {
  Row,
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
import { PreviewTxnSolana } from "./cards/PreviewTxnSolana";
import { AdvancedDetails } from "./AdvancedDetails";

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
}

const ScanResultsSolana: React.FC<ScanResultsSolanaProps> = ({
  request,
  scanResults,
  impersonatingAddress,
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
    const apiWarnings = scanResults.aggregated.warnings || [];

    const warnings: UIWarning[] = apiWarnings.map((warning) => {
      const severity =
        scanResults.aggregated.action === "WARN" ? "WARNING" : "CRITICAL";
      const { message, kind } = warning;
      return {
        message,
        severity,
        kind,
      };
    });

    function getInferedWarning(): UIWarning | undefined {
      // TODO(kimpers): Should simulation errors be warnings from the API?
      const simulationResults = scanResults || undefined;
      if (error) {
        switch (error.kind) {
          case "SIMULATION_FAILED":
            return {
              severity: "WARNING",
              message: `This transaction failed during simulation. Proceed with caution`,
            };
          // TODO: Add more specific messages for these errors
          default:
            return {
              severity: "WARNING",
              message: `Something went wrong while simulating this transaction. Proceed with caution`,
            };
        }
      } else if (!simulationResults) {
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

  const txnData = {
    scanResult: scanResults,
    account: request.userAccount,
    dappUrl: request.metadata.origin,
  };

  return (
    <Row justifyContent="center">
      <PreviewTxnSolana
        txnData={txnData}
        simulationError={error?.humanReadableError}
        warnings={warnings}
        severity={severity}
        advancedDetails={
          <AdvancedDetails
            request={request}
            scanResults={
              layoutConfig.hasRequestParams ? scanResults : undefined
            }
            decodedLogs={undefined}
          />
        }
        onReport={() =>
          reportTransaction(txnData.scanResult.aggregated.requestId)
        }
      />
    </Row>
  );
};

export default ScanResultsSolana;
