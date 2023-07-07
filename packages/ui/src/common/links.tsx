import React from "react";
import { styled } from "styled-components";

const UnstyledAComponent = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <a ref={ref} {...props}>
    {children}
  </a>
));

export const UnstyledA = styled(UnstyledAComponent)`
  text-decoration: none;
`;

const AnchorComponent = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <UnstyledA ref={ref} {...props}>
    {children}
  </UnstyledA>
));

export const Anchor = styled(AnchorComponent)`
  color: ${(props) => props.theme.colors.foregroundPrimary};
`;
