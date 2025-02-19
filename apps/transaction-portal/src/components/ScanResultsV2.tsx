import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import {
  Button,
  Column,
  Row,
  StateChangePreviewEvm,
  Text,
  getErrorFromScanResponse,
  getResultsFromScanResponse,
} from "@blowfishxyz/ui";
import { PreviewTxn, SectionHeading } from "~components/cards/PreviewTxn";
import {
  EvmMessageScanResult,
  EvmTransactionsScanResult,
  WarningInnerKindEnum,
} from "@blowfishxyz/api-client";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import {
  DappRequest,
  Message,
  SignTypedDataVersion,
  actionToSeverity,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import styled from "styled-components";
import { containsPunycode, createValidURL, getProtocol } from "~utils/utils";
import { useLayoutConfig } from "~components/layout/Layout";
import { useUserDecision } from "../hooks/useUserDecision";
import { useChainMetadata } from "~hooks/useChainMetadata";
import { useReportTransaction } from "~hooks/useReportTransaction";
import { AdvancedDetails } from "./AdvancedDetails";
import ShareToTwitterModal from "./ShareToTwitterModal";
import { useLocalStorage } from "react-use";
import { useAccount } from "wagmi";
import { ImpersonationErrorModal } from "./modals";
import { useRouter } from "next/router";

export type UIWarning = {
  message: string;
  kind?: WarningInnerKindEnum;
  severity: "WARNING" | "CRITICAL" | "INFO";
};

export interface ScanResultsV2Props {
  request: DappRequest;
  scanResults: EvmMessageScanResult | EvmTransactionsScanResult;
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
  const router = useRouter();
  const [shouldNotShowModal] = useLocalStorage("shouldNotShowModal");
  const [canceledTxn, setCancelledTxn] = useState(false);
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();
  const chain = useChainMetadata();
  const dappUrl = useMemo(() => createValidURL(props.dappUrl), [props.dappUrl]);
  const error = getErrorFromScanResponse(scanResults.simulationResults);
  const result = getResultsFromScanResponse(scanResults.simulationResults);

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

  const reportTransaction = useReportTransaction();

  const { address } = useAccount();

  const requestTypeStr = useMemo(() => {
    if (isTransactionRequest(request)) {
      return "Transaction";
    }

    return "Message";
  }, [request]);

  const warnings: UIWarning[] = useMemo(() => {
    // Take warnings return from API first hand
    const apiWarnings = scanResults.warnings || [];

    const warnings: UIWarning[] = apiWarnings.map((warning) => {
      const severity = scanResults.action === "WARN" ? "WARNING" : "CRITICAL";
      const { message, kind } = warning;
      return {
        message,
        severity,
        kind,
      };
    });

    function getInferedWarning(): UIWarning | undefined {
      // TODO(kimpers): Should simulation errors be warnings from the API?
      const simulationResults = scanResults.simulationResults || undefined;
      if (error) {
        switch (error.kind) {
          case "SIMULATION_FAILED":
            return {
              severity: "WARNING",
              message: `This transaction failed during simulation. Proceed with caution`,
            };
          case "UNSUPPORTED_ORDER_TYPE":
            return {
              severity: "WARNING",
              message:
                "This Seaport order type is not supported and cannot be simulated. Proceed with caution",
            };
          // TODO: Add more specific messages for these errors
          case "UNSUPPORTED_MESSAGE":
          default:
            return {
              severity: "WARNING",
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
    const inferredWarning = getInferedWarning();
    if (inferredWarning) {
      return [...warnings, inferredWarning];
    }

    return warnings;
  }, [scanResults, requestTypeStr, request, hasPunycode, error]);

  const severity = useMemo(() => {
    if (
      request?.payload &&
      "method" in request.payload &&
      request?.payload?.method === "eth_sign"
    ) {
      return actionToSeverity("BLOCK");
    }

    if (
      scanResults?.action === "NONE" &&
      !result?.expectedStateChanges &&
      error
    ) {
      return "WARNING";
    }

    return scanResults?.action ? actionToSeverity(scanResults?.action) : "INFO";
  }, [
    request?.payload,
    scanResults?.action,
    error,
    result?.expectedStateChanges,
  ]);

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
    message: parsedMessageContent,
    scanResult: scanResults,
    dappUrl,
    account: request.userAccount,
    protocol: getProtocol(scanResults?.simulationResults),
    decodedCalldata: result?.decodedCalldata,
  };

  return (
    <Row justifyContent="center">
      {canceledTxn && !isSignMessageRequest(request) && !shouldNotShowModal && (
        <ShareToTwitterModal
          scammerAddress={scammerAddress}
          rejectTxn={() => reject()}
        />
      )}
      {impersonatingAddress === address && !layoutConfig.hasRequestParams && (
        <ImpersonationErrorModal closeWindow={reject} />
      )}
      <PreviewTxn
        simulationError={error?.humanReadableError}
        warnings={warnings}
        severity={severity}
        dappUrl={dappUrl}
        protocol={txnData.protocol}
        safeguard={false}
        advancedDetails={
          <AdvancedDetails
            request={request}
            scanResults={
              layoutConfig.hasRequestParams ? scanResults : undefined
            }
            safeguardScanResults={undefined}
            decodedLogs={result?.decodedLogs}
          />
        }
        onContinue={confirm}
        onCancel={() => {
          if (layoutConfig.hasRequestParams) {
            router.replace("/simulate");
            return;
          }
          if (severity === "INFO") {
            reject();
            return;
          }
          setCancelledTxn(true);
          if (isSignMessageRequest(request) || shouldNotShowModal) {
            reject();
          }
        }}
        onReport={() => reportTransaction(txnData.scanResult.requestId)}
      >
        {parsedMessageContent && (
          <SignaturePreview message={parsedMessageContent} />
        )}
        <StateChangePreviewEvm
          scanResult={txnData.scanResult}
          chainFamily={chain?.chainInfo?.chainFamily || "ethereum"}
          chainNetwork={chain?.chainInfo?.chainNetwork || "mainnet"}
        />
      </PreviewTxn>
    </Row>
  );
};

const ShowMoreButton = styled(Button).attrs({
  design: "tertiary",
  size: "sm",
})`
  height: 15px;
  padding: 0;
  justify-content: flex-start;
`;

type MsgTextProps = { $expanded?: boolean };

const SignatureSimulatioMsgText = styled(Text).attrs({
  size: "sm",
  design: "primary",
})<MsgTextProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? "none" : "5")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: max-height 0.3s ease;
`;

const ShowMoreButtonWrapper = styled.div`
  width: 50px;
`;

const SignaturePreview: React.FC<{ message: string }> = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsTextOverflowing(isOverflowing);
      setExpanded(!isOverflowing);
    }
  }, []);

  const handleShowMore = () => {
    setExpanded(!expanded);
  };

  return (
    <Column gap="sm" marginBottom={18}>
      <Row justifyContent="space-between">
        <SectionHeading>Message</SectionHeading>
      </Row>
      <SignatureSimulatioMsgText ref={textRef} $expanded={expanded}>
        {message}
      </SignatureSimulatioMsgText>

      <ShowMoreButtonWrapper>
        <ShowMoreButton stretch design="tertiary" onClick={handleShowMore}>
          <Text size="xs" design="secondary">
            {isTextOverflowing ? (expanded ? "Show less" : "Show more") : ""}
          </Text>
        </ShowMoreButton>
      </ShowMoreButtonWrapper>
    </Column>
  );
};

export default ScanResultsV2;
