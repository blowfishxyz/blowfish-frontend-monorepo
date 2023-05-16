import { DefaultTheme, css } from "styled-components";
import type { Properties } from "csstype";

export type Flexbox = {
  alignItems?: Properties["alignItems"];
  alignContent?: Properties["alignContent"];
  justifyItems?: Properties["justifyItems"];
  justifyContent?: Properties["justifyContent"];
  flexWrap?: Properties["flexWrap"];
  flexDirection?: Properties["flexDirection"];
  gap?: keyof DefaultTheme["grids"];
  // item
  flex?: Properties["flex"];
  flexGrow?: Properties["flexGrow"];
  flexShrink?: Properties["flexShrink"];
  //   flexBasis: Properties["flexBasis"];
  //   justifySelf: Properties["justifySelf"];
  //   alignSelf: Properties["alignSelf"];
  //   order: Properties["order"];
};

export function flexbox(props: Flexbox) {
  const rules = [
    css`
      display: flex;
    `,
  ];
  if (props.alignItems !== undefined) {
    rules.push(
      css`
        align-items: ${props.alignItems};
      `
    );
  }
  if (props.alignContent !== undefined) {
    rules.push(
      css`
        align-content: ${props.alignContent};
      `
    );
  }
  if (props.justifyItems !== undefined) {
    rules.push(
      css`
        justify-items: ${props.justifyItems};
      `
    );
  }
  if (props.flexWrap !== undefined) {
    rules.push(
      css`
        flex-wrap: ${props.flexWrap};
      `
    );
  }
  if (props.flexDirection !== undefined) {
    rules.push(
      css`
        flex-direction: ${props.flexDirection};
      `
    );
  }
  if (props.flex !== undefined) {
    rules.push(
      css`
        flex: ${props.flex};
      `
    );
  }
  if (props.flexGrow !== undefined) {
    rules.push(
      css`
        flex-grow: ${props.flexGrow};
      `
    );
  }
  if (props.flexShrink !== undefined) {
    rules.push(
      css`
        flex-shrink: ${props.flexShrink};
      `
    );
  }
  const gap = props.gap;
  if (gap !== undefined) {
    rules.push(
      css`
        gap: ${(p) => p.theme.grids[gap]};
      `
    );
  }
  return rules;
}
