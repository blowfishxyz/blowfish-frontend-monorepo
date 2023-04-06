import React from "react";
import {
  chainToBlockExplorerUrl,
  BlockExplorerUrlOptions,
} from "@blowfish/utils/chains";

import { ArrowIcon } from "../icons";
import { styled } from "styled-components";

const SyledArrowIcon = styled(ArrowIcon)`
  margin-left: 4px;
`;

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
  color: ${(props) => props.theme.colors.primaryText};
`;

interface LinkWithArrowProps
  extends React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  > {
  className?: string;
  style?: React.CSSProperties;
  href: string;
}

export const LinkWithArrow = React.forwardRef<
  HTMLAnchorElement,
  LinkWithArrowProps
>(({ className, style, href, children }, ref) => (
  <A
    className={className}
    style={style}
    href={href}
    target="_blank"
    rel="noopener"
    ref={ref}
  >
    {children}
    <SyledArrowIcon />
  </A>
));

LinkWithArrow.displayName = "LinkWithArrow";

interface BlockExplorerLinkProps
  extends Omit<LinkWithArrowProps, "href">,
    BlockExplorerUrlOptions {}

export const BlockExplorerLink = React.forwardRef<
  HTMLAnchorElement,
  BlockExplorerLinkProps
>(({ chainFamily, chainNetwork, address, nftTokenId, ...props }, ref) => {
  const url = chainToBlockExplorerUrl({
    chainFamily,
    chainNetwork,
    address,
    nftTokenId,
  });
  return <LinkWithArrow ref={ref} href={url} {...props} />;
});

BlockExplorerLink.displayName = "BlockExplorerLink";
