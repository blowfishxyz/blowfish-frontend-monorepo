import React from "react";
import { CardText } from "./cards/common";
import { styled } from "styled-components";
import { Column, Text } from "@blowfish/ui/core";
import { LoadingAnimation } from "./LoadingAnimation";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoadingAnimation = styled(LoadingAnimation)`
  width: 104px;
  height: auto;
  opacity: 0.2;
`;

const ProtectLoadingScreenTitle = styled(Text)`
  margin: 8px 0;
`;

const ProtectLoadingScreenMessage = styled(CardText)`
  width: 250px;
  text-align: center;
  letter-spacing: -0.01em;
`;

interface ProtectLoadingScreenProps {
  animate?: boolean;
}

export const ProtectLoadingScreen = ({
  animate = true,
}: ProtectLoadingScreenProps) => {
  return (
    <Wrapper>
      <Column
        width="100%"
        maxWidth={400}
        gap="md"
        alignItems="center"
        withBorder
        backgroundColor="backgroundPrimary"
        borderRadius={12}
        padding={32}
      >
        <StyledLoadingAnimation animate={animate} />
        <ProtectLoadingScreenTitle size="xl" weight="semi-bold">
          Simulating...
        </ProtectLoadingScreenTitle>
        <ProtectLoadingScreenMessage size="md">
          We are making sure that it is safe for you to proceed with this
          transaction.
        </ProtectLoadingScreenMessage>
      </Column>
    </Wrapper>
  );
};
