import { device } from "@blowfish/ui/core";
import React from "react";
import styled, { css } from "styled-components";

export interface ChipProps {
  variant?: "primary";
  text: React.ReactNode | string;
  clickable?: boolean;
}

const ChipContainer = styled.div<Omit<ChipProps, "text">>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 13px;
  padding: 10px;
  color: #6a6a6a;
  background-color: #6a6a6a1a;

  @media (${device.lg}) {
    font-size: 14px;
  }

  &[data-clickable="true"] {
    cursor: pointer;
  }

  ${({ variant }) =>
    variant === "primary" &&
    css`
      background-color: rgba(0, 185, 74, 0.102);
      color: #00b94a;
    `}
`;

const Chip = ({ text, ...rest }: ChipProps) => {
  return (
    <ChipContainer {...rest}>
      <span>{text}</span>
    </ChipContainer>
  );
};

export default Chip;
