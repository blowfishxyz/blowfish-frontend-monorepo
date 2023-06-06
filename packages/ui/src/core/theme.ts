import type { Severity } from "@blowfish/utils/types";

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

const grids = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "24px",
  xl: "32px",
};

const severityColors: {
  [key in Severity]: {
    [k in "background" | "backgroundLight" | "backgroundV2"]: string;
  };
} = {
  CRITICAL: {
    background: "#FFC1AD",
    backgroundLight: "#FFFAFA",
    backgroundV2: "#E96357",
  },
  WARNING: {
    background: "#FFD567",
    backgroundLight: "#FFFCF2",
    backgroundV2: "#FBBD4D",
  },
  INFO: {
    background: "#EFF2F0",
    backgroundLight: "#FFFFFF",
    backgroundV2: "#00B94A",
  },
};

const base = {
  base10: "rgba(0, 0, 0, 0.1)",
  base30: "rgba(0, 0, 0, 0.3)",
  base50: "rgba(0, 0, 0, 0.5)",
  base100: "rgb(0, 0, 0)",
};

const backgroundColors = {
  backgroundPrimary: "#FFFFFF",
  backgroundSecondary: "#F8F8F8",
};

const foregroundColors = {
  foregroundPrimary: "#000000",
  foregroundSecondary: base.base50,
  foregroundDanger: "#FF6332",
  foregroundSecondaryLight: "#FFFFFFCC",
};
const actionColors = {
  danger: "rgb(255, 61, 0)",
  dangerLight: "rgba(255, 61, 0, 0.24)",
  warning: "#FFB800",
  success: "rgb(0, 191, 54)",
  successLight: "rgba(0, 191, 54, 0.24)",
};

const lightTheme = {
  colors: {
    ...base,
    border: base.base10,
    ...backgroundColors,
    ...foregroundColors,
    ...actionColors,
  },
  severityColors,
  grids,
  mediaQueries: generateMediaQueries(breakpoints),
};

export type ThemeBackgroundColors =
  | keyof typeof backgroundColors
  | keyof typeof base;
export type ThemeForegroundColors =
  | keyof typeof foregroundColors
  | keyof typeof actionColors;

export type ITheme = typeof lightTheme;

const themes = {
  light: lightTheme,
};

export { themes };
