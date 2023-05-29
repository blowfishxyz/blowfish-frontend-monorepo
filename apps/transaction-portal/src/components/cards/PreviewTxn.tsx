import React, { FC, ReactNode } from "react";
import { Column, LinkWithArrow, Row, Text, device } from "@blowfish/ui/core";
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
import { ConfirmTxn } from "./ConfirmTxn";
import {
  SignatureDataType,
  TxnSimulationDataType,
} from "~components/simulation-results-types/mock-data";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";

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

interface PreviewCardProps {
  title: string;
  simulationType: "transaction" | "signature";
  origin?: string;
  website?: string;
  contract: string;
  warning?: UIWarning;
  children: ReactNode;
  onContinue: () => void;
  onCancel: () => void;
}

const PreviewCard: FC<PreviewCardProps> = ({
  title,
  origin,
  website,
  contract,
  warning,
  onContinue,
  onCancel,
  children,
}) => (
  <CardWrapper>
    <CardContent>
      <Row justifyContent="space-between">
        <Title>{title}</Title>
        <Chip warning={warning} />
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
            <LinkWithArrow href={contract}>
              {shortenHex(contract)}
            </LinkWithArrow>
          </CardBlackTextLink>
        </CardText>
      </StyledColumn>
    </StyledCardContent>
    <Divider margin="0 0 16px" />
    <CardContent>
      <ConfirmTxn
        onContinue={onContinue}
        onCancel={onCancel}
        warning={warning}
      />
    </CardContent>
  </CardWrapper>
);

export interface PreviewTxnProps {
  simulationType: "transaction" | "signature";
  txnSimulationData?: TxnSimulationDataType;
  signatureData: SignatureDataType[];
  warnings: UIWarning[];
  onContinue: () => void;
  onCancel: () => void;
}

const PreviewTxn: FC<PreviewTxnProps> = ({
  simulationType,
  txnSimulationData,
  signatureData,
  warnings,
  onContinue,
  onCancel,
}) => {
  const renderTransactionPreview = () => (
    <PreviewCard
      title="Preview"
      simulationType="transaction"
      origin={txnSimulationData?.dappUrl?.origin}
      website={txnSimulationData?.dappUrl?.host}
      contract={txnSimulationData?.account || ""}
      warning={warnings[0]}
      onContinue={onContinue}
      onCancel={onCancel}
    >
      <Column gap="lg">
        <Row justifyContent="space-between">
          <SmallGrayText>State</SmallGrayText>
        </Row>
        <div>
          {txnSimulationData?.data?.map((data, index) => (
            <TxnSimulation key={index} txnData={data} />
          ))}
        </div>
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
          warning={warnings[0]}
          onContinue={onContinue}
          onCancel={onCancel}
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
