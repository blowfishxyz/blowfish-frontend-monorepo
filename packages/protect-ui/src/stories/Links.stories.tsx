import React from "react";
import { LinkWithArrow, BlockExplorerLink } from "../core";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Links",
} as Meta;

const LinkWithArrowTemplate: Story<
  React.PropsWithChildren<React.ComponentProps<typeof LinkWithArrow>>
> = (args) => <LinkWithArrow {...args}>Visit our website</LinkWithArrow>;

export const DefaultLinkWithArrow = LinkWithArrowTemplate.bind({});
DefaultLinkWithArrow.args = {
  href: "https://www.example.com",
};

const BlockExplorerLinkTemplate: Story<
  React.PropsWithChildren<React.ComponentProps<typeof BlockExplorerLink>>
> = (args) => (
  <BlockExplorerLink {...args}>View on Block Explorer</BlockExplorerLink>
);

export const DefaultBlockExplorerLink = BlockExplorerLinkTemplate.bind({});
DefaultBlockExplorerLink.args = {
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
  address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  nftTokenId: "0",
};
