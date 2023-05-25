import React, { FC } from "react";
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
import { VerifiedIcon } from "@blowfish/ui/icons";
import {
  SignatureDataType,
  TxnSimulationDataType,
} from "~components/simulation-results-types/mock-data";
import { shortenEnsName } from "~utils/utils";
import { ConfirmTxn } from "./ConfirmTxn";

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
  paddingRight: 16,
  paddingLeft: 16,
})`
  @media (${device.lg}) {
    padding: 0 32px;
  }
`;

const StyledColumn = styled(Column).attrs({
  paddingTop: 18,
  paddingBottom: 18,
})``;

export interface PreviewTxnProps {
  simulationType: "transaction" | "signature";
  txnSimulationData?: TxnSimulationDataType[];
  signatureData?: SignatureDataType[];
  onContinue: () => void;
  onCancel: () => void;
}

const PreviewCard: FC<{
  title: string;
  simulationType: "transaction" | "signature";
  children: React.ReactNode;
  origin: string;
  website: string;
  contract: string;
  onContinue: () => void;
  onCancel: () => void;
}> = ({ title, children, origin, website, contract, onContinue, onCancel }) => (
  <CardWrapper>
    <CardContent>
      <Row justifyContent="space-between">
        <Title>{title}</Title>
        <Chip
          text={
            <span>
              <b>Low</b> Risk
            </span>
          }
          variant="primary"
        />
      </Row>
    </CardContent>
    <Divider margin="16px 0" />
    <CardContent>{children}</CardContent>
    <Divider margin="24px 0 0" />
    <StyledCardContent>
      <StyledColumn gap="sm">
        <SmallGrayText>Website</SmallGrayText>
        <Row gap="xs" alignItems="center">
          <VerifiedIcon />
          <CardText>
            <LinkWithArrow href={origin}>{website}</LinkWithArrow>
          </CardText>
        </Row>
      </StyledColumn>
      <Divider orientation="vertical" margin="0 36px" />
      <StyledColumn gap="sm">
        <SmallGrayText>Contract</SmallGrayText>
        <CardText>
          <CardBlackTextLink>
            <LinkWithArrow href={contract}>
              {shortenEnsName(contract)}
            </LinkWithArrow>
          </CardBlackTextLink>
        </CardText>
      </StyledColumn>
    </StyledCardContent>
    <Divider margin="0 0 16px" />
    <CardContent>
      <ConfirmTxn onContinue={onContinue} onCancel={onCancel} />
    </CardContent>
  </CardWrapper>
);

const PreviewTxn: FC<PreviewTxnProps> = ({
  simulationType,
  txnSimulationData = [],
  signatureData = [],
  onContinue,
  onCancel,
}) => (
  <>
    {simulationType === "transaction" &&
      txnSimulationData.map((data, index) => (
        <PreviewCard
          key={index}
          title="Preview"
          simulationType="transaction"
          origin=""
          website="marketplace.blur.eth"
          contract="0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376"
          onContinue={onContinue}
          onCancel={onCancel}
        >
          <Column gap="md">
            <Row justifyContent="space-between">
              <SmallGrayText>Simulation</SmallGrayText>
              <SmallGrayText>Value</SmallGrayText>
            </Row>
            <div>
              <TxnSimulation txnData={data} />
            </div>
          </Column>
        </PreviewCard>
      ))}
    {simulationType === "signature" &&
      signatureData.map((data, index) => (
        <PreviewCard
          key={index}
          title="Preview"
          simulationType="signature"
          origin={data.dappUrl.origin}
          website={data.dappUrl.host}
          contract={data.account}
          onContinue={onContinue}
          onCancel={onCancel}
        >
          <Column gap="md">
            <Row justifyContent="space-between">
              <SmallGrayText>Simulation</SmallGrayText>
            </Row>
            <div>
              <SignatureSimulation data={data} />
            </div>
          </Column>
          <Column gap="md">
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

export default PreviewTxn;
