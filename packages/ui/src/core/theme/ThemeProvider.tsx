// import React from "react";
// import { ThemeProvider } from "styled-components";
// import { themes } from "./core/theme";

// export const withThemeProvider =
//   (Component: React.ComponentType<any>) => (props: any) => {
//     return (
//       <ThemeProvider theme={themes.light}>
//         <Component {...props} />
//       </ThemeProvider>
//     );
//   };

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes} from '.';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <StyledThemeProvider theme={themes.light}>
      {children}
    </StyledThemeProvider>
  );
};