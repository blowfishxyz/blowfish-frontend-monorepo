import type {
  ChainFamily,
  ChainNetwork,
  Erc721ApprovalData,
  Erc721TransferData,
  Erc1155TransferData,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfish/utils/BlowfishApiClient";
import { Decimal } from "decimal.js";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { BLOWFISH_FEEDBACK_URL } from "../constants";
import {
  DappRequest,
  TransactionPayload,
  isSignMessageRequest,
  isSignTypedDataRequest,
  isTransactionRequest,
} from "../types";
import { isNativeAsset, shortenHex } from "../utils/hex";
import { logger } from "../utils/logger";
import { BaseButton } from "./BaseButton";
import { REGULAR_BOTTOM_MENU_HEIGHT } from "./BottomMenus";
import { JsonViewer } from "./JsonViewer";
import { BlockExplorerLink, LinkWithArrow } from "./Links";
import { Text, TextSmall } from "./Typography";
import { WarningNotice } from "./WarningNotice";
import { ExpandIcon } from "./icons/ExpandArrow";

type NftStateChangeWithTokenId =
  | Erc721TransferData
  | Erc1155TransferData
  | Erc721ApprovalData;

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
  justify-content: unset;
  flex-direction: column;
  align-items: center;
  justify-content: unset;

  padding: 0 12px;
  & > h1 {
    padding-left: 13px;
    margin-top: 19px;
    align-self: flex-start;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StateChangeRow = styled(Row)`
  & + & {
    margin-top: 11px;
  }
`;

const AdvancedDetailsToggleButton = styled(BaseButton)`
  /* Increase clickable area slightly without messing with alignment */
  padding: 3px;
  margin: -3px;
  cursor: pointer;
  ${Text} {
    font-weight: 500;
    margin-right: 5px;
  }
`;

const TitleText = styled(Text)`
  font-weight: 500;
  text-transform: titlecase;
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
      const { domain, message } = request.payload;
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
        paddingBottom: showAdvancedDetails
          ? `${REGULAR_BOTTOM_MENU_HEIGHT}px`
          : "25px",
        flex: 1,
        justifyContent: "unset",
      }}
    >
      <Row>
        <AdvancedDetailsToggleButton
          onClick={() => setShowAdvancedDetails((prev) => !prev)}
        >
          <Text semiBold>Advanced Details</Text>
          <ExpandIcon expanded={showAdvancedDetails} />
        </AdvancedDetailsToggleButton>
        <LinkWithArrow href={BLOWFISH_FEEDBACK_URL}>
          <Text>Feedback</Text>
        </LinkWithArrow>
      </Row>
      {showAdvancedDetails && content && <JsonViewer data={content} />}
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
  const [showAdvancedDetails, setShowAdvancedDetails] =
    useState<boolean>(false);

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
    } else if (isSignTypedDataRequest(request)) {
      return request.payload?.domain?.verifyingContract;
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
    } else if (
      (isSignTypedDataRequest(request) || isSignMessageRequest(request)) &&
      !simulationResults
    ) {
      return {
        severity: "WARNING",
        message: `We are unable to simulate this message. Proceed with caution`,
      };
    }
  }, [scanResults, requestTypeStr, request]);

  return (
    <Wrapper>
      <Header borderBottom={scanResults.action === "NONE"}>
        <TitleText as="h1">{requestTypeStr} Details</TitleText>
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
          expectedStateChangesProcessed?.length > 0 && (
            <Section borderBottom>
              <TextSmall secondary style={{ marginBottom: "8px" }}>
                Simulation Results
              </TextSmall>
              {expectedStateChangesProcessed?.map((stateChange, i) => {
                const address = stateChange.rawInfo.data.contract.address;
                const { kind } = stateChange.rawInfo;
                const isApproval = kind.includes("APPROVAL");
                const isNft =
                  kind.includes("ERC721") || kind.includes("ERC1155");
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
                    {isNativeAsset(address) ? (
                      <StateChangeText isPositiveEffect={isPositiveEffect}>
                        {stateChange.humanReadableDiff}
                      </StateChangeText>
                    ) : (
                      <BlockExplorerLink
                        address={address}
                        chainFamily={chainFamily}
                        chainNetwork={chainNetwork}
                        nftTokenId={nftTokenId}
                      >
                        <StateChangeText isPositiveEffect={isPositiveEffect}>
                          {stateChange.humanReadableDiff}
                        </StateChangeText>
                      </BlockExplorerLink>
                    )}
                  </StateChangeRow>
                );
              })}
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
