import React from "react";
import { styled } from "styled-components";
import { Column, Row, Text } from "@blowfish/ui/core";
import { PlaceholderSimulationImage } from "~components/cards/common";
import { BlowfishIcon } from "@blowfish/ui/icons";
import { TxnImage } from "~components/simulation-results/TxnImage";

const SignatureSimulationMsgWrapper = styled(Column)`
  flex: 1;
`;

const SignatureSimulationAction = styled(Text).attrs({
  size: "md",
  design: "primary",
})``;

const SignatureSimulationMsg = styled(Row)`
  flex-wrap: wrap;
`;

const SignatureSimulatioMsgText = styled(Text).attrs({
  size: "sm",
  design: "primary",
})`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface SignatureSimulationProps {
  message?: string;
  imageUrl?: string;
}

export const SignatureSimulation: React.FC<SignatureSimulationProps> = ({
  imageUrl,
  message,
}) => {
  return (
    <Row alignItems="flex-start" gap="md" marginBottom={10}>
      {imageUrl ? (
        <TxnImage src={imageUrl} />
      ) : (
        <PlaceholderSimulationImage>
          <BlowfishIcon />
        </PlaceholderSimulationImage>
      )}

      <SignatureSimulationMsgWrapper>
        <SignatureSimulationAction>
          <Text weight="semi-bold">Message</Text>
        </SignatureSimulationAction>
        <SignatureSimulationMsg marginTop={5}>
          {message && (
            <SignatureSimulatioMsgText>{message}</SignatureSimulatioMsgText>
          )}
        </SignatureSimulationMsg>
      </SignatureSimulationMsgWrapper>
    </Row>
  );
};
