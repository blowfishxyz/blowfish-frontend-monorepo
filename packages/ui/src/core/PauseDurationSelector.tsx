import React from "react";
import styled, { keyframes } from "styled-components";
import { SmallButtonPrimary } from "./buttons";
import { Row } from "./Row";
import { PauseDuration } from "@blowfish/hooks";

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

export const PeriodDurationContainer = styled(Row)`
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  height: 30px;
  justify-content: space-between;
  color: white;
  padding: 0 20px;
  gap: 20px;
`;

export const DurationButton = styled(SmallButtonPrimary)<{ index: number }>`
  opacity: 0;
  animation-name: ${fadeIn};
  animation-delay: ${({ index }) => `${index * 0.2}s`};
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

export const PauseDurationSelector = ({
  onClick,
}: {
  onClick: (period: PauseDuration) => void;
}) => {
  return (
    <PeriodDurationContainer>
      {Object.entries(PauseDuration).map(([key, value], index) => (
        <DurationButton index={index} onClick={() => onClick(value)} key={key}>
          {value}
        </DurationButton>
      ))}
    </PeriodDurationContainer>
  );
};


