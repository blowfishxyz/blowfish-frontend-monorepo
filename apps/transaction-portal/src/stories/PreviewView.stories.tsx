import React from "react";
import { Meta, Story } from "@storybook/react";
import { PendingView } from "~components/txn-views/PendingView";

export default {
  title: "Components/PendingView",
  component: PendingView,
} as Meta;

const Template: Story = () => (
  <PendingView onReport={() => Promise.resolve()} txHash="" />
);

export const Default = Template.bind({});
