import React from "react";
import { styled, keyframes } from "styled-components";
import { Row, TextXL, Column, GrayText, size } from "@blowfish/ui/core";
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

const StyledTextXL = styled(TextXL)`
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
    <Row justify="space-between">
      <GrayText>{label}</GrayText>
      <CardText>{value}</CardText>
    </Row>
    <Divider margin="0.8rem 0" />
  </>
);

const PendingView = () => {
  return (
    <Column gap="md" alignItems="center">
      <StyledBlowfishIcon />
      <StyledTextXL>Pending</StyledTextXL>
      <StyledCenteredText>
        Your transaction is being sent to the Ethereum blockchain.
      </StyledCenteredText>
      <GrayText>
        <StyledGrayLink href="">View on Etherscan →</StyledGrayLink>
      </GrayText>
      <TxnInfoWrapper>
        <InfoRow
          label="Status"
          value={
            <Row gap="md">
              <TinyCircle />
              <CardText>Being mined</CardText>
            </Row>
          }
        />
        <InfoRow
          label="Confirmations"
          value={
            <>
              3 <GrayText>of 30</GrayText>
            </>
          }
        />
        <InfoRow label="Transaction Fee" value="$4.55" />
      </TxnInfoWrapper>
      <CardRow gap="md">
        <CardSmallSecondaryButton>Report</CardSmallSecondaryButton>
        <CardPrimaryButton>
          <StyledSpeedUpIcon />
          Speed up transaction
        </CardPrimaryButton>
      </CardRow>
    </Column>
  );
};

export default PendingView;
