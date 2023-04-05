import React from "react";
import {
  chainToBlockExplorerUrl,
  BlockExplorerUrlOptions,
} from "@blowfish/utils/chains";

import { ArrowIcon } from "../icons";
import { defaultStyled } from "../styled";

const SyledArrowIcon = defaultStyled(ArrowIcon)`
  margin-left: 4px;
`;

export const UnstyledA = defaultStyled.a`
  text-decoration: none;
`;

export const A = defaultStyled(UnstyledA)`
  color: ${(props) => props.theme.colors.primaryText};
`;

interface LinkWithArrowProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  href: string;
}

export const LinkWithArrow: React.FC<LinkWithArrowProps> = ({
  className,
  style,
  href,
  children,
}) => (
  <A
    className={className}
    style={style}
    href={href}
    target="_blank"
    rel="noopener"
  >
    {children}
    <SyledArrowIcon />
  </A>
);

interface BlockExplorerLinkProps
  extends Omit<LinkWithArrowProps, "href">,
    BlockExplorerUrlOptions {}

export const BlockExplorerLink: React.FC<BlockExplorerLinkProps> = ({
  chainFamily,
  chainNetwork,
  address,
  nftTokenId,
  ...props
}) => {
  const url = chainToBlockExplorerUrl({
    chainFamily,
    chainNetwork,
    address,
    nftTokenId,
  });
  return <LinkWithArrow href={url} {...props} />;
};
