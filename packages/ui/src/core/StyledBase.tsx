import shouldForwardProp from "@emotion/is-prop-valid";
import React from "react";
import { styled } from "styled-components";

const StyledBaseDivComponent = styled.div.withConfig({ shouldForwardProp })``;
const StyledBaseTextComponent = styled.span.withConfig({ shouldForwardProp })``;
const StyledBaseSvgComponent = styled.svg.withConfig({ shouldForwardProp })``;

const StyledBaseDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <StyledBaseDivComponent ref={ref} {...props} />);

const StyledBaseText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => <StyledBaseTextComponent ref={ref} {...props} />);

const StyledBaseSvg = React.forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>((props, ref) => <StyledBaseSvgComponent ref={ref} {...props} />);

export { StyledBaseDiv, StyledBaseText, StyledBaseSvg };
