import React, { useCallback, useMemo, useEffect, useState } from "react";
import { Row } from "@blowfish/ui/core";
import { PreviewTxn } from "~components/cards/PreviewTxn";
import {
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
  WarningInnerKindEnum,
} from "@blowfish/api-client";
import {
  DappRequest,
  Message,
  SignTypedDataVersion,
  actionToSeverity,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import { containsPunycode, createValidURL } from "~utils/utils";
import { useLayoutConfig } from "~components/layout/Layout";
import { useUserDecision } from "../hooks/useUserDecision";
import { useChainMetadata } from "~modules/common/hooks/useChainMetadata";
import { useReportTransactionUrl } from "~hooks/useReportTransactionUrl";
import { AdvancedDetails } from "./AdvancedDetails";
import ShareToTwitterModal from "./ShareToTwitterModal";
import { useLocalStorage } from "react-use";

export type UIWarning = {
  message: string;
  kind?: WarningInnerKindEnum;
  severity: "WARNING" | "CRITICAL" | "INFO";
};

interface ScanResultsV2Props {
  request: DappRequest;
  scanResults: EvmMessageScanResult | EvmTransactionScanResult;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  dappUrl: string;
  message: Message<DappRequest["type"], DappRequest>;
  impersonatingAddress: string | undefined;
}

const ScanResultsV2: React.FC<ScanResultsV2Props> = ({
  request,
  scanResults,
  message,
  impersonatingAddress,
  ...props
}) => {
  const [shouldNotShowModal] = useLocalStorage("shouldNotShowModal");
  const [canceledTxn, setCancelledTxn] = useState(false);
  const [, setLayoutConfig] = useLayoutConfig();
  const chain = useChainMetadata();
  const dappUrl = useMemo(() => createValidURL(props.dappUrl), [props.dappUrl]);

  const hasPunycode = containsPunycode(dappUrl?.hostname);

  const parsedMessageContent = useMemo(() => {
    if (
      isSignMessageRequest(request) &&
      request.payload.method === "personal_sign"
    ) {
      const messageWithoutPrefix = request.payload.message.slice(2);
      return Buffer.from(messageWithoutPrefix, "hex").toString("utf8");
    }
    return undefined;
  }, [request]);

  const { reject, confirm } = useUserDecision({
    chainId: chain?.chainId,
    message,
    request,
  });

  const reportUrl = useReportTransactionUrl(request);

  const onReport = useCallback(() => {
    window.open(reportUrl, "_blank", "noopener,noreferrer");
  }, [reportUrl]);

  const requestTypeStr = useMemo(() => {
    if (isTransactionRequest(request)) {
      return "Transaction";
    }

    return "Message";
  }, [request]);

  const warnings: UIWarning[] = useMemo(() => {
    // Take warnings return from API first hand
    if (scanResults.warnings && scanResults.warnings.length > 0) {
      return scanResults.warnings.map((warning) => {
        const severity = scanResults.action === "WARN" ? "WARNING" : "CRITICAL";
        const { message, kind } = warning;
        return {
          message,
          severity,
          kind,
        };
      });
    }

    function getInferedWarning(): UIWarning | undefined {
      // TODO(kimpers): Should simulation errors be warnings from the API?
      const simulationResults = scanResults.simulationResults || undefined;
      if (simulationResults?.error) {
        switch (simulationResults.error.kind) {
          case "SIMULATION_FAILED":
            return {
              severity: "CRITICAL",
              message: `This transaction failed during simulation. Proceed with caution`,
            };
          case "TRANSACTION_ERROR":
            return {
              severity: "CRITICAL",
              message: `This transaction does not seem valid. Proceed with caution`,
            };
          case "UNSUPPORTED_ORDER_TYPE":
            return {
              severity: "WARNING",
              message:
                "This Seaport order type is not supported and cannot be simulated. Proceed with caution",
            };
          // TODO: Add more specific messages for these errors
          case "UNSUPPORTED_MESSAGE":
          case "TRANSACTION_REVERTED":
          case "UNKNOWN_ERROR":
          default:
            return {
              severity: "CRITICAL",
              message: `Something went wrong while simulating this ${requestTypeStr.toLowerCase()}. Proceed with caution`,
            };
        }
      } else if (hasPunycode) {
        return {
          severity: "WARNING",
          message:
            "The dApp uses non-ascii characters in the URL. This can be used to impersonate other dApps, proceed with caution.",
        };
      } else if (
        (isSignTypedDataRequest(request) || isSignMessageRequest(request)) &&
        !simulationResults
      ) {
        return {
          severity: "WARNING",
          message: `We are unable to simulate this message. Proceed with caution`,
        };
      }
    }
    const warning = getInferedWarning();
    return warning ? [warning] : [];
  }, [scanResults, requestTypeStr, request, hasPunycode]);

  const severity = useMemo(() => {
    if (
      request?.payload &&
      "method" in request.payload &&
      request?.payload?.method === "eth_sign"
    ) {
      return actionToSeverity("BLOCK");
    }
    return scanResults?.action ? actionToSeverity(scanResults?.action) : "INFO";
  }, [request?.payload, scanResults?.action]);

  const scammerAddress = useMemo(() => {
    if (isTransactionRequest(request)) {
      return request.payload?.to;
    }
    if (
      isSignTypedDataRequest(request) &&
      request.signTypedDataVersion !== SignTypedDataVersion.V1
    ) {
      return request.payload.domain.verifyingContract;
    }

    return undefined;
  }, [request]);

  useEffect(() => {
    setLayoutConfig((prev) => ({ ...prev, severity, impersonatingAddress }));
    return () => {
      setLayoutConfig({ severity: "INFO", impersonatingAddress });
    };
  }, [severity, impersonatingAddress, setLayoutConfig]);

  const txnData = {
    message: parsedMessageContent,
    data: scanResults?.simulationResults?.expectedStateChanges,
    dappUrl,
    account: request.userAccount,
  };

  return (
    <Row justifyContent="center">
      {canceledTxn && !isSignMessageRequest(request) && !shouldNotShowModal && (
        <ShareToTwitterModal
          scammerAddress={scammerAddress}
          rejectTxn={() => reject()}
        />
      )}
      <PreviewTxn
        txnData={txnData}
        simulationError={
          scanResults?.simulationResults?.error?.humanReadableError
        }
        warnings={warnings}
        severity={severity}
        chainNetwork={props.chainNetwork}
        chainFamily={props.chainFamily}
        advancedDetails={<AdvancedDetails request={request} />}
        onContinue={confirm}
        onCancel={() => {
          setCancelledTxn(true);
          if (isSignMessageRequest(request) || shouldNotShowModal) {
            reject();
          }
        }}
        onReport={onReport}
      />
    </Row>
  );
};

export default ScanResultsV2;
