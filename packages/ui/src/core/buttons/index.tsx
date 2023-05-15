import { css, styled } from "styled-components";

import { BaseButton } from "./BaseButton";

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

function getDesignStyles({ design }: ButtonProps) {
  if (design === "secondary") {
    return css`
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
        0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
      border-radius: 12px;
      color: #010101;
    `;
  }
  if (design === "primary") {
    return css`
      background: #000000;
      box-shadow: 0px 9.94853px 24.1177px rgba(0, 0, 0, 0.136834),
        0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
        0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
      color: #ffffff;

      &:disabled {
        background: rgba(0, 0, 0, 0.3);
      }
    `;
  }
  return css`
    background: #000000;
    box-shadow: 0px 9.94853px 24.1177px rgba(0, 0, 0, 0.136834),
      0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
      0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
    color: #ffffff;

    &:disabled {
      background: rgba(0, 0, 0, 0.3);
    }
  `;
}

type ButtonProps = {
  design?: "primary" | "secondary";
};

export const Button = styled(BaseButton)<ButtonProps>`
  ${baseStyles}
  ${getDesignStyles}
  ${interactiveStyles}
`;
