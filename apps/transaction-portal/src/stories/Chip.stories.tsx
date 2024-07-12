import React from "react";
import { Meta, Story } from "@storybook/react";
import { Chip, ChipProps } from "~components/chips/Chip";

export default {
  title: "Components/Chip",
  component: Chip,
} as Meta;

const Template: Story<ChipProps> = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Default Chip",
};

export const Primary = Template.bind({});
Primary.args = {
  text: "Primary Chip",
  variant: "primary",
  $safeguard: false,
};
