import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { Decimal } from "decimal.js";

import { TextLarge, Text, TextSmall } from "./Typography";
import { PrimaryButton, SecondaryButton, TextButton } from "./Buttons";
import { BaseButton } from "./BaseButton";
import { BlockExplorerLink, LinkWithArrow } from "./Links";
import { shortenHex, isNativeAsset } from "../utils/hex";
import { JsonViewer } from "./JsonViewer";
import { ExpandIcon } from "./icons/ExpandArrow";
import { WarningIcon } from "./icons/WarningIcon";
import { WarningNotice } from "./WarningNotice";
import { logger } from "../utils/logger";

import type {
  EvmTransactionScanResult,
  EvmMessageScanResult,
  ChainFamily,
  ChainNetwork,
  Erc721ApprovalData,
  Erc721TransferData,
  Erc1155TransferData,
} from "../utils/BlowfishApiClient";
import {
  WarningSeverity,
  DappRequest,
  isTransactionRequest,
  isSignTypedDataRequest,
  isSignMessageRequest,
  TransactionPayload,
} from "../types";

type NftStateChangeWithTokenId =
  | Erc721TransferData
  | Erc1155TransferData
  | Erc721ApprovalData;

const Wrapper = styled.div`
  min-height: 625px;
  width: 100%;
  background-color: ${(props) => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  overflow-x: scroll;
`;

const SimulationResults = styled.div`
  padding: 0 25px;
`;

const StyledWarningIcon = styled(WarningIcon)<{
  severity: WarningSeverity;
}>`
  ${({ severity }) =>
    severity === "CRITICAL" &&
    css`
      path {
        fill: ${({ theme }) => theme.palette.red};
      }
    `}
  align-self: flex-start;
  margin-right: 4px;
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
`;

const StateChangeRow = styled(Row)`
  & + & {
    margin-top: 11px;
  }
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonRow = styled.div`
  padding: 25px 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  button {
    width: 160px;
  }
`;

const AdvancedDetailsToggleButton = styled(BaseButton)`
  /* Increase clickable area slightly without messing with alignment */
  padding: 3px;
  margin: -3px;
  cursor: pointer;
  ${TextLarge} {
    margin-right: 5px;
  }
`;

const StateChangeText = styled(Text)<{ isPositiveEffect?: boolean }>`
  color: ${({ isPositiveEffect, theme }) =>
    isPositiveEffect ? theme.palette.green : theme.palette.red};
  line-height: 16px;
`;

const AdvancedDetails: React.FC<{ request: DappRequest }> = ({ request }) => {
  const [showAdvancedDetails, setShowAdvancedDetails] =
    useState<boolean>(false);
  const content = useMemo(() => {
    if (isTransactionRequest(request)) {
      // NOTE: For display purposes we want to show 0 when value is null
      const displayTransaction: TransactionPayload = {
        ...request.payload,
        value: request.payload.value || "0",
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
      style={{ padding: "25px", flex: 1, justifyContent: "unset" }}
    >
      <Row>
        <AdvancedDetailsToggleButton
          onClick={() => setShowAdvancedDetails((prev) => !prev)}
        >
          <TextLarge>Advanced Details</TextLarge>
          <ExpandIcon expanded={showAdvancedDetails} />
        </AdvancedDetailsToggleButton>
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
  onContinue: () => Promise<void>;
  onCancel: () => Promise<void>;
}
export const ScanResults: React.FC<ScanResultsProps> = ({
  request,
  scanResults,
  onContinue,
  onCancel,
  chainNetwork,
  chainFamily,
  ...props
}) => {
  const dappUrl = useMemo(() => new URL(props.dappUrl), [props.dappUrl]);

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

  return (
    <Wrapper>
      <Header borderBottom={scanResults.action === "NONE"}>
        <TextLarge as="h1">{requestTypeStr} Details</TextLarge>
        {scanResults.warnings[0] && (
          <WarningNotice
            severity={scanResults.action === "WARN" ? "WARNING" : "CRITICAL"}
            warning={scanResults.warnings[0]}
          />
        )}
      </Header>
      <SimulationResults>
        <Section borderBottom>
          <TextSmall secondary style={{ marginBottom: "8px" }}>
            To Address
          </TextSmall>
          <Text>
            {toAddress && (
              <BlockExplorerLink
                address={toAddress}
                chainFamily={chainFamily}
                chainNetwork={chainNetwork}
              >
                {shortenHex(toAddress)}
              </BlockExplorerLink>
            )}
          </Text>
        </Section>
        <Section borderBottom>
          <TextSmall secondary style={{ marginBottom: "8px" }}>
            Simulation Results
          </TextSmall>
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
                {scanResults.action !== "NONE" && (
                  <StyledWarningIcon
                    severity={
                      scanResults.action == "WARN" ? "WARNING" : "CRITICAL"
                    }
                  />
                )}
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
        <Section>
          <TextSmall secondary style={{ marginBottom: "8px" }}>
            Request by
          </TextSmall>
          <LinkWithArrow href={dappUrl.origin}>
            <Text>{dappUrl.host}</Text>
          </LinkWithArrow>
        </Section>
      </SimulationResults>
      <AdvancedDetails request={request} />
      <ReportRow>
        <TextButton>
          <TextLarge secondary style={{ fontWeight: 400 }}>
            Report this {requestTypeStr.toLowerCase()}
          </TextLarge>
        </TextButton>
      </ReportRow>
      <ButtonRow>
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      </ButtonRow>
    </Wrapper>
  );
};
