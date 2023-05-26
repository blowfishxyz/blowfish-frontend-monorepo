import React from "react";
import { TxnImage, SmallGrayText } from "./common";
import { styled } from "styled-components";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { SignatureDataType } from "./mock-data";
import { PlaceholderSimulationImage } from "~components/cards/common";
import { BlowfishIcon } from "@blowfish/ui/icons";

export interface SignatureSimulationProps {
  data: SignatureDataType;
}

const SignatureSimulationMsgWrapper = styled(Column)`
  flex: 1;
`;

const SignatureSimulationAction = styled(Text).attrs({
  size: "sm",
  design: "primary",
})`
  @media (${device.lg}) {
    font-size: 17px;
  }
`;

const SignatureSimulationMsg = styled(Row)`
  flex-wrap: wrap;
`;

const SignatureSimulatioMsgText = styled(Text).attrs({
  size: "sm",
  design: "primary",
  marginInline: 3,
})`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SignatureSimulation: React.FC<SignatureSimulationProps> = ({
  data,
}) => {
  return (
    <Row alignItems="flex-start" gap="md" marginBottom={10}>
      {data.imageUrl ? (
        <TxnImage src={data.imageUrl} />
      ) : (
        <PlaceholderSimulationImage>
          <BlowfishIcon />
        </PlaceholderSimulationImage>
      )}

      <SignatureSimulationMsgWrapper>
        <SignatureSimulationAction>
          <Text weight="semi-bold">Connect wallet</Text>
        </SignatureSimulationAction>
        <SignatureSimulationMsg marginTop={5}>
          <SmallGrayText>
            Message:
            <SignatureSimulatioMsgText>
              {data.message}
            </SignatureSimulatioMsgText>
          </SmallGrayText>
        </SignatureSimulationMsg>
      </SignatureSimulationMsgWrapper>
    </Row>
  );
};
