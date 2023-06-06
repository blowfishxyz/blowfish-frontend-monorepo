import React from "react";
import { Story, Meta } from "@storybook/react";
import { PreviewTxnProps, PreviewTxn } from "~components/cards/PreviewTxn";
import { sendErc721 } from "~components/fixtures/state-changes";
import { CardContent } from "~components/cards/common";
import { Text, Row } from "@blowfish/ui/core";
import { ArrowDownIcon } from "@blowfish/ui/icons";
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
  simulationType: "transaction",
  txnSimulationData: {
    data: [sendErc721],
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
  onContinue: () => {
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
  simulationType: "signature",
  signatureData: [
    {
      imageUrl: "/placeholder/placeholder-signature-image.svg",
      dappUrl: new URL("https://www.blur.io"),
      message: "Sign in to Blur",
      state: "No state changes found. Proceed with caution",
      account: "0xD854343f41B2138B686F2D3bA38402A9F7Fb4337",
    },
  ],
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
  onContinue: () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
  onReport: () => {
    console.log("Cancel clicked");
  },
};
