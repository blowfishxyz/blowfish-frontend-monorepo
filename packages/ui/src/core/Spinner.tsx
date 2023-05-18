import React from "react";
import { css, keyframes, styled } from "styled-components";
import { StyledBaseDiv } from "./StyledBase";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export type SpinnerProps = { contrast?: boolean };

const Base = styled(StyledBaseDiv)<SpinnerProps>`
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  animation: ${rotate} 1s linear infinite;
  ${getContrastStyles}
`;

export const Spinner = React.memo(Base);

function getContrastStyles(props: SpinnerProps) {
  if (props.contrast) {
    return css`
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: ${(p) => p.theme.colors.backgroundPrimary};
    `;
  }
  return css`
    border-color: rgba(0, 0, 0, 0.3);
    border-top-color: ${(p) => p.theme.colors.foregroundPrimary};
  `;
}
