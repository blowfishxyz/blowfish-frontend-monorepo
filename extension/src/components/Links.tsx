import React from "react";
import styled from "styled-components";

import { ArrowIcon } from "./icons/ArrowIcon";

import type { ChainFamily, ChainNetwork } from "../utils/BlowfishApiClient";

const SyledArrowIcon = styled(ArrowIcon)`
  margin-left: 4px;
`;

export const UnstyledA = styled.a`
  text-decoration: none;
`;

export const A = styled(UnstyledA)`
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

interface BlockExplorerLinkProps extends Omit<LinkWithArrowProps, "href"> {
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  address: string;
  nftTokenId?: string;
}
export const BlockExplorerLink: React.FC<BlockExplorerLinkProps> = ({
  chainFamily,
  chainNetwork,
  address,
  nftTokenId,
  ...props
}) => {
  // TODO(kimpers): move to util?
  const prefix = chainNetwork == "mainnet" ? "" : `${chainFamily}.`;
  let url: string;
  if (chainFamily === "polygon") {
    url = `https://${prefix}polygonscan.com/address/${address}`;
  } else {
    // NOTE(kimpers): Etherscan has a more sophisticated NFT view which we can link to
    const assetType = nftTokenId ? "nft" : "address";
    url = `https://${prefix}etherscan.io/${assetType}/${address}${
      nftTokenId ? `/${nftTokenId}` : ""
    }`;
  }

  return <LinkWithArrow href={url} {...props} />;
};
