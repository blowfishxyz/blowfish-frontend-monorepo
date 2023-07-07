import { css } from "styled-components";
import type { Properties } from "csstype";
import { normalizePxProp } from "./normalizePxProp";

export type Size = {
  width?: Properties["width"] | number;
  height?: Properties["height"] | number;
  maxWidth?: Properties["maxWidth"] | number;
  maxHeight?: Properties["maxHeight"] | number;
  minWidth?: Properties["minWidth"] | number;
  minHeight?: Properties["minHeight"] | number;
};

export function size(props: Size) {
  const rules = [];
  if (props.width !== undefined) {
    rules.push(css`
      width: ${normalizePxProp(props.width)};
    `);
  }
  if (props.height !== undefined) {
    rules.push(css`
      height: ${normalizePxProp(props.height)};
    `);
  }
  if (props.maxWidth !== undefined) {
    rules.push(css`
      max-width: ${normalizePxProp(props.maxWidth)};
    `);
  }
  if (props.maxHeight !== undefined) {
    rules.push(css`
      max-height: ${normalizePxProp(props.maxHeight)};
    `);
  }
  if (props.minWidth !== undefined) {
    rules.push(css`
      min-width: ${normalizePxProp(props.minWidth)};
    `);
  }
  if (props.minHeight !== undefined) {
    rules.push(css`
      min-height: ${normalizePxProp(props.minHeight)};
    `);
  }

  return rules;
}
