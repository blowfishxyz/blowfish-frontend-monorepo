import React from "react";
import { TxnImage, SmallGrayText } from "./common";
import { styled } from "styled-components";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { CardBlackTextLink, Divider } from "~components/cards/common";
import { shortenHex } from "~utils/hex";
import { SignatureDataType } from "./mock-data";

export interface SignatureSimulationProps {
  data: SignatureDataType;
}

const SignatureSimulationWrapper = styled(Row)`
  margin-bottom: 10px;
`;

const SignatureSimulationMsgWrapper = styled(Column)``;

const SignatureSimulationAction = styled(Text)`
  font-size: 13px;
  line-height: 19px;

  @media (${device.lg}) {
    font-size: 17px;
  }
`;

const SmallSignatureSimulationText = styled(Text)`
  font-size: 13px;
  margin-left: 3px;
`;

const SignatureSimulationMsg = styled(Row)`
  margin-top: 5px;
`;

const SignatureSimulation: React.FC<SignatureSimulationProps> = ({ data }) => {
  return (
    <SignatureSimulationWrapper align="center" gap="md">
      <TxnImage src={data.imageUrl} />
      <SignatureSimulationMsgWrapper>
        <SignatureSimulationAction>
          <Text semiBold>Connect wallet</Text> to{" "}
          <CardBlackTextLink href={`${data.url}`}>{data.url}</CardBlackTextLink>
        </SignatureSimulationAction>
        <SignatureSimulationMsg>
          <SmallGrayText>
            Message:
            <SmallSignatureSimulationText>
              {data.message}
            </SmallSignatureSimulationText>
          </SmallGrayText>
          <Divider orientation="vertical" margin="0 5px" />
          <SmallGrayText>
            Challenge:
            <SmallSignatureSimulationText>
              {shortenHex(data.challenge)}
            </SmallSignatureSimulationText>
          </SmallGrayText>
        </SignatureSimulationMsg>
      </SignatureSimulationMsgWrapper>
    </SignatureSimulationWrapper>
  );
};

export default SignatureSimulation;
