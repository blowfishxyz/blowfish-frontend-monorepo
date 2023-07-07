import React from "react";
import { css, keyframes, styled } from "styled-components";
import { StyledBaseDiv } from "~/common/base";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export type SpinnerProps = { design?: "contrast" | "danger" };

const Base = styled(StyledBaseDiv)<SpinnerProps>`
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  animation: ${rotate} 1s linear infinite;
  ${getDesignStyles}
`;

export const Spinner = React.memo(Base);

function getDesignStyles(props: SpinnerProps) {
  if (props.design === "contrast") {
    return css`
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: ${(p) => p.theme.colors.backgroundPrimary};
    `;
  }
  if (props.design === "danger") {
    return css`
      border-color: ${(p) => p.theme.colors.dangerLight};
      border-top-color: ${(p) => p.theme.colors.danger};
    `;
  }
  return css`
    border-color: rgba(0, 0, 0, 0.3);
    border-top-color: ${(p) => p.theme.colors.foregroundPrimary};
  `;
}
