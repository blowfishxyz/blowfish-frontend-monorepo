import {
  ITheme,
  breakpoints,
  generateMediaQueries,
  grids,
  severityColors,
} from "~/theme/common";

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
};

const actionColors = {
  danger: "rgb(255, 61, 0)",
  dangerLight: "rgba(255, 61, 0, 0.24)",
  warning: "#FFB800",
  success: "rgb(0, 191, 54)",
  successLight: "rgba(0, 191, 54, 0.24)",
};

export const light: ITheme = {
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
