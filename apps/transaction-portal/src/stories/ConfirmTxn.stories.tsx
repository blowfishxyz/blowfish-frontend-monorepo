import React from "react";
import { Story, Meta } from "@storybook/react";
import { ConfirmTxn, ConfirmTxnProps } from "~components/cards/ConfirmTxn";

export default {
  title: "Components/ConfirmTxn",
  component: ConfirmTxn,
} as Meta;

const Template: Story<ConfirmTxnProps> = (args) => <ConfirmTxn {...args} />;

export const Default = Template.bind({});
Default.args = {
  onContinue: async () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
};
