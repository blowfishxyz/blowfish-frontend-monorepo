import React from "react";
import { styled, keyframes } from "styled-components";
import { Row, Text, Column, size } from "@blowfish/ui/core";
import { BlowfishIcon, SpeedUpIcon } from "@blowfish/ui/icons";
import {
  Divider,
  CardText,
  CardSmallSecondaryButton,
  CardRow,
  CardGrayLink,
  CardPrimaryButton,
} from "../cards/common";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(214, 162, 67, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(214, 162, 67, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(214, 162, 67, 0);
  }
`;

const TinyCircle = styled.div`
  width: 7px;
  height: 7px;
  background-color: #d6a243;
  border-radius: 50%;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const StyledSpeedUpIcon = styled(SpeedUpIcon)`
  @media only screen and (max-width: ${size.lg}) {
    display: none;
  }
`;

const StyledTextXL = styled(Text).attrs({ size: "xxl" })`
  margin: 8px;
`;

const StyledCenteredText = styled(CardText)`
  width: 250px;
  text-align: center;
`;

const TxnInfoWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const StyledGrayLink = styled(CardGrayLink)`
  text-decoration: none;
`;

const StyledBlowfishIcon = styled(BlowfishIcon)`
  width: 77px;
  height: 76px;
  opacity: 0.2;
`;

type InfoRowProps = {
  label: string;
  value: string | React.ReactNode;
};

const InfoRow = ({ label, value }: InfoRowProps) => (
  <>
    <Row justifyContent="space-between">
      <Text design="secondary">{label}</Text>
      <CardText>{value}</CardText>
    </Row>
    <Divider margin="0.8rem 0" />
  </>
);

export const PendingView = () => {
  return (
    <Column gap="md" alignItems="center">
      <StyledBlowfishIcon />
      <StyledTextXL>Pending</StyledTextXL>
      <StyledCenteredText>
        Your transaction is being sent to the Ethereum blockchain.
      </StyledCenteredText>
      <Text design="secondary">
        <StyledGrayLink href="">View on Etherscan →</StyledGrayLink>
      </Text>
      <TxnInfoWrapper>
        <InfoRow
          label="Status"
          value={
            <Row gap="md" alignItems="center">
              <TinyCircle />
              <CardText>Being mined</CardText>
            </Row>
          }
        />
        <InfoRow
          label="Confirmations"
          value={
            <>
              3 <Text design="secondary">of 30</Text>
            </>
          }
        />
        <InfoRow label="Transaction Fee" value="$4.55" />
      </TxnInfoWrapper>
      <CardRow gap="md" width="100%">
        <CardSmallSecondaryButton>Report</CardSmallSecondaryButton>
        <CardPrimaryButton>
          <StyledSpeedUpIcon />
          Speed up transaction
        </CardPrimaryButton>
      </CardRow>
    </Column>
  );
};
