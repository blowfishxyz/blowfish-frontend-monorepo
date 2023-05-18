import type {
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/api-client";
import {
  PAUSE_DURATIONS,
  PauseDuration,
  useTransactionScannerPauseResume,
} from "@blowfish/hooks";
import {
  BaseButton,
  BlockExplorerLink,
  Column,
  LinkWithArrow,
  Row,
  Text,
} from "@blowfish/ui/core";
import { ExpandIcon } from "@blowfish/ui/icons";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { shortenHex } from "@blowfish/utils/hex";
import { logger } from "@blowfish/utils/logger";
import { transformTypedDataV1FieldsToEIP712 } from "@blowfish/utils/messages";
import {
  BlowfishOption,
  BlowfishPausedOptionType,
  DappRequest,
  SignTypedDataVersion,
  TransactionPayload,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "@blowfish/utils/types";
import { Decimal } from "decimal.js";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useInterval, useLocalStorage } from "react-use";
import styled from "styled-components";

import PauseDurationSelector, {
  DurationButton,
  PeriodDurationContainer,
} from "~components/PauseDurationSelector";
import { EnrichedSimulationResult } from "~components/simulation-results/EnrichedSimulationResult";
import { BLOWFISH_FEEDBACK_URL } from "~constants";
import {
  getPauseResumeSelection,
  sendPauseResumeSelection,
} from "~utils/messages";
import { containsPunycode, evmStateChangeHasImage } from "~utils/utils";

import { WarningNotice } from "./WarningNotice";

const DynamicJsonViewer = dynamic(
  () => import("./client/JsonViewer").then((mod) => mod.JsonViewer),
  {
    ssr: false,
    loading: () => <Text size="sm">Loading...</Text>,
  }
);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  overflow-y: auto;
  height: 100%;
  flex-direction: column;
  margin-bottom: 160px;
`;

const SimulationResults = styled.div`
  padding: 0 25px;
`;

const Section = styled.div<{
  $borderBottom?: boolean;
  $borderTop?: boolean;
}>`
  padding: 25px 0 25px 0;
  border-bottom: ${(props) => props.$borderBottom && "1px solid #0000001a"};
  border-top: ${(props) => props.$borderTop && "1px solid #0000001a"};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled(Section)`
  /* Overwrite section styles */
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  justify-content: center;

  & > ${Row} {
    padding-left: 13px;
    padding-right: 13px;
    width: 100%;
    align-self: flex-start;
  }
`;

const HeaderRow = styled(Row)`
  justify-content: space-between;
  height: 56px;

  ${PeriodDurationContainer} {
    padding: 0 20px 0 0;
  }

  ${DurationButton} {
    padding: 4px 8px;
    font-size: 12px;
    line-height: 12px;
    height: 24px;
  }
`;

const PauseScanningButton = styled(BaseButton)`
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

type SimulationResultsHeaderProps = {
  evmStateChangeWithImage: boolean;
};

const SimulationResultsHeader = styled(Row)<SimulationResultsHeaderProps>`
  margin-bottom: ${({ evmStateChangeWithImage }) =>
    evmStateChangeWithImage ? "16px" : "8px"};
`;

const AdvancedDetailsToggleButton = styled(BaseButton)`
  /* Increase clickable area slightly without messing with alignment */
  padding: 3px;
  margin: -3px;
  cursor: pointer;
  font-weight: 500;
`;

const StyledExpandIcon = styled(ExpandIcon)`
  margin-left: 5px;
`;

const TitleText = styled(Text)`
  font-weight: 500;
  text-transform: capitalize;
  font-size: 16px;
`;

const StateChangeText = styled(Text)<{ isPositiveEffect?: boolean }>`
  color: ${({ isPositiveEffect, theme }) =>
    isPositiveEffect ? theme.palette.green : theme.palette.red};
  line-height: 16px;
`;

interface AdvancedDetailsProps {
  request: DappRequest;
  showAdvancedDetails: boolean;
  setShowAdvancedDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdvancedDetails: React.FC<AdvancedDetailsProps> = ({
  request,
  showAdvancedDetails,
  setShowAdvancedDetails,
}) => {
  const content = useMemo(() => {
    if (isTransactionRequest(request)) {
      // NOTE: For display purposes we want to show 0 when value is null
      const { to, from, value, data } = request.payload;
      const displayTransaction: TransactionPayload = {
        to,
        from,
        value: new Decimal(value || 0).toString(),
        data,
      };
      return displayTransaction;
    } else if (isSignTypedDataRequest(request)) {
      const { domain, message } =
        request.signTypedDataVersion === SignTypedDataVersion.V1
          ? transformTypedDataV1FieldsToEIP712(request.payload, request.chainId)
          : request.payload;
      return { domain, message };
    } else if (isSignMessageRequest(request)) {
      const { message } = request.payload;
      return {
        message,
      };
    } else {
      logger.error("AdvancedDetails: Unhandled request type", request);
    }
  }, [request]);

  return (
    <Section
      $borderTop
      style={{
        padding: "25px",
        flex: 1,
        justifyContent: "unset",
      }}
    >
      <Row justify="space-between">
        <AdvancedDetailsToggleButton
          onClick={() => setShowAdvancedDetails((prev) => !prev)}
        >
          <Text weight="semi-bold">Advanced Details</Text>
          <StyledExpandIcon expanded={showAdvancedDetails} />
        </AdvancedDetailsToggleButton>
        <LinkWithArrow href={BLOWFISH_FEEDBACK_URL}>
          <Text>Feedback</Text>
        </LinkWithArrow>
      </Row>
      {showAdvancedDetails && content && <DynamicJsonViewer data={content} />}
    </Section>
  );
};

type UIWarning = { message: string; severity: "WARNING" | "CRITICAL" };

export interface ScanResultsProps {
  request: DappRequest;
  scanResults: EvmMessageScanResult | EvmTransactionScanResult;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  dappUrl: string;
}

export const ScanResults: React.FC<ScanResultsProps> = ({
  request,
  scanResults,
  chainNetwork,
  chainFamily,
  ...props
}) => {
  const dappUrl = useMemo(() => new URL(props.dappUrl), [props.dappUrl]);

  const hasPunycode = containsPunycode(dappUrl.hostname);

  const [showAdvancedDetails, setShowAdvancedDetails] =
    useState<boolean>(false);
  const [scanPaused, setScanPaused] = useLocalStorage<BlowfishPausedOptionType>(
    BlowfishOption.PREFERENCES_BLOWFISH_PAUSED
  );
  const { pauseScan, resumeScan, isScanPaused } =
    useTransactionScannerPauseResume(scanPaused, setScanPaused);
  const [showDurationSelector, setShowDurationSelector] = useState(false);

  const getPauseResumeSelectionStatus = useCallback(async () => {
    const data =
      (await getPauseResumeSelection()) as unknown as BlowfishPausedOptionType;
    setScanPaused(data);
  }, [setScanPaused]);

  useEffect(() => {
    getPauseResumeSelectionStatus();
  }, [getPauseResumeSelectionStatus]);

  useInterval(async () => {
    getPauseResumeSelectionStatus();
  }, 3000);

  const expectedStateChanges =
    scanResults?.simulationResults?.expectedStateChanges;

  useEffect(() => {
    if (scanResults.simulationResults == null) {
      logger.debug("Received no simulationResults");
      setShowAdvancedDetails(true);
    }
  }, [scanResults?.simulationResults]);

  const toAddress = useMemo(() => {
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

  const requestTypeStr = useMemo(() => {
    if (isTransactionRequest(request)) {
      return "Transaction";
    }

    return "Message";
  }, [request]);

  const parsedMessageContent = useMemo(() => {
    if (
      isSignMessageRequest(request) &&
      request.payload.method == "personal_sign"
    ) {
      const messageWithoutPrefix = request.payload.message.slice(2);
      const decodedMessage = Buffer.from(messageWithoutPrefix, "hex").toString(
        "utf8"
      );

      return decodedMessage;
    }

    return undefined;
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
              message: `This transaction seems does not seem valid. Proceed with caution`,
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

  const simulationFailedMessage = useMemo(() => {
    return (
      scanResults?.simulationResults?.error?.humanReadableError ||
      "Simulation failed"
    );
  }, [scanResults]);

  const onActionClick = () => {
    if (showDurationSelector) {
      setShowDurationSelector(false);
      return;
    }

    if (isScanPaused) {
      resumeScan();
      sendPauseResumeSelection({ isPaused: false, until: null });
      return;
    }

    setShowDurationSelector(true);
  };
  const onDurationSelect = (duration: PauseDuration) => {
    pauseScan(duration);
    sendPauseResumeSelection({
      isPaused: true,
      until: Date.now() + PAUSE_DURATIONS[duration],
    });
    setShowDurationSelector(false);
  };

  return (
    <Wrapper>
      <Content>
        <Header
          $borderBottom={
            scanResults.action === "NONE" && !!scanResults.simulationResults
          }
        >
          <HeaderRow>
            {showDurationSelector ? (
              <PauseDurationSelector
                onClick={(period) => onDurationSelect(period)}
              />
            ) : (
              <TitleText as="h1">{requestTypeStr} Details</TitleText>
            )}
            <PauseScanningButton onClick={onActionClick}>
              {isScanPaused ? (
                <>Resume</>
              ) : (
                <>{showDurationSelector ? <>Cancel</> : <>Pause Scanning</>}</>
              )}
            </PauseScanningButton>
          </HeaderRow>
          {warnings.map((warning) => (
            <WarningNotice
              key={warning.message}
              severity={warning.severity}
              message={warning.message}
            />
          ))}
        </Header>
        <SimulationResults>
          {toAddress && (
            <Section $borderBottom>
              <Text
                size="sm"
                design="secondary"
                style={{ marginBottom: "8px" }}
              >
                To Address
              </Text>
              <Text>
                <BlockExplorerLink
                  address={toAddress}
                  chainFamily={chainFamily}
                  chainNetwork={chainNetwork}
                >
                  {shortenHex(toAddress)}
                </BlockExplorerLink>
              </Text>
            </Section>
          )}
          {expectedStateChanges && expectedStateChanges.length > 0 ? (
            <Section $borderBottom>
              <SimulationResultsHeader
                evmStateChangeWithImage={evmStateChangeHasImage(
                  expectedStateChanges[0]?.rawInfo.kind
                )}
              >
                <Text size="sm" design="secondary">
                  Simulation Results
                </Text>
              </SimulationResultsHeader>
              <Column gap="md">
                {expectedStateChanges.map((stateChange, i) => (
                  <EnrichedSimulationResult
                    stateChange={stateChange}
                    key={`state-change-${i}`}
                    chainFamily={chainFamily}
                    chainNetwork={chainNetwork}
                  />
                ))}
              </Column>
            </Section>
          ) : (
            <Section $borderBottom>
              <Text
                size="sm"
                design="secondary"
                style={{ marginBottom: "8px" }}
              >
                Simulation Results
              </Text>
              {scanResults?.simulationResults?.error ? (
                <StateChangeText isPositiveEffect={false}>
                  {simulationFailedMessage}
                </StateChangeText>
              ) : (
                <StateChangeText isPositiveEffect={false}>
                  No state changes found. Proceed with caution
                </StateChangeText>
              )}
            </Section>
          )}

          {parsedMessageContent && (
            <Section $borderBottom>
              <Text
                size="sm"
                design="secondary"
                style={{ marginBottom: "8px" }}
              >
                Message contents
              </Text>
              <Text
                size="sm"
                design="secondary"
                style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
              >
                {parsedMessageContent}
              </Text>
            </Section>
          )}
          <Section>
            <Text size="sm" design="secondary" style={{ marginBottom: "8px" }}>
              Request by
            </Text>
            <LinkWithArrow href={dappUrl.origin}>
              <Text>{dappUrl.host}</Text>
            </LinkWithArrow>
          </Section>
        </SimulationResults>
        <AdvancedDetails
          request={request}
          showAdvancedDetails={showAdvancedDetails}
          setShowAdvancedDetails={setShowAdvancedDetails}
        />
      </Content>
    </Wrapper>
  );
};
