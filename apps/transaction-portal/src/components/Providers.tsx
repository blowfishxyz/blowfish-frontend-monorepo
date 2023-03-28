import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global";

import { themes } from "../styles/theme";

// NOTE: All global providers relevant to both Storybook & the tx portal
// should be added here
export const BaseProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
