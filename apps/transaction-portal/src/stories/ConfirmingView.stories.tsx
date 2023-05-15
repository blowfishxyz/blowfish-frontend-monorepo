import React from "react";
import { Meta, Story } from "@storybook/react";
import ConfirmingView from "~components/txn-views/ConfirmingView";

export default {
  title: "Components/ConfirmingView",
  component: ConfirmingView,
} as Meta;

const Template: Story = () => <ConfirmingView />;

export const Default = Template.bind({});
