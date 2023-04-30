import React from "react";
import styled, { css } from "styled-components";

type ChipProps = {
  variant?: "primary";
  text: React.ReactNode | string;
  clickable?: boolean;
};

const ChipContainer = styled.div<Omit<ChipProps, "text">>`
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
      background-color: rgba(0, 185, 74, 0.102);
      color: #00b94a;
    `}

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
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
