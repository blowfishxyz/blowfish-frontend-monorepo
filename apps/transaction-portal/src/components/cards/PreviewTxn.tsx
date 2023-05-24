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

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
`;

const StyledColumn = styled(Column)`
  padding: 12px 0;
`;

export interface PreviewTxnProps {
  simulationType: "transaction" | "signature";
  txnSimulationData?: TxnSimulationDataType[];
  signatureData?: SignatureDataType[];
}

const renderSimulation = (
  simulationType: string,
  txnSimulationData: TxnSimulationDataType[],
  signatureData: SignatureDataType[]
) => {
  if (simulationType === "transaction") {
    return txnSimulationData.map((txnData, i) => (
      <TxnSimulation key={i} txnData={txnData} />
    ));
  } else if (simulationType === "signature") {
    return signatureData.map((data, i) => (
      <SignatureSimulation key={i} data={data} />
    ));
  }
  return null;
};

export const PreviewTxn: FC<PreviewTxnProps> = ({
  simulationType,
  txnSimulationData = [],
  signatureData = [],
}) => (
  <CardWrapper>
    <CardContent>
      <Row justifyContent="space-between">
        <Title>Preview</Title>
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
    <CardContent>
      <Column gap="md">
        <Row justifyContent="space-between">
          <SmallGrayText>Simulation</SmallGrayText>
          {simulationType === "transaction" && (
            <SmallGrayText>Value</SmallGrayText>
          )}
        </Row>
        <div>
          {renderSimulation(simulationType, txnSimulationData, signatureData)}
        </div>
      </Column>
      {simulationType === "signature" && (
        <Column gap="md">
          <Row justifyContent="space-between">
            <SmallGrayText>State</SmallGrayText>
          </Row>
          <div>
            <Text design="secondary" size="md" marginTop={30}>
              There will be no change in state.
            </Text>
          </div>
        </Column>
      )}
    </CardContent>
    <Divider margin="24px 0 0" />
    <StyledCardContent>
      <StyledColumn gap="sm">
        <SmallGrayText>Website</SmallGrayText>
        <Row gap="xs" alignItems="center">
          <VerifiedIcon />
          <CardText>
            <LinkWithArrow href="">marketplace.blur.eth</LinkWithArrow>
          </CardText>
        </Row>
      </StyledColumn>
      <Divider orientation="vertical" />
      <StyledColumn gap="sm">
        <SmallGrayText>Contract</SmallGrayText>
        <CardText>
          <CardBlackTextLink>
            <LinkWithArrow href="">
              {shortenEnsName("0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376")}
            </LinkWithArrow>
          </CardBlackTextLink>
        </CardText>
      </StyledColumn>
    </StyledCardContent>
    <Divider margin="0 0 16px" />
    <CardContent>
      <ConfirmTxn />
    </CardContent>
  </CardWrapper>
);
