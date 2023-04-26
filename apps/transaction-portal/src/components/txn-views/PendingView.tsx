import React from "react";
import { styled } from "styled-components";
import {
  PrimaryButton,
  Row,
  TextXL,
  Column,
  GrayText,
  size,
} from "@blowfish/ui/core";
import {
  BlowfishIcon,
  MiningIndicatorIcon,
  SpeedUpIcon,
} from "@blowfish/ui/icons";
import {
  Divider,
  StyledText,
  SmallSecondaryButton,
  StyledRow,
  GrayLink,
} from "../cards/CardCommonStyles";

const StyledSpeedUpIcon = styled(SpeedUpIcon)`
  @media only screen and (max-width: ${size.lg}) {
    display: none;
  }
`;

const StyledTextXL = styled(TextXL)`
  margin: 8px;
`;

const StyledCenteredText = styled(StyledText)`
  width: 250px;
  text-align: center;
`;

const TxnInfoWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const StyledGrayLink = styled(GrayLink)`
  text-decoration: none;
`;

const BlowfishIconStyles = {
  width: "77px",
  height: "76px",
  opacity: "0.2",
};

const MiningIndicatorIconStyles = {
  marginRight: "10px",
};

type InfoRowProps = {
  label: string;
  value: string | React.ReactNode;
};

const InfoRow = ({ label, value }: InfoRowProps) => (
  <>
    <Row justify="space-between">
      <GrayText>{label}</GrayText>
      <StyledText>{value}</StyledText>
    </Row>
    <Divider margin="0.8rem 0" />
  </>
);

const PendingView = () => {
  return (
    <Column gap="md" alignItems="center">
      <BlowfishIcon style={BlowfishIconStyles} />
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
            <Row>
              <MiningIndicatorIcon style={MiningIndicatorIconStyles} />
              <StyledText>Being mined</StyledText>
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
      <StyledRow gap="md">
        <SmallSecondaryButton>Report</SmallSecondaryButton>
        <PrimaryButton>
          <StyledSpeedUpIcon />
          Speed up transaction
        </PrimaryButton>
      </StyledRow>
    </Column>
  );
};

export default PendingView;
