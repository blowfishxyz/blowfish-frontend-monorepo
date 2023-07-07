import { css } from "styled-components";
import type { Properties } from "csstype";

export type Position = {
  position?: Properties["position"];
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;
  absoluteCentered?: "both" | "vertical" | "horizontal";
};

export function position(props: Position) {
  const rules = [];

  if (props.position) {
    rules.push(css`
      position: ${props.position};
    `);
  }
  if (props.zIndex !== undefined) {
    rules.push(css`
      z-index: ${props.zIndex};
    `);
  }
  if (props.absoluteCentered !== undefined) {
    if (props.absoluteCentered === "both") {
      rules.push(css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `);
    }
    if (props.absoluteCentered === "vertical") {
      rules.push(css`
        top: 50%;
        transform: translateY(-50%);
      `);
    }
    if (props.absoluteCentered === "horizontal") {
      rules.push(css`
        left: 50%;
        transform: translateX(-50%);
      `);
    }
    return rules;
  }
  if (props.top !== undefined) {
    rules.push(css`
      top: ${props.top}px;
    `);
  }
  if (props.left !== undefined) {
    rules.push(css`
      left: ${props.left}px;
    `);
  }
  if (props.right !== undefined) {
    rules.push(css`
      right: ${props.right}px;
    `);
  }
  if (props.bottom !== undefined) {
    rules.push(css`
      bottom: ${props.bottom}px;
    `);
  }

  return rules;
}
