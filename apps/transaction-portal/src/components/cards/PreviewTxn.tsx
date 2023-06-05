import React, { FC, ReactNode } from "react";
import {
  BlockExplorerLink,
  Column,
  LinkWithArrow,
  Row,
  Text,
  device,
} from "@blowfish/ui/core";
import styled from "styled-components";
import { Chip } from "../chips/Chip";
import { CardWrapper, CardContent, Divider, CardText } from "./common";
import { shortenHex } from "~utils/hex";
import { ConfirmTxn } from "./ConfirmTxn";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import {
  ChainFamily,
  ChainNetwork,
  EvmExpectedStateChangesInner,
  EvmMessageExpectedStateChange,
} from "@blowfish/api-client";
import { TxnSimulation } from "~components/simulation-results/TxnSimulation";

export type TxnSimulationDataType = {
  dappUrl: URL | undefined;
  account: string;
  message: string | undefined;
  data:
    | EvmMessageExpectedStateChange[]
    | EvmExpectedStateChangesInner[]
    | undefined;
};

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;

  @media (${device.lg}) {
    font-size: 22px;
    line-height: 25px;
  }
`;

const SmallGrayText = styled(Text).attrs({ size: "sm", design: "secondary" })``;

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
  max-height: 200px;
  height: 100%;
  overflow-y: auto;
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
  contract: string;
  warnings: UIWarning[];
  severity: Severity | undefined;
  children: ReactNode;
  onContinue: () => void;
  onCancel: () => void;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
}

const PreviewCard: FC<PreviewCardProps> = ({
  title,
  origin,
  website,
  contract,
  warnings,
  severity,
  onContinue,
  onCancel,
  children,
  chainNetwork,
  chainFamily,
}) => (
  <CardWrapper>
    <CardContent>
      <Row justifyContent="space-between">
        <Title>{title}</Title>
        <Chip severity={severity} />
      </Row>
    </CardContent>
    <Divider margin="16px 0" />
    <CardContent>{children}</CardContent>
    <Divider margin="24px 0 0" />
    <StyledCardContent>
      <StyledColumn gap="sm">
        <SmallGrayText>Website</SmallGrayText>
        <Row gap="xs" alignItems="center">
          <CardText>
            <LinkWithArrow href={origin || ""}>{website}</LinkWithArrow>
          </CardText>
        </Row>
      </StyledColumn>
      <Divider orientation="vertical" margin="0 36px" />
      <StyledColumn gap="sm">
        <SmallGrayText>Contract</SmallGrayText>
        <CardText>
          <BlockExplorerLink
            chainFamily={chainFamily}
            chainNetwork={chainNetwork}
            address={contract}
          >
            {shortenHex(contract)}
          </BlockExplorerLink>
        </CardText>
      </StyledColumn>
    </StyledCardContent>
    <Divider margin="0 0 16px" />
    <CardContent>
      <ConfirmTxn
        onContinue={onContinue}
        onCancel={onCancel}
        warnings={warnings}
        severity={severity}
      />
    </CardContent>
  </CardWrapper>
);

export interface PreviewTxnProps {
  txnData: TxnSimulationDataType;
  warnings: UIWarning[];
  severity: Severity | undefined;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  onContinue: () => void;
  onCancel: () => void;
}

export const PreviewTxn: FC<PreviewTxnProps> = ({
  txnData,
  warnings,
  severity,
  onContinue,
  onCancel,
  chainNetwork,
  chainFamily,
}) => {
  const { account, dappUrl, data, message } = txnData;
  const { origin, host } = dappUrl || {};

  return (
    <PreviewCard
      title="Preview changes"
      origin={origin}
      website={host}
      contract={account}
      warnings={warnings}
      severity={severity}
      onContinue={onContinue}
      onCancel={onCancel}
      chainNetwork={chainNetwork}
      chainFamily={chainFamily}
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
        <SmallGrayText>Signatures</SmallGrayText>
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
          <SmallGrayText>State</SmallGrayText>
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
        <SmallGrayText>State</SmallGrayText>
      </Row>
      <Text size="md" design="danger">
        No state changes found. Proceed with caution
      </Text>
    </Column>
  );
};
