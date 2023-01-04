import type React from "react";
import styled from "styled-components";

interface TypographyProps {
  className?: string;
  style?: React.CSSProperties;
  secondary?: boolean;
  semiBold?: boolean;
}

export const TextXL = styled.span<TypographyProps>`
  font-weight: 500;
  font-size: 26px;
  line-height: 23px;
`;

export const Text = styled.span<TypographyProps>`
  font-family: "GT-Planar";
  font-style: normal;
  font-weight: ${({ semiBold }) => (semiBold ? 500 : 400)};
  font-size: 16px;
  line-height: 18px;

  color: ${({ theme, secondary }) =>
    secondary ? theme.colors.secondaryText : theme.colors.primaryText};
`;

export const TextSmall = styled(Text)<TypographyProps>`
  font-size: 14px;
  line-height: 16px;
`;
