import React from "react";
import { styled } from "styled-components";
import { Column, Row, Text } from "@blowfishxyz/ui";
import { PlaceholderSimulationImage } from "~components/cards/common";
import { BlowfishIcon } from "@blowfish/protect-ui/icons";
import { ImageBase } from "~components/common/ImageBase";

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
        <ImageBase
          src={imageUrl}
          alt="Message signing"
          width={38}
          height={38}
        />
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
