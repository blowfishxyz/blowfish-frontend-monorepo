import { css } from "styled-components";

export type Spacing = {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  margin?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  padding?: number;
};

export function spacing(props: Spacing) {
  const rules = [];
  if (props.margin !== undefined) {
    rules.push(
      css`
        margin: ${props.margin}px;
      `
    );
  }
  if (props.marginLeft !== undefined) {
    rules.push(
      css`
        margin-left: ${props.marginLeft}px;
      `
    );
  }
  if (props.marginRight !== undefined) {
    rules.push(
      css`
        margin-right: ${props.marginRight}px;
      `
    );
  }
  if (props.marginTop !== undefined) {
    rules.push(
      css`
        margin-top: ${props.marginTop}px;
      `
    );
  }
  if (props.marginBottom !== undefined) {
    rules.push(
      css`
        margin-bottom: ${props.marginBottom}px;
      `
    );
  }
  if (props.padding !== undefined) {
    rules.push(
      css`
        padding: ${props.padding}px;
      `
    );
  }
  if (props.paddingLeft !== undefined) {
    rules.push(
      css`
        padding-left: ${props.paddingLeft}px;
      `
    );
  }
  if (props.paddingRight !== undefined) {
    rules.push(
      css`
        padding-right: ${props.paddingRight}px;
      `
    );
  }
  if (props.paddingTop !== undefined) {
    rules.push(
      css`
        padding-top: ${props.paddingTop}px;
      `
    );
  }
  if (props.paddingBottom !== undefined) {
    rules.push(
      css`
        padding-bottom: ${props.paddingBottom}px;
      `
    );
  }
  return rules;
}
