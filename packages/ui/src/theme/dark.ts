import {
  ITheme,
  breakpoints,
  generateMediaQueries,
  grids,
  severityColors,
  typography,
} from "~/theme/common";

const base = {
  base10: "rgba(255, 255, 255, 0.1)",
  base30: "rgba(255, 255, 255, 0.3)",
  base40: "rgba(255, 255, 255, 0.4)",
  base50: "rgba(255, 255, 255, 0.5)",
  base75: "rgba(255, 255, 255, 0.75)",
  base100: "rgb(255, 255, 255)",
};

const backgroundColors = {
  backgroundPrimary: "#111214",
  backgroundSecondary: "#242629",
};

const foregroundColors = {
  foregroundPrimary: "#FFFFFF",
  foregroundSecondary: "#898B8F",
  foregroundContrast: "#111214",
  foregroundDanger: "#FF6332",
};
const actionColors = {
  danger: "rgb(255, 61, 0)",
  dangerLight: "rgba(255, 61, 0, 0.24)",
  warning: "#FFB800",
  success: "rgb(0, 191, 54)",
  successLight: "rgba(0, 191, 54, 0.24)",
};

export const dark: ITheme = {
  colors: {
    ...base,
    border: base.base10,
    ...backgroundColors,
    ...foregroundColors,
    ...actionColors,
  },
  typography,
  severityColors,
  grids,
  mediaQueries: generateMediaQueries(breakpoints),
};
