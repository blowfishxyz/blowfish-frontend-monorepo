import React from "react";
import styled from "styled-components";

interface TypographyProps {
  className?: string;
  style?: React.CSSProperties;
  secondary?: boolean;
}

export const H1 = styled.h1<TypographyProps>`
  font-family: "GT Planar";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.secondaryText : theme.colors.primaryText};
`;

export const Text = styled.span<TypographyProps>`
  font-family: "GT Planar";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.secondaryText : theme.colors.primaryText};
`;

export const TextSmall = styled(Text)<TypographyProps>`
  font-size: 14px;
  line-height: 16px;
`;
