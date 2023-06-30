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

const AComponent = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <UnstyledA ref={ref} {...props}>
    {children}
  </UnstyledA>
));

export const A = styled(AComponent)`
  color: ${(props) => props.theme.colors.foregroundPrimary};
`;

export interface LinkWithArrowProps
  extends React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  > {
  className?: string;
  style?: React.CSSProperties;
  href: string;
  hideArrow?: boolean;
}
