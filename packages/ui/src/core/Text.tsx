import React from "react";
import { css, styled } from "styled-components";
import { StyledBaseText } from "./StyledBase";

export interface TextProps {
  className?: string;
  style?: React.CSSProperties;
  design?: "primary" | "secondary" | "danger" | "success";
  weight?: "semi-bold" | "bold" | "normal";
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const StyledText = styled(StyledBaseText)<TextProps>`
  font-family: "GT-Planar";
  ${getDesignStyles};
  ${getSizeStyles};
  ${getWeightStyles};
`;

export const Text = React.memo(
  React.forwardRef<
    HTMLSpanElement,
    TextProps & React.ComponentProps<typeof StyledBaseText>
  >((props, ref) => {
    return <StyledText ref={ref} {...props} />;
  })
);

function getSizeStyles({ size }: TextProps) {
  if (size === "xxl") {
    return css`
      font-size: 28px;
      line-height: 36.4px;
    `;
  }
  if (size === "xl") {
    return css`
      font-size: 24px;
      line-height: 31.2px;
    `;
  }
  if (size === "lg") {
    return css`
      font-size: 18px;
      line-height: 23.4px;
    `;
  }
  if (size === "md") {
    return css`
      font-size: 15px;
      line-height: 21px;
    `;
  }
  if (size === "sm") {
    return css`
      font-size: 13.5px;
      line-height: 19px;
    `;
  }
  if (size === "xs") {
    return css`
      font-size: 12px;
      line-height: 15.6px;
    `;
  }
  if (size === "xxs") {
    return css`
      font-size: 10px;
      line-height: 13px;
    `;
  }
  return css`
    font-size: 15px;
    line-height: 21px;
  `;
}

function getWeightStyles({ weight }: TextProps) {
  if (weight === "bold") {
    return css`
      font-weight: 700;
    `;
  }
  if (weight === "semi-bold") {
    return css`
      font-weight: 500;
    `;
  }
  if (weight === "normal") {
    return css`
      font-weight: 400;
    `;
  }
  return css`
    font-weight: 400;
  `;
}

function getDesignStyles({ design }: TextProps) {
  if (design === "danger") {
    return css`
      color: ${(p) => p.theme.colors.foregroundDanger};
    `;
  }
  if (design === "success") {
    return css`
      color: ${(p) => p.theme.colors.success};
    `;
  }
  if (design === "secondary") {
    return css`
      color: ${(p) => p.theme.colors.foregroundSecondary};
    `;
  }
  if (design === "primary") {
    return css`
      color: ${(p) => p.theme.colors.foregroundPrimary};
    `;
  }
  return css`
    color: ${(p) => p.theme.colors.foregroundPrimary};
  `;
}
