import React, { PropsWithChildren } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { themes } from "./themes";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledThemeProvider theme={themes.light}>{children}</StyledThemeProvider>
  );
};
