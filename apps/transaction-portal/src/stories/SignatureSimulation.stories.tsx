import React from "react";
import { Meta, Story } from "@storybook/react";
import { dummySignatureData } from "~components/simulation-results-types/mock-data";
import SignatureSimulation, {
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
  data: dummySignatureData[0],
};
