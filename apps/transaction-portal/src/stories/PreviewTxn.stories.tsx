import React from "react";
import { Story, Meta } from "@storybook/react";
import { PreviewTxn, PreviewTxnProps } from "~components/cards/PreviewTxn";
import { transactionNoActionScanResult } from "@blowfishxyz/api-client/fixtures";
import { CardContent } from "~components/cards/common";
import { Text, Row } from "@blowfishxyz/ui";
import { ArrowDownIcon } from "@blowfish/protect-ui/icons";
import { styled } from "styled-components";

export default {
  title: "Components/PreviewTxn",
  component: PreviewTxn,
} as Meta;

const Template: Story<PreviewTxnProps> = (args) => <PreviewTxn {...args} />;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  width: 16px;
  height: 17px;
`;

export const TransactionPreview = Template.bind({});
TransactionPreview.args = {
  txnData: {
    scanResult: transactionNoActionScanResult,
    message: undefined,
    dappUrl: new URL("https://www.blur.io"),
    account: "0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
  },
  advancedDetails: (
    <>
      <CardContent>
        <Row
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
          onClick={() => {
            console.log("clicked");
          }}
        >
          <Text design="secondary" size="sm">
            View more details
          </Text>
          <StyledArrowDownIcon />
        </Row>
      </CardContent>
    </>
  ),
  onContinue: async () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
  onReport: () => {
    console.log("Cancel clicked");
  },
};

export const SignaturePreview = Template.bind({});
SignaturePreview.args = {
  txnData: {
    account: "0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
    dappUrl: new URL("https://www.blur.io"),
    message: "Sign in to Blur",
    scanResult: transactionNoActionScanResult,
  },
  onContinue: async () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
  onReport: () => {
    console.log("Cancel clicked");
  },
  advancedDetails: (
    <>
      <CardContent>
        <Row
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
          onClick={() => {
            console.log("clicked");
          }}
        >
          <Text design="secondary" size="sm">
            View more details
          </Text>
          <StyledArrowDownIcon />
        </Row>
      </CardContent>
    </>
  ),
};
