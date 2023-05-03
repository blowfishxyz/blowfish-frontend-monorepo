import React, { FC } from "react";
import { Column, GrayText, Row, Text, device } from "@blowfish/ui/core";
import styled from "styled-components";
import Chip from "../chips/Chip";
import {
  CardWrapper,
  CardContent,
  Divider,
  CardText,
  CardBlackTextLink,
} from "./common";
import TxnSimulation from "~components/simulation-results-types/TxnSimulation";
import SignatureSimulation from "~components/simulation-results-types/SignatureSimulation";
import { VerifiedIcon } from "@blowfish/ui/icons";
import {
  SignatureDataType,
  TxnSimulationDataType,
} from "~components/simulation-results-types/mock-data";

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;

  @media (${device.lg}) {
    font-size: 22px;
    line-height: 25px;
  }
`;

const SmallGrayText = styled(GrayText)<{ marginLeft?: string }>`
  font-size: 13px;
  margin-left: ${({ marginLeft }) => marginLeft || "0"};
`;

const TxnSimulationResultsWrapper = styled.div`
  margin-top: 16px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
`;

const WrappedRow = styled(Row)`
  flex-wrap: wrap;

  @media (${device.lg}) {
    &:last-child {
      gap: 12px;
    }
  }
`;

const StyledColumn = styled(Column)`
  padding: 8px 0;
`;

const ChipWrapper = styled(Row)`
  margin-top: 3px;
  flex-wrap: wrap;
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
      <TxnSimulation key={i} txnData={txnData.rawInfo} />
    ));
  } else if (simulationType === "signature") {
    return signatureData.map((data, i) => (
      <SignatureSimulation key={i} data={data} />
    ));
  }
  return null;
};

const labels = ["Marketplace", "Label2", "Label3", "Label4"];

const PreviewTxn: FC<PreviewTxnProps> = ({
  simulationType,
  txnSimulationData = [],
  signatureData = [],
}) => (
  <CardWrapper removePaddingBottom>
    <CardContent>
      <Row justify="space-between">
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
      <Row justify="space-between">
        <SmallGrayText>Simulation</SmallGrayText>
        {simulationType === "transaction" && (
          <SmallGrayText>Value</SmallGrayText>
        )}
      </Row>
      <TxnSimulationResultsWrapper>
        {renderSimulation(simulationType, txnSimulationData, signatureData)}
      </TxnSimulationResultsWrapper>
    </CardContent>
    <Divider margin="24px 0 0" />
    <StyledCardContent>
      <StyledColumn>
        <SmallGrayText>Counterparty</SmallGrayText>
        <Row gap="sm" align="center">
          <CardText>
            <CardBlackTextLink href="">marketplace.blur.eth</CardBlackTextLink>
          </CardText>
          <VerifiedIcon />
        </Row>
      </StyledColumn>
      <Divider orientation="vertical" />
      <StyledColumn>
        <SmallGrayText>Others Involved</SmallGrayText>
        <CardText>
          <CardBlackTextLink>None</CardBlackTextLink>
        </CardText>
      </StyledColumn>
    </StyledCardContent>
    <Divider />
    <StyledCardContent>
      <StyledColumn>
        <SmallGrayText>Performed?</SmallGrayText>
        <WrappedRow gap="sm">
          <CardText>Yes</CardText>
          <SmallGrayText>3 times</SmallGrayText>
        </WrappedRow>
      </StyledColumn>
      <Divider orientation="vertical" />
      <StyledColumn>
        <SmallGrayText>Used?</SmallGrayText>
        <WrappedRow gap="sm">
          <CardText>Yes</CardText>
          <SmallGrayText>481 wallets</SmallGrayText>
        </WrappedRow>
      </StyledColumn>
      <Divider orientation="vertical" />
      <StyledColumn>
        <SmallGrayText>Labels</SmallGrayText>
        <ChipWrapper gap="sm">
          {labels.length > 0 && <Chip text={labels[0]} />}
          {labels.length > 1 && (
            <Chip text={`+${labels.length - 1}`} data-clickable="true" />
          )}
        </ChipWrapper>
      </StyledColumn>
    </StyledCardContent>
  </CardWrapper>
);

export default PreviewTxn;
