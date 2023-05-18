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
  [key in Severity]: { [k in "background" | "backgroundLight"]: string };
} = {
  CRITICAL: {
    background: "#FFC1AD",
    backgroundLight: "#FFFAFA",
  },
  WARNING: {
    background: "#FFD567",
    backgroundLight: "#FFFCF2",
  },
  INFO: {
    background: "#EFF2F0",
    backgroundLight: "#FFFFFF",
  },
};

const base = {
  base10: "rgba(0, 0, 0, 0.1)",
  base30: "rgba(0, 0, 0, 0.3)",
  base50: "rgba(0, 0, 0, 0.5)",
  base100: "rgb(0, 0, 0)",
};

const lightTheme = {
  colors: {
    ...base,
    border: base.base10,
    backgroundPrimary: "#FFFFFF",
    foregroundPrimary: "#000000",
    foregroundSecondary: base.base50,
    foregroundDanger: "#FF6332",
    danger: "#FF3D00",
    warning: "#FFB800",
    success: "rgb(0, 191, 54)",
    successLight: "rgba(0, 191, 54, 0.24)",
  },
  severityColors,
  grids,
  mediaQueries: generateMediaQueries(breakpoints),
};

export type ITheme = typeof lightTheme;

const themes = {
  light: lightTheme,
};

export { themes };
