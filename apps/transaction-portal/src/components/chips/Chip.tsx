import React from "react";
import { styled, css } from "styled-components";

type ChipProps = {
  // NOTE: other variant types can include "danger" (for high risk), "primary" here represents low risk, and the default state is the regular grey chip
  variant?: "primary";
  text: React.ReactNode | string;
};

const ChipContainer = styled.span<{ variant?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 14px;
  height: 32px;
  width: 85px;
  color: #6a6a6a;
  background-color: #6a6a6a1a;

  ${({ variant }) =>
    variant === "primary" &&
    css`
      background-color: #00b94a1a;
      color: #00b94a;
    `}
`;

const Chip = ({ text, variant }: ChipProps) => {
  return <ChipContainer variant={variant}>{text}</ChipContainer>;
};

export default Chip;
