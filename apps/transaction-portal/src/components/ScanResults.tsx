import { BLOWFISH_FEEDBACK_URL } from "~constants";
import dynamic from "next/dynamic";
import {
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/utils/BlowfishApiClient";
import type { NftStateChangeWithTokenId } from "@blowfish/utils/types";
import {
  BlowfishOption,
  BlowfishPausedOptionType,
  DappRequest,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
  SignTypedDataVersion,
  TransactionPayload,
} from "@blowfish/utils/types";

import { transformTypedDataV1FieldsToEIP712 } from "@blowfish/utils/messages";
import { Decimal } from "decimal.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { isNativeAsset, shortenHex } from "@blowfish/utils/hex";
import { logger } from "@blowfish/utils/logger";
import {
  BaseButton,
  BlockExplorerLink,
  LinkWithArrow,
  Text,
  TextSmall,
  Row,
  Column,
} from "@blowfish/ui/core";
import { WarningNotice } from "./WarningNotice";
import { ExpandIcon } from "@blowfish/ui/icons";
import PauseDurationSelector, {
  DurationButton,
  PeriodDurationContainer,
} from "~components/PauseDurationSelector";
import { useInterval, useLocalStorage } from "react-use";
import {
  PAUSE_DURATIONS,
  PauseDuration,
  useTransactionScannerPauseResume,
} from "@blowfish/hooks";
import {
  getPauseResumeSelection,
  sendPauseResumeSelection,
} from "~utils/messages";
import AssetImage from "./AssetImage";
import AssetPrice from "./AssetPrice";
import { containsPunycode, evmStateChangeHasImage } from "~utils/utils";

const DynamicJsonViewer = dynamic(
  () => import("./client/JsonViewer").then((mod) => mod.JsonViewer),
  {
    ssr: false,
    loading: () => <TextSmall>Loading...</TextSmall>,
  }
);

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
`;

const SimulationResults = styled.div`
  padding: 0 25px;
`;

const Section = styled.div<{ borderBottom?: boolean; borderTop?: boolean }>`
  padding: 25px 0 25px 0;
  border-bottom: ${(props) => props.borderBottom && "1px solid #0000001a"};
  border-top: ${(props) => props.borderTop && "1px solid #0000001a"};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled(Section)`
  min-height: 56px;
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

const SimulationResultsHeader = styled(Row)<{
  evmStateChangeWithImage: boolean;
}>`
  margin-bottom: ${({ evmStateChangeWithImage }) =>
    evmStateChangeWithImage ? "16px" : "8px"};
`;

const StateChangeRow = styled(Row)`
  gap: 12px;

  & + & {
    margin-top: 11px;
  }
`;

const StateChangeTextBlock = styled.div`
  display: flex;
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
      borderTop
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
          <Text semiBold>Advanced Details</Text>
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

export interface ScanResultsProps {
  request: DappRequest;
  scanResults: EvmTransactionScanResult | EvmMessageScanResult;
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

  const expectedStateChangesProcessed = useMemo(
    () =>
      scanResults?.simulationResults?.expectedStateChanges.map(
        (expectedStateChange) => {
          const { amount } = expectedStateChange.rawInfo.data;
          let diff;
          if (typeof amount === "object") {
            diff = new Decimal(amount.before).sub(amount.after);
          } else {
            diff = new Decimal(amount);
          }

          return {
            ...expectedStateChange,
            diff,
          };
        }
      ),
    [scanResults?.simulationResults?.expectedStateChanges]
  );

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

  const warning:
    | { message: string; severity: "WARNING" | "CRITICAL" }
    | undefined = useMemo(() => {
    // Take warnings return from API first hand
    const warning = scanResults.warnings[0];
    if (warning) {
      const severity = scanResults.action === "WARN" ? "WARNING" : "CRITICAL";
      const { message } = warning;
      return {
        message,
        severity,
      };
    }

    // TODO(kimpers): Should simulation errors be warnings from the API?
    const simulationResults = scanResults.simulationResults || undefined;
    if (simulationResults?.error) {
      switch (simulationResults.error.kind) {
        case "SIMULATION_FAILED":
          return {
            severity: "CRITICAL",
            message: `This transaction failed during simulation. Proceed with caution`,
          };
        case "INVALID_TRANSACTION":
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
      <Header
        borderBottom={
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
        {warning && (
          <WarningNotice
            severity={warning.severity}
            message={warning.message}
          />
        )}
      </Header>
      <SimulationResults>
        {toAddress && (
          <Section borderBottom>
            <TextSmall secondary style={{ marginBottom: "8px" }}>
              To Address
            </TextSmall>
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
        {expectedStateChangesProcessed &&
        expectedStateChangesProcessed?.length > 0 ? (
          <Section borderBottom>
            <SimulationResultsHeader
              evmStateChangeWithImage={evmStateChangeHasImage(
                expectedStateChangesProcessed[0]?.rawInfo.kind
              )}
            >
              <TextSmall secondary>Simulation Results</TextSmall>
            </SimulationResultsHeader>
            {expectedStateChangesProcessed?.map((stateChange, i) => {
              const address = stateChange.rawInfo.data.contract.address;
              const { kind } = stateChange.rawInfo;
              const isApproval = kind.includes("APPROVAL");
              const isNft = kind.includes("ERC721") || kind.includes("ERC1155");
              let nftTokenId: string | undefined;
              if (isNft) {
                const nftData = stateChange.rawInfo
                  .data as NftStateChangeWithTokenId;
                nftTokenId = nftData.tokenId || undefined;
              }

              // NOTE(kimpers): We define positive as decreased approval or increased balance
              const isPositiveEffect =
                (isApproval && stateChange.diff.gt(0)) ||
                (!isApproval && stateChange.diff.lt(0));
              // TODO(kimpers): What to link to for native assets?
              return (
                <StateChangeRow key={`state-change-${i}`}>
                  <AssetImage
                    stateChange={stateChange.rawInfo}
                    isPositiveEffect={isPositiveEffect}
                  />
                  <StateChangeTextBlock>
                    <Column>
                      <StateChangeText isPositiveEffect={isPositiveEffect}>
                        {stateChange.humanReadableDiff}
                      </StateChangeText>
                      <AssetPrice stateChange={stateChange.rawInfo} />
                    </Column>
                    {!isNativeAsset(address) && (
                      <BlockExplorerLink
                        address={address}
                        chainFamily={chainFamily}
                        chainNetwork={chainNetwork}
                        nftTokenId={nftTokenId}
                      ></BlockExplorerLink>
                    )}
                  </StateChangeTextBlock>
                </StateChangeRow>
              );
            })}
          </Section>
        ) : (
          <Section borderBottom>
            <TextSmall secondary style={{ marginBottom: "8px" }}>
              Simulation Results
            </TextSmall>
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
          <Section borderBottom>
            <TextSmall secondary style={{ marginBottom: "8px" }}>
              Message contents
            </TextSmall>
            <TextSmall
              style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {parsedMessageContent}
            </TextSmall>
          </Section>
        )}
        <Section>
          <TextSmall secondary style={{ marginBottom: "8px" }}>
            Request by
          </TextSmall>
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
    </Wrapper>
  );
};
