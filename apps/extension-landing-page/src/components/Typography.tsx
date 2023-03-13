import styled from "styled-components";

interface TypographyProps {
  className?: string;
  style?: React.CSSProperties;
  secondary?: boolean;
  semiBold?: boolean;
  color?: string;
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
  color: ${({ color }) => color ?? "#1D1C30"};
`;

export const TextSmall = styled(Text)<TypographyProps>`
  font-size: 14px;
  line-height: 16px;
`;
