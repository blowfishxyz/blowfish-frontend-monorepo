import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "~components/menu/Menu";

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta;

export const Default: Story = () => <Menu />;
