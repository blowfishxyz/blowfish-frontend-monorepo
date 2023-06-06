import React, { FC, ReactElement, ReactNode } from "react";
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
import {
  CardWrapper,
  CardContent,
  Divider,
  CardText,
  CardBlackTextLink,
} from "./common";
import { TxnSimulation } from "~components/simulation-results-types/TxnSimulation";
import { SignatureSimulation } from "~components/simulation-results-types/SignatureSimulation";
import { shortenHex } from "~utils/hex";
import {
  SignatureDataType,
  TxnSimulationDataType,
} from "~components/simulation-results-types/mock-data";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/api-client";

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
  max-height: 175px;
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
  simulationType: "transaction" | "signature";
  origin?: string;
  website?: string;
  contract: string;
  severity: Severity | undefined;
  children: ReactNode;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  advancedDetails: () => ReactElement;
}

const PreviewCard: FC<PreviewCardProps> = ({
  title,
  origin,
  website,
  contract,
  severity,
  children,
  chainNetwork,
  chainFamily,
  advancedDetails,
}) => {
  return (
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
            <CardBlackTextLink>
              <BlockExplorerLink
                chainFamily={chainFamily}
                chainNetwork={chainNetwork}
                address={contract}
              >
                {shortenHex(contract)}
              </BlockExplorerLink>
            </CardBlackTextLink>
          </CardText>
        </StyledColumn>
      </StyledCardContent>
      <Divider margin="0 0 16px" />
      {advancedDetails()}
    </CardWrapper>
  );
};

export interface PreviewTxnProps {
  simulationType: "transaction" | "signature";
  txnSimulationData?: TxnSimulationDataType;
  signatureData: SignatureDataType[];
  warnings: UIWarning[];
  severity: Severity | undefined;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  advancedDetails: () => ReactElement;
}

const PreviewTxn: FC<PreviewTxnProps> = ({
  simulationType,
  txnSimulationData,
  signatureData,
  severity,
  chainNetwork,
  chainFamily,
  advancedDetails,
}) => {
  const renderTransactionPreview = () => (
    <PreviewCard
      title="Preview"
      simulationType="transaction"
      origin={txnSimulationData?.dappUrl?.origin}
      website={txnSimulationData?.dappUrl?.host}
      contract={txnSimulationData?.account || ""}
      severity={severity}
      chainNetwork={chainNetwork}
      chainFamily={chainFamily}
      advancedDetails={advancedDetails}
    >
      <Column gap="lg">
        <Row justifyContent="space-between">
          <SmallGrayText>State</SmallGrayText>
        </Row>
        <TxnDataWrapper>
          {txnSimulationData?.data?.map((data, index) => {
            return <TxnSimulation key={index} txnData={data} />;
          })}
        </TxnDataWrapper>
      </Column>
    </PreviewCard>
  );

  const renderSignaturePreview = () => (
    <>
      {signatureData.map((data, index) => (
        <PreviewCard
          key={index}
          title="Preview"
          simulationType="signature"
          origin={data.dappUrl?.origin}
          website={data.dappUrl?.host}
          contract={data.account}
          severity={severity}
          chainNetwork={chainNetwork}
          chainFamily={chainFamily}
          advancedDetails={advancedDetails}
        >
          <Column gap="md">
            <Row justifyContent="space-between">
              <SmallGrayText>Signatures</SmallGrayText>
            </Row>
            <div>
              <SignatureSimulation data={data} />
            </div>
          </Column>
          <Column gap="sm" paddingTop={4}>
            <Row justifyContent="space-between">
              <SmallGrayText>State</SmallGrayText>
            </Row>
            <div>
              <Text design="secondary" size="md" marginTop={30}>
                {data.state}
              </Text>
            </div>
          </Column>
        </PreviewCard>
      ))}
    </>
  );

  return (
    <>
      {simulationType === "transaction" && renderTransactionPreview()}
      {simulationType === "signature" && renderSignaturePreview()}
    </>
  );
};

export default PreviewTxn;
