import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  div#root,
  div#__next {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    font-family: "GT-Planar", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    position: relative;
    min-height: 100vh;
    scroll-behavior: smooth;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Italic-15-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Italic-15-Bold.woff2") format("woff2");
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Italic-15-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Italic-15-Thin.woff2") format("woff2");
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Italic-15-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: "GT-Planar";
    font-display: swap;
    src: url("/fonts/GT-Planar-Black.woff2") format("woff2");
    font-weight: 900;
    font-style: normal;
  }
`;
