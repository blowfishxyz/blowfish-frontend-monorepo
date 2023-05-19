import React from "react";
import { CardText, CardWrapper } from "./cards/common";
import { styled } from "styled-components";
import { Column, Text } from "@blowfish/ui/core";
import { BlowfishIcon } from "@blowfish/ui/icons";

const ProtectLoadingScreenContainer = styled(CardWrapper)`
  flex: unset;
  width: 370px;
`;

const StyledBlowfishIcon = styled(BlowfishIcon)`
  width: 104px;
  height: 102px;
  opacity: 0.2;
`;

const ProtectLoadingScreenTitle = styled(Text)`
  margin: 8px 0;
`;

const ProtectLoadingScreenMessage = styled(CardText)`
  width: 250px;
  text-align: center;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.01em;
`;

const ProtectLoadingScreen = () => {
  return (
    <ProtectLoadingScreenContainer>
      <Column gap="md" alignItems="center">
        <StyledBlowfishIcon />
        <ProtectLoadingScreenTitle size="xl" weight="semi-bold">
          Simulating...
        </ProtectLoadingScreenTitle>
        <ProtectLoadingScreenMessage>
          We are making sure that it is safe for you to proceed with this
          transaction.
        </ProtectLoadingScreenMessage>
      </Column>
    </ProtectLoadingScreenContainer>
  );
};

export default ProtectLoadingScreen;
