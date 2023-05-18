import { css } from "styled-components";
import type { Properties } from "csstype";

export type Size = {
  width?: Properties["width"] | number;
  height?: Properties["height"] | number;
  maxWidth?: Properties["maxWidth"] | number;
  maxHeight?: Properties["maxHeight"] | number;
};

export function size(props: Size) {
  const rules = [];
  if (props.width) {
    rules.push(css`
      width: ${normalizeProp(props.width)};
    `);
  }
  if (props.height) {
    rules.push(css`
      height: ${normalizeProp(props.height)};
    `);
  }
  if (props.maxWidth) {
    rules.push(css`
      max-width: ${normalizeProp(props.maxWidth)};
    `);
  }
  if (props.maxHeight) {
    rules.push(css`
      max-height: ${normalizeProp(props.maxHeight)};
    `);
  }

  return rules;
}

function normalizeProp<T>(prop: T | number) {
  if (typeof prop === "number") {
    return `${prop}px`;
  }
  return prop;
}
