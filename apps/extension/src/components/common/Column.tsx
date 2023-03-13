import styled, { DefaultTheme } from "styled-components";

type Gap = keyof DefaultTheme["grids"];

export const Column = styled.div<{
  gap?: Gap;
  width?: string;
  flex?: number;
}>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: ${({ flex }) => flex};
  gap: ${({ gap, theme }) => gap && theme.grids[gap]};
`;
