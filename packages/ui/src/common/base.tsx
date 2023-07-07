import shouldForwardProp from "@emotion/is-prop-valid";
import { size } from "@floating-ui/react";
import React from "react";
import { styled } from "styled-components";
import { Size } from "~/utils/size";
import { Spacing, spacing } from "~/utils/spacing";

const StyledBaseDivComponent = styled.div.withConfig({
  shouldForwardProp,
})<Spacing & Size>`
  ${spacing}
  ${size}
`;
const StyledBaseTextComponent = styled.span.withConfig({
  shouldForwardProp,
})<Spacing & Size>`
  ${spacing}
  ${size}
`;

export type StyledBaseProps<T> = T &
  Spacing &
  Size & { as?: keyof JSX.IntrinsicElements };

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

export { StyledBaseDiv, StyledBaseText };
