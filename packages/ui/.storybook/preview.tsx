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

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Italic-15-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "GT-Planar";
    src: url("/fonts/GT-Planar-Black.woff2") format("woff2");
    font-weight: 900;
    font-style: normal;
    font-display: swap;
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
