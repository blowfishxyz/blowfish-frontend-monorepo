import React, { useState } from "react";
import { useInterval } from "react-use";
import styled from "styled-components";

import { Text, TextSmall, UnstyledA } from "@blowfish/ui/core";
import { LoadingAnimation } from "./LoadingAnimation";
import { BlowfishIconFull } from "@blowfish/ui/icons";

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

const FixedBottomLink = styled(UnstyledA)`
  position: fixed;
  bottom: 24px;
`;

const StyledBlowfishIcon = styled(BlowfishIconFull)`
  height: 27px;
  width: auto;
  opacity: 0.4;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  padding-top: 225px;
  > * + * {
    margin-top: 16px;
  }
`;
export interface LoadingScreenProps {
  type?: "transaction" | "message";
  style?: React.CSSProperties;
  className?: string;
  animate?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  style,
  type = "transaction",
  className,
  // For better visual diffing we don't want to animate in stories
  animate = true,
}) => {
  const loadingStatesLength = LOADING_STATES[type].length;
  const [stateTextIndex, setStateTextIndex] = useState<number>(0);
  useInterval(
    () =>
      animate && setStateTextIndex((stateTextIndex + 1) % loadingStatesLength),
    STATE_CHANGE_DELAY
  );
  return (
    <Wrapper style={style} className={className}>
      <StyledLoadingAnimation animate={animate} />
      <Text>Simulating {type}...</Text>
      <TextSmall style={{ opacity: 0.3 }}>
        {LOADING_STATES[type][stateTextIndex]}
      </TextSmall>
      <FixedBottomLink
        href="https://blowfish.xyz"
        target="_blank"
        rel="noopener"
      >
        <StyledBlowfishIcon />
      </FixedBottomLink>
    </Wrapper>
  );
};
