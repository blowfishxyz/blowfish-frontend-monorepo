import React from "react";
import { Meta, Story } from "@storybook/react";
import { ConfirmTxn } from "~components/cards/ConfirmTxn";

export default {
  title: "Components/ConfirmTxn",
  component: ConfirmTxn,
} as Meta;

const Template: Story = (args) => <ConfirmTxn {...args} />;

export const Default = Template.bind({});
Default.args = {};
