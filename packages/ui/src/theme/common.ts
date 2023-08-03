export type Severity = "CRITICAL" | "WARNING" | "INFO";

export type SeverityColors = {
  [key in Severity]: {
    [k in "background" | "backgroundLight" | "backgroundV2"]: string;
  };
};

export const severityColors: SeverityColors = {
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

// Based on webflow's breakpoints
export const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

type BreakPointType = typeof breakpoints;

export const generateMediaQueries = (points: BreakPointType) => ({
  sm: `(min-width: ${points.sm})`,
  md: `(min-width: ${points.md})`,
  lg: `(min-width: ${points.lg})`,
  xl: `(min-width: ${points.xl})`,
  hover: "(hover: hover)",
});

type MediaQueries = ReturnType<typeof generateMediaQueries>;

export const grids = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "24px",
  xl: "32px",
};

type Grids = typeof grids;

export const typography = {
  fontFamily: "GT-Planar",
};

type Typography = typeof typography;

type BaseColors = {
  base10: string;
  base30: string;
  base40: string;
  base50: string;
  base75: string;
  base100: string;
};

type BackgroundColors = {
  backgroundPrimary: string;
  backgroundSecondary: string;
};

type ForegroundColors = {
  foregroundPrimary: string;
  foregroundSecondary: string;
  foregroundContrast: string;
  foregroundDanger: string;
};

type ActionColors = {
  danger: string;
  dangerLight: string;
  warning: string;
  success: string;
  successLight: string;
};

type BorderColors = {
  border: string;
};

export type ThemeBackgroundColor =
  | keyof BackgroundColors
  | keyof ActionColors
  | keyof BaseColors;
export type ThemeForegroundColor =
  | keyof ForegroundColors
  | keyof ActionColors
  | keyof BaseColors;

type ThemeColors = BaseColors &
  ForegroundColors &
  BackgroundColors &
  BorderColors &
  ActionColors;

export type ITheme = {
  typography: Typography;
  colors: ThemeColors;
  severityColors: SeverityColors;
  grids: Grids;
  mediaQueries: MediaQueries;
};
