import React from "react";
import { css, styled } from "styled-components";

const resetStyles = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const interactiveStyles = css`
  cursor: pointer;
  transition: transform 0.2s ease-in;

  &:not(:disabled):hover {
    transform: scale(1.02);
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const baseStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
  gap: 14px;
  border-radius: 10px;
  white-space: nowrap;

  font-family: "GT-Planar";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
`;

const secondaryDesign = css`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  color: #010101;
`;

const primaryDesign = css`
  background: #000000;
  box-shadow: 0px 9.94853px 24.1177px rgba(0, 0, 0, 0.136834),
    0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  color: #ffffff;

  &:disabled {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const tertiaryDesign = css`
  background: ${(p) => p.theme.colors.backgroundPrimary};
  color: ${(p) => p.theme.colors.foregroundPrimary};
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 9px 12px;
  border-radius: 56px;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  gap: 6px;

  svg {
    fill: ${(p) => p.theme.colors.base30};
  }
`;

function getDesignStyles({ design }: ButtonProps) {
  if (design === "secondary") {
    return secondaryDesign;
  }
  if (design === "primary") {
    return primaryDesign;
  }
  if (design === "tertiary") {
    return tertiaryDesign;
  }
  return primaryDesign;
}

type ButtonProps = {
  design?: "primary" | "secondary" | "tertiary";
};

const ButtonComponent = styled.button<ButtonProps>`
  ${resetStyles}
  ${baseStyles}
  ${getDesignStyles}
  ${interactiveStyles}
`;

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>((props, ref) => <ButtonComponent ref={ref} {...props} />);
