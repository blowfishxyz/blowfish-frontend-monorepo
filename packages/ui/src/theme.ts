type Severity = "CRITICAL" | "WARNING" | "INFO";

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
    backgroundV2: "#ED6A5E",
  },
  WARNING: {
    background: "#FFD567",
    backgroundLight: "#FFFCF2",
    backgroundV2: "#FBBD4D",
  },
  INFO: {
    background: "#EFEFEF",
    backgroundLight: "#FFFFFF",
    backgroundV2: "#EFEFEF",
  },
};

const base = {
  base10: "rgba(0, 0, 0, 0.1)",
  base30: "rgba(0, 0, 0, 0.3)",
  base40: "rgba(0, 0, 0, 0.4)",
  base50: "rgba(0, 0, 0, 0.5)",
  base75: "rgba(0, 0, 0, 0.75)",
  base100: "rgb(0, 0, 0)",
};

const backgroundColors = {
  backgroundPrimary: "#FFFFFF",
  backgroundSecondary: "#EFEFEF",
};

const foregroundColors = {
  foregroundPrimary: "#000000",
  foregroundSecondary: base.base50,
  foregroundContrast: "#FFFFFF",
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

export type ThemeBackgroundColor =
  | keyof typeof backgroundColors
  | keyof typeof actionColors
  | keyof typeof base;
export type ThemeForegroundColor =
  | keyof typeof foregroundColors
  | keyof typeof actionColors
  | keyof typeof base;

export type ITheme = typeof lightTheme;

const themes = {
  light: lightTheme,
};

export { themes };
