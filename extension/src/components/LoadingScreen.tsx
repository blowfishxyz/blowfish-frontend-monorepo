import React, { useState } from "react";
import styled from "styled-components";
import { useInterval } from "react-use";

import { LoadingAnimation } from "./LoadingAnimation";
import { Text, TextSmall } from ".//Typography";
import { BlowfishIcon } from "./icons/BlowfishIcon";
import { UnstyledA } from "./Links";

// TODO(kimpers): Actual copy
const LOADING_STATES = [
  "Simulating transaction",
  "Analyzing smart contract",
  "Verifying accounts",
  "Checking for malicious code",
];
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
  style?: React.CSSProperties;
  className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  style,
  className,
}) => {
  const [stateTextIndex, setStateTextIndex] = useState<number>(0);
  useInterval(
    () => setStateTextIndex((stateTextIndex + 1) % LOADING_STATES.length),
    STATE_CHANGE_DELAY
  );
  return (
    <Wrapper style={style} className={className}>
      <StyledLoadingAnimation />
      <Text>Simulating Transaction...</Text>
      <TextSmall style={{ opacity: 0.3 }}>
        {LOADING_STATES[stateTextIndex]}
      </TextSmall>
      <StyledLink href="https://blowfish.xyz" target="_blank" rel="noopener">
        <StyledBlowfishIcon />
      </StyledLink>
    </Wrapper>
  );
};
