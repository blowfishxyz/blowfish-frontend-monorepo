import { memo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { light } from "~/theme/light";
import { dark } from "~/theme/dark";
import type { ITheme } from "~/theme/common";
import { createGlobalStyle } from "styled-components";

const GlobalStyle: React.NamedExoticComponent<{}> = createGlobalStyle`
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Italic-15-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Italic-15-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Italic-15-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Italic-15-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Italic-15-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("./fonts/GT-Planar-Black.woff2") format("woff2");
    font-weight: 900;
    font-style: normal;
  }
`;

type StyledProviderProps = React.ComponentProps<typeof StyledThemeProvider>;

type ThemeProviderProps = Omit<StyledProviderProps, "theme"> & {
  customTheme?: ITheme;
  mode?: "light" | "dark";
};

export const ThemeProvider: React.FC<ThemeProviderProps> = memo(
  function ThemeProvider({ mode = "light", customTheme, children }) {
    return (
      <StyledThemeProvider
        theme={customTheme || (mode === "dark" ? dark : light)}
      >
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    );
  }
);
