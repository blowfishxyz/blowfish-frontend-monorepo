import styled, { DefaultTheme } from "styled-components";

type Gap = keyof DefaultTheme["grids"];

const Row = styled.div<{
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  gap?: Gap;
}>`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding};
  gap: ${({ gap, theme }) => gap && theme.grids[gap]};
`;

export default Row;
