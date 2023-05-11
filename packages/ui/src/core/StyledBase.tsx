import shouldForwardProp from "@emotion/is-prop-valid";
import React from "react";
import { styled } from "styled-components";
import { Spacing, spacing } from "./utils/spacing";

const StyledBaseDivComponent = styled.div.withConfig({
  shouldForwardProp,
})<Spacing>`
  ${spacing}
`;
const StyledBaseTextComponent = styled.span.withConfig({
  shouldForwardProp,
})<Spacing>`
  ${spacing}
`;
const StyledBaseSvgComponent = styled.svg.withConfig({
  shouldForwardProp,
})<Spacing>`
  ${spacing}
`;

export type StyledBaseProps<T> = T &
  Spacing & { as?: keyof JSX.IntrinsicElements };

const StyledBaseDiv = React.memo(
  React.forwardRef<
    HTMLDivElement,
    StyledBaseProps<React.HTMLAttributes<HTMLDivElement>>
  >((props, ref) => <StyledBaseDivComponent ref={ref} {...props} />)
);

const StyledBaseText = React.memo(
  React.forwardRef<
    HTMLSpanElement,
    StyledBaseProps<React.HTMLAttributes<HTMLSpanElement>>
  >((props, ref) => <StyledBaseTextComponent ref={ref} {...props} />)
);

const StyledBaseSvg = React.forwardRef<
  SVGSVGElement,
  StyledBaseProps<React.HTMLAttributes<SVGSVGElement>>
>((props, ref) => <StyledBaseSvgComponent ref={ref} {...props} />);

export { StyledBaseDiv, StyledBaseText, StyledBaseSvg };
