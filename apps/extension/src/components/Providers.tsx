import React from "react";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import { themes } from "../theme";

// NOTE: All global providers should be added here
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={themes.light}>
      <SWRConfig>{children}</SWRConfig>
    </ThemeProvider>
  );
};
