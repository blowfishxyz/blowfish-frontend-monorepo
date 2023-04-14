import React from 'react'
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
    src: url("/fonts/GT-Planar-Medium.woff2") format("woff2");
    font-weight: 500;
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

