import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  SignatureSimulation,
  SignatureSimulationProps,
} from "~components/simulation-results-types/SignatureSimulation";

export default {
  title: "SignatureSimulation",
  component: SignatureSimulation,
} as Meta;

const Template: Story<SignatureSimulationProps> = (args) => (
  <SignatureSimulation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    imageUrl: "",
    dappUrl: new URL("https://www.blur.io"),
    message: "Sign in to Blur",
    state: "No state changes found. Proceed with caution",
    account: "0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
  },
};
