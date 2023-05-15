import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ProtectHeader from "~components/ProtectHeader";

export default {
  title: "Components/ProtectHeader",
  component: ProtectHeader,
} as Meta;

const Template: Story = (args) => <ProtectHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};
