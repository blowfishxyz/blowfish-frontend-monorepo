import { css } from "styled-components";
import type { Properties } from "csstype";
import { normalizePxProp } from "./normalizePxProp";

export type Border = {
  borderRadius?: Properties["borderRadius"] | number;
  // TODO: support borderWidth / borderColor if necessary
  withBorder?: boolean;
};

export function border(props: Border) {
  const rules = [];
  if (props.borderRadius) {
    rules.push(css`
      border-radius: ${normalizePxProp(props.borderRadius)};
    `);
  }
  if (props.withBorder) {
    rules.push(css`
      border: 1px solid ${(p) => p.theme.colors.border};
    `);
  }

  return rules;
}
