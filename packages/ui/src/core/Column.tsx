import React from "react";
import { styled, DefaultTheme } from "styled-components";

type Gap = keyof DefaultTheme["grids"];

const ColumnComponent = React.forwardRef<
  HTMLDivElement,
  {
    gap?: Gap;
    width?: string;
    flex?: number;
    alignItems?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ gap, width, flex, ...props }, ref) => <div ref={ref} {...props} />);

export const Column = styled(ColumnComponent).withConfig({
  shouldForwardProp: (prop) => prop !== "alignItems",
})`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({alignItems}) => alignItems};
  flex: ${({ flex }) => flex};
  gap: ${({ gap, theme }) => gap && theme.grids[gap]};
`;
