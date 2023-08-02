import React from "react";
import { createGlobalStyle } from "styled-components";
import type { StoryFn as StoryType, StoryContext } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";

import { ThemeProvider, light, dark } from "../src/theme";

type GlobalStyleProps = {};

const GlobalStyles: React.NamedExoticComponent<GlobalStyleProps> = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
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
    themes: {
      light,
      dark,
    },
    defaultTheme: "light",
    GlobalStyles,
  }),
  withTheme,
];

function withTheme(Story: StoryType, context: StoryContext) {
  const { theme } = context.globals;

  return (
    <ThemeProvider mode={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
}
