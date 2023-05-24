import React from "react";
import { TxnImage, SmallGrayText } from "./common";
import { styled } from "styled-components";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { Divider } from "~components/cards/common";
import { shortenHex } from "~utils/hex";
import { SignatureDataType } from "./mock-data";

export interface SignatureSimulationProps {
  data: SignatureDataType;
}

const SignatureSimulationMsgWrapper = styled(Column)``;

const SignatureSimulationAction = styled(Text).attrs({ size: "sm", design: "primary" })`
  @media (${device.lg}) {
    font-size: 17px;
  }
`;

const SignatureSimulationMsg = styled(Row)`
  flex-wrap: wrap;
`;

export const SignatureSimulation: React.FC<SignatureSimulationProps> = ({
  data,
}) => {
  return (
    <Row alignItems="center" gap="md" marginBottom={10}>
      <TxnImage src={data.imageUrl} />
      <SignatureSimulationMsgWrapper>
        <SignatureSimulationAction>
          <Text weight="semi-bold">Connect wallet</Text>
        </SignatureSimulationAction>
        <SignatureSimulationMsg marginTop={5}>
          <SmallGrayText>
            Message:
            <Text size="sm" design="primary" marginRight={3}>
              {data.message}
            </Text>
          </SmallGrayText>
          <Divider orientation="vertical" margin="0 5px" />
          <SmallGrayText>
            Challenge:
            <Text size="sm" design="primary" marginRight={3}>
              {shortenHex(data.challenge)}
            </Text>
          </SmallGrayText>
        </SignatureSimulationMsg>
      </SignatureSimulationMsgWrapper>
    </Row>
  );
};
