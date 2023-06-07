import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  SignatureSimulation,
  SignatureSimulationProps,
} from "~components/simulation-results/SignatureSimulation";

export default {
  title: "SignatureSimulation",
  component: SignatureSimulation,
} as Meta;

const Template: Story<SignatureSimulationProps> = (args) => (
  <SignatureSimulation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageUrl: undefined,
  message: "Sign in to Blur",
};
