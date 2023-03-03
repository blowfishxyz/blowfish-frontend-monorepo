import { lighten } from "polished";

import { opacify } from "~utils/utils";

import type { Severity } from "./types";

const palette = {
  warningBackground: "#FFFCF2",
  blockBackground: "#FFFAFA",
  border: "#D9D9D9",
  warningText: "#FF6332",
  white: "#FFF",
  black: "#000",
  gray: "#00000080",
  red: "#FF3D00",
  yellow: "#FFB800",
  green: "#00BF36",
};

// Based on webflow's breakpoints
const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

type BreakPointType = typeof breakpoints;

const generateMediaQueries = (points: BreakPointType) => ({
  sm: `(min-width: ${points.sm})`,
  md: `(min-width: ${points.md})`,
  lg: `(min-width: ${points.lg})`,
  xl: `(min-width: ${points.xl})`,
  hover: "(hover: hover)",
});

// Based on Bootstrap z-indexes
const zIndices = {
  sticky: 1020,
  fixed: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

const fontWeights = {
  h1: 500,
  normal: 400,
  semiBold: 500,
};

const opacities = {
  secondaryText: 0.5,
};

const contextBackgroundColors: { [key in Severity]: string } = {
  CRITICAL: "#FFC1AD",
  WARNING: "#FFD567",
  INFO: "#EFF2F0",
};

const lightTheme = {
  zIndices,
  fontWeights,
  breakpoints,
  palette: {
    ...palette,
    lightGreen: opacify(24, palette.green),
  },
  contextBackgroundColors,
  colors: {
    primaryText: palette.black,
    secondaryText: lighten(opacities.secondaryText, palette.black),
  },
  mediaQueries: generateMediaQueries(breakpoints),
};

export type ITheme = typeof lightTheme;

const themes = {
  light: lightTheme,
};

export { themes };
