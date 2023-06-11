import React, { FC, ReactElement, ReactNode } from "react";
import { Column, LinkWithArrow, Row, Text, device } from "@blowfish/ui/core";
import styled from "styled-components";
import { Chip } from "../chips/Chip";
import { CardWrapper, CardContent, Divider, CardText } from "./common";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import {
  ChainFamily,
  ChainNetwork,
  EvmExpectedStateChangesInner,
  EvmMessageExpectedStateChange,
} from "@blowfish/api-client";
import { ConfirmTxn } from "./ConfirmTxn";
import { TxnSimulation } from "~components/simulation-results/TxnSimulation";
import { SendTransactionResult } from "@wagmi/core";

export type TxnSimulationDataType = {
  dappUrl: URL | undefined;
  account: string;
  message: string | undefined;
  data:
    | EvmMessageExpectedStateChange[]
    | EvmExpectedStateChangesInner[]
    | undefined;
};

const SectionHeading = styled(Text).attrs({ size: "xs", color: "base40" })``;

const StyledCardContent = styled(Row).attrs({
  alignItems: "center",
  paddingInline: 16,
})`
  @media (${device.lg}) {
    padding: 0 32px;
  }
`;

const StyledColumn = styled(Column).attrs({
  paddingBlock: 18,
})``;

const TxnDataWrapper = styled.div`
  padding: 5px 0 0;
  height: 100%;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: 4px;
  }

  scrollbar-color: ${({ theme }) =>
    `${theme.colors.backgroundPrimary} ${theme.colors.backgroundSecondary}`};

  & {
    scrollbar-width: thin;
  }

  & {
    scrollbar-color: ${({ theme }) =>
      `${theme.colors.backgroundPrimary} ${theme.colors.backgroundSecondary}`};
    scrollbar-width: thin;
  }
`;

interface PreviewCardProps {
  title: string;
  origin?: string;
  website?: string;
  warnings: UIWarning[];
  severity: Severity | undefined;
  children: ReactNode;
  onContinue: () => Promise<SendTransactionResult | void>;
  onReport: () => void;
  onCancel: () => void;
  advancedDetails: ReactElement;
}

const PreviewCard: FC<PreviewCardProps> = ({
  title,
  warnings,
  severity,
  children,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
  website,
}) => (
  <Row gap="md" alignItems="flex-start">
    <CardWrapper>
      <CardContent>
        <Row justifyContent="space-between" alignItems="center">
          <Text size="lg">{title}</Text>
          <Chip severity={severity} />
        </Row>
      </CardContent>
      <Divider margin="16px 0" />
      <CardContent>{children}</CardContent>
      <Divider margin="24px 0 0" />
      <StyledCardContent>
        <StyledColumn gap="sm">
          <SectionHeading>Website</SectionHeading>
          <Row gap="xs" alignItems="center">
            <CardText>
              <LinkWithArrow href={origin || ""}>{website}</LinkWithArrow>
            </CardText>
          </Row>
        </StyledColumn>
        {/* <Divider orientation="vertical" margin="0 36px" />
      <StyledColumn gap="sm">
        <SectionHeading>Contract</SectionHeading>
        <CardText>
          <BlockExplorerLink
            chainFamily={chainFamily}
            chainNetwork={chainNetwork}
            address={contract}
          >
            {shortenHex(contract)}
          </BlockExplorerLink>
        </CardText>
      </StyledColumn> */}
      </StyledCardContent>
      <Divider margin="0 0 16px" />
      {advancedDetails}
    </CardWrapper>
    <ConfirmTxn
      onContinue={onContinue}
      onReport={onReport}
      onCancel={onCancel}
      warnings={warnings}
      severity={severity}
    />
  </Row>
);

export interface PreviewTxnProps {
  txnData: TxnSimulationDataType;
  warnings: UIWarning[];
  severity: Severity | undefined;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  advancedDetails: ReactElement;
  onContinue: () => Promise<SendTransactionResult | void>;
  onCancel: () => void;
  onReport: () => void;
}

export const PreviewTxn: FC<PreviewTxnProps> = ({
  txnData,
  warnings,
  severity,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
}) => {
  const { dappUrl, data, message } = txnData;
  const { origin, host } = dappUrl || {};

  return (
    <PreviewCard
      title="Preview changes"
      origin={origin}
      website={host}
      warnings={warnings}
      severity={severity}
      onContinue={onContinue}
      onReport={onReport}
      onCancel={onCancel}
      advancedDetails={advancedDetails}
    >
      {message ? <SignaturePreview message={message} /> : null}
      {<StateChangePreview data={data} />}
    </PreviewCard>
  );
};

const SignaturePreview: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Column gap="sm" marginBottom={18}>
      <Row justifyContent="space-between">
        <SectionHeading>Signatures</SectionHeading>
      </Row>
      <Text
        size="sm"
        style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
      >
        {message}
      </Text>
    </Column>
  );
};

const StateChangePreview: React.FC<{ data: TxnSimulationDataType["data"] }> = ({
  data,
}) => {
  if (data && data.length > 0) {
    return (
      <Column gap="lg">
        <Row justifyContent="space-between">
          <SectionHeading>State</SectionHeading>
        </Row>
        <TxnDataWrapper>
          {data.map((data, index) => {
            return <TxnSimulation key={index} txnData={data} />;
          })}
        </TxnDataWrapper>
      </Column>
    );
  }

  return (
    <Column gap="sm">
      <Row justifyContent="space-between">
        <SectionHeading>State</SectionHeading>
      </Row>
      <Text size="md" color="base30">
        No state changes found. Proceed with caution
      </Text>
    </Column>
  );
};
