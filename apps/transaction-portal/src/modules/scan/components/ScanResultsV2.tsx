import React, { useCallback, useMemo, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Row, Text } from "@blowfish/ui/core";
import { PreviewTxn } from "~components/cards/PreviewTxn";
import {
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/api-client";
import {
  DappRequest,
  Message,
  Severity,
  actionToSeverity,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import { logger } from "@blowfish/utils/logger";
import { sendAbort, sendResult } from "~utils/messages";
import { containsPunycode, createValidURL } from "~utils/utils";
import { CardContent, Divider } from "~components/cards/common";
import { ArrowDownIcon } from "@blowfish/ui/icons";
import { useReportTransactionUrl } from "~hooks/useReportTransactionUrl";
import RequestJsonViewer from "./RequestJsonViewer";

const ScanResultsWrapper = styled(Row)<{ severity?: Severity }>`
  padding: 16px 32px;
  overflow: hidden;

  background-color: ${({ severity, theme }) =>
    theme.severityColors[severity ?? "INFO"].background};
`;

const ViewDetailsWrapper = styled(Row)`
  cursor: pointer;
  width: 100%;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    max-height: 0;
  }
  100% {
    opacity: 1;
    max-height: 1000px;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    max-height: 1000px;
  }
  100% {
    opacity: 0;
    max-height: 0;
  }
`;

const DynamicJsonViewerWrapper = styled.div<{ $show: boolean }>`
  animation: ${({ $show }) => ($show ? fadeIn : fadeOut)} 1s ease forwards;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  overflow: hidden;
`;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  width: 16px;
  height: 17px;
`;

export type UIWarning = {
  message: string;
  severity: "WARNING" | "CRITICAL" | "INFO";
};

interface ScanResultsV2Props {
  request: DappRequest;
  scanResults: EvmMessageScanResult | EvmTransactionScanResult;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  dappUrl: string;
  message: Message<DappRequest["type"], DappRequest>;
}

const ScanResultsV2: React.FC<ScanResultsV2Props> = ({
  request,
  scanResults,
  message,
  ...props
}) => {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

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

  const simulationFailedMessage = useMemo(() => {
    return (
      scanResults?.simulationResults?.error?.humanReadableError ||
      "Simulation failed"
    );
  }, [scanResults]);

  const closeWindow = useCallback(() => window.close(), []);

  const handleUserAction = useCallback(
    async (shouldProceed: boolean) => {
      if (!message) {
        logger.error("Error: Cannot proceed, no message to respond to ");
        return;
      }
      if (!request) {
        logger.error("Error: Cannot proceed, no request to respond to ");
        return;
      }

      logger.debug(request);

      if (shouldProceed) {
        if (isSignMessageRequest(request)) {
          const { payload } = request;
          if (payload.method === "personal_sign") {
            // NOTE: domain mismatch on SIWE, so we just pass the message back to the dapp
            logger.debug("personal_sign - send message back to dapp");
            await sendResult(message.id, payload.message);
          }
        } else {
          // TODO: This should never happen
          logger.error("Unsupported operation ", request);
          alert("UNSUPPORTED OPERATION");
        }
      } else {
        await sendAbort(message.id);
      }
      closeWindow();
    },
    [message, request, closeWindow]
  );

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
        const { message } = warning;
        return {
          message,
          severity,
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

  const simulationType =
    request.type === "SIGN_MESSAGE" ? "signature" : "transaction";

  const severity = useMemo(() => {
    if (
      request?.payload &&
      "method" in request.payload &&
      request?.payload?.method === "eth_sign"
    ) {
      return actionToSeverity("BLOCK");
    }
    return scanResults?.action
      ? actionToSeverity(scanResults?.action)
      : undefined;
  }, [request?.payload, scanResults?.action]);

  const signatureData = [
    {
      imageUrl: "",
      state: scanResults.simulationResults?.error
        ? simulationFailedMessage
        : "No state changes found. Proceed with caution",
      dappUrl,
      message: parsedMessageContent,
      account: request.userAccount,
    },
  ];

  const displayAdvancedDetails = (
    <>
      <DynamicJsonViewerWrapper $show={showAdvancedDetails}>
        <CardContent>
          {showAdvancedDetails && <RequestJsonViewer request={request} />}
        </CardContent>
      </DynamicJsonViewerWrapper>
      {showAdvancedDetails && <Divider margin="16px 0" />}
      <CardContent>
        <ViewDetailsWrapper
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
          onClick={() => {
            setShowAdvancedDetails((prev) => !prev);
          }}
        >
          <Text design="secondary" size="sm">
            {showAdvancedDetails ? "View less details" : "View more details"}
          </Text>
          <StyledArrowDownIcon expanded={showAdvancedDetails} />
        </ViewDetailsWrapper>
      </CardContent>
    </>
  );

  const txnData = {
    data: scanResults?.simulationResults?.expectedStateChanges,
    dappUrl: dappUrl,
    account: request.userAccount,
  };

  return (
    <ScanResultsWrapper
      justifyContent="center"
      alignItems="center"
      severity={severity}
    >
      <PreviewTxn
        simulationType={simulationType}
        signatureData={signatureData}
        txnSimulationData={txnData}
        warnings={warnings}
        severity={severity}
        chainNetwork={props.chainNetwork}
        chainFamily={props.chainFamily}
        advancedDetails={displayAdvancedDetails}
        onContinue={() => handleUserAction(true)}
        onCancel={() => handleUserAction(false)}
        onReport={onReport}
      />
    </ScanResultsWrapper>
  );
};

export default ScanResultsV2;
