import React from "react";
import { DefaultTheme, styled } from "styled-components";

type Gap = keyof DefaultTheme["grids"];

const RowComponent = React.forwardRef<
  HTMLDivElement,
  {
    width?: string;
    align?: string;
    justify?: string;
    padding?: string;
    gap?: Gap;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ width, align, justify, padding, gap, ...props }, ref) => (
  <div ref={ref} {...props} />
));

export const Row = styled(RowComponent)`
  display: flex;
  width: ${({ width }) => width ?? "100%"};
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding};
  gap: ${({ gap, theme }) => gap && theme.grids[gap]};
`;
