import React from "react";
import type { Preview } from "@storybook/react";
import type { StoryFn as StoryType } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../src/core/global";
import { themes } from "../src/core/theme";

export const preview: Preview = {
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
