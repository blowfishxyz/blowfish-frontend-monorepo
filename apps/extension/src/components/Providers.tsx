import { ThemeProvider } from "@blowfishxyz/ui";
import React from "react";
import { SWRConfig } from "swr";

// NOTE: All global providers should be added here
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider mode="light">
      <SWRConfig>{children}</SWRConfig>
    </ThemeProvider>
  );
};
