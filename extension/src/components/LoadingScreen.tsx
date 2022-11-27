import React, { useState } from "react";
import styled from "styled-components";
import { useInterval } from "react-use";

import { LoadingAnimation } from "./LoadingAnimation";
import { Text, TextSmall } from ".//Typography";
import { BlowfishIcon } from "./icons/BlowfishIcon";
import { UnstyledA } from "./Links";

// TODO(kimpers): Actual copy
const LOADING_STATES = {
  transaction: [
    "Simulating transaction",
    "Analyzing smart contract",
    "Verifying accounts",
    "Checking for malicious code",
  ],
  message: [
    "Simulating message",
    "Checking for malicious code",
    "Verifying accounts",
    "Analyzing signature request",
  ],
};
const STATE_CHANGE_DELAY = 2000;

const StyledLoadingAnimation = styled(LoadingAnimation)`
  width: 48px;
  height: auto;
`;

const StyledLink = styled(UnstyledA)`
  /* Override wrapper default margin between children */
  && {
    margin-top: auto;
    margin-bottom: 24px;
  }
`;

const StyledBlowfishIcon = styled(BlowfishIcon)`
  height: 27px;
  width: auto;
  opacity: 0.4;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 225px;
  box-sizing: border-box;
  > * + * {
    margin-top: 16px;
  }
`;
interface LoadingScreenProps {
  type?: "transaction" | "message";
  style?: React.CSSProperties;
  className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  style,
  type = "transaction",
  className,
}) => {
  const loadingStatesLength = LOADING_STATES[type].length;
  const [stateTextIndex, setStateTextIndex] = useState<number>(
    Math.round(Math.random() * loadingStatesLength)
  );
  useInterval(
    () => setStateTextIndex((stateTextIndex + 1) % loadingStatesLength),
    STATE_CHANGE_DELAY
  );
  return (
    <Wrapper style={style} className={className}>
      <StyledLoadingAnimation />
      <Text>Simulating {type}...</Text>
      <TextSmall style={{ opacity: 0.3 }}>
        {LOADING_STATES[type][stateTextIndex]}
      </TextSmall>
      <StyledLink href="https://blowfish.xyz" target="_blank" rel="noopener">
        <StyledBlowfishIcon />
      </StyledLink>
    </Wrapper>
  );
};
