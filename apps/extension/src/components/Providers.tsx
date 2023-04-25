import React from "react";
import { SWRConfig } from "swr";

import { ThemeProvider } from "../theme";

// NOTE: All global providers should be added here
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <SWRConfig>{children}</SWRConfig>
    </ThemeProvider>
  );
};
