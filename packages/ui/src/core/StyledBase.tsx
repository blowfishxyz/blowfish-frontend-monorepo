import shouldForwardProp from "@emotion/is-prop-valid";
import React from "react";
import { styled } from "styled-components";

const StyledDivComponent = styled.div.withConfig({ shouldForwardProp })``;
const StyledSpanComponent = styled.span.withConfig({ shouldForwardProp })``;

const StyledDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <StyledDivComponent ref={ref} {...props} />);

const StyledSpan = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => <StyledSpanComponent ref={ref} {...props} />);

export { StyledDiv, StyledSpan };
