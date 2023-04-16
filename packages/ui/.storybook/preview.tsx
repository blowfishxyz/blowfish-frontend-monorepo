import React from "react";
import type { StoryFn as StoryType } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { ThemeProvider } from "styled-components";

import { themes } from "../src/core/theme";

import { createGlobalStyle } from "styled-components";

type GlobalStyleProps = {};

const GlobalStyle: React.NamedExoticComponent<GlobalStyleProps> = createGlobalStyle`
  body {
    font-family: "GT-Planar", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Black.woff2") format("woff2");
    font-weight: 900;
    font-style: normal;
  }
`;

export const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle,
  }),
  (Story: StoryType) => (
    <ThemeProvider theme={themes.light}>
      <Story />
    </ThemeProvider>
  ),
];
