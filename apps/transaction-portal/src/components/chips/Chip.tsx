import React from "react";
import styled, { css } from "styled-components";

type ChipProps = {
  // NOTE: other variant types can include "danger" (for high risk), "primary" here represents low risk, and the default state is the regular grey chip
  variant?: "primary";
  text: React.ReactNode | string;
  clickable?: boolean;
};

const ChipContainer = styled.div<{ variant?: string; clickable?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px;
  color: #6a6a6a;
  background-color: #6a6a6a1a;

  ${({ variant }) =>
    variant === "primary" &&
    css`
      background-color: #00b94a1a;
      color: #00b94a;
    `}

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const Chip = ({ text, variant, clickable }: ChipProps) => {
  return (
    <ChipContainer variant={variant} clickable={clickable}>
      <span>{text}</span>
    </ChipContainer>
  );
};

export default Chip;
