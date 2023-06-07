import React from "react";
import { Story, Meta } from "@storybook/react";
import { PreviewTxn, PreviewTxnProps } from "~components/cards/PreviewTxn";
import { sendErc721 } from "~components/fixtures/state-changes";

export default {
  title: "Components/PreviewTxn",
  component: PreviewTxn,
} as Meta;

const Template: Story<PreviewTxnProps> = (args) => <PreviewTxn {...args} />;

export const TransactionPreview = Template.bind({});
TransactionPreview.args = {
  txnData: {
    data: [sendErc721],
    message: undefined,
    dappUrl: new URL("https://www.blur.io"),
    account: "0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
  },
  onContinue: () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
};

export const SignaturePreview = Template.bind({});
SignaturePreview.args = {
  txnData: {
    account: "0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
    dappUrl: new URL("https://www.blur.io"),
    message: "Sign in to Blur",
    data: undefined,
  },
  onContinue: () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
};
