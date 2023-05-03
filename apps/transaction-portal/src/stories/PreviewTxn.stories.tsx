import React from "react";
import { Meta, Story } from "@storybook/react";
import PreviewTxn, { PreviewTxnProps } from "~components/cards/PreviewTxn";
import {
  dummySignatureData,
  dummyTxnSimulationData,
  SignatureDataType,
  TxnSimulationDataType,
} from "~components/simulation-results-types/mock-data";

export default {
  title: "Components/PreviewTxn",
  component: PreviewTxn,
} as Meta;

const Template: Story<PreviewTxnProps> = (args) => <PreviewTxn {...args} />;

const signatureData: SignatureDataType[] = dummySignatureData;

const txnSimulationData: TxnSimulationDataType[] = dummyTxnSimulationData;

export const Transaction = Template.bind({});
Transaction.args = {
  simulationType: "transaction",
  txnSimulationData,
};

export const Signature = Template.bind({});
Signature.args = {
  simulationType: "signature",
  signatureData,
};
