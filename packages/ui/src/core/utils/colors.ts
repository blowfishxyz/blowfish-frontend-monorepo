import { css } from "styled-components";
import { ThemeBackgroundColors, ThemeForegroundColors } from "../theme";

export type Colors = {
  backgroundColor?: ThemeBackgroundColors;
  color?: ThemeForegroundColors;
};

export function colors(props: Colors) {
  const rules = [];

  if (props.backgroundColor) {
    const { backgroundColor } = props;
    rules.push(css`
      background-color: ${(p) => p.theme.colors[backgroundColor]};
    `);
  }
  if (props.color) {
    const { color } = props;
    rules.push(css`
      color: ${(p) => p.theme.colors[color]};
    `);
  }

  return rules;
}
