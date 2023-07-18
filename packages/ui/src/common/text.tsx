import React from "react";
import { css, styled } from "styled-components";
import { StyledBaseText } from "~/common/base";
import type { Properties } from "csstype";
import { Colors, colors } from "../utils/colors";

export type TextProps = {
  className?: string;
  style?: React.CSSProperties;
  $design?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "tertiary";
  weight?: "semi-bold" | "bold" | "normal";
  /**
   * xxs-10px
   * xs-12px
   * sm-13.5px
   * md-15px
   * lg-18px
   * xl-22px
   * xxl-28px
   * */
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  textAlign?: Properties["textAlign"];
  truncate?: boolean;
} & Colors;

const StyledText = styled(StyledBaseText)<TextProps>`
  font-family: "GT-Planar";
  ${getDesignStyles}
  ${getSizeStyles}
  ${getWeightStyles}
  ${getTextSpecificStyles}
  ${colors}
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
      font-size: 22px;
      line-height: 28.6px;
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

function getDesignStyles({ $design }: TextProps) {
  if ($design === "danger") {
    return css`
      color: ${(p) => p.theme.colors.danger};
    `;
  }
  if ($design === "success") {
    return css`
      color: ${(p) => p.theme.colors.success};
    `;
  }
  if ($design === "warning") {
    return css`
      color: ${(p) => p.theme.severityColors.WARNING.backgroundV2};
    `;
  }
  if ($design === "secondary") {
    return css`
      color: ${(p) => p.theme.colors.foregroundSecondary};
    `;
  }
  if ($design === "primary") {
    return css`
      color: ${(p) => p.theme.colors.foregroundPrimary};
    `;
  }
  if ($design === "tertiary") {
    return css`
      color: ${(p) => p.theme.colors.backgroundPrimary};
    `;
  }
  return css`
    color: ${(p) => p.theme.colors.foregroundPrimary};
  `;
}

function getTextSpecificStyles(props: TextProps) {
  const rules = [];
  if (props.textAlign) {
    rules.push(css`
      text-align: ${props.textAlign};
    `);
  }
  if (props.truncate) {
    rules.push(
      css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `
    );
  }
  return rules;
}
