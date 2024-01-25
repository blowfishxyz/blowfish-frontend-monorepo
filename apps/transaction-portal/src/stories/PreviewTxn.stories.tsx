import React from "react";
import { Story, Meta } from "@storybook/react";
import { PreviewTxn, PreviewTxnProps } from "~components/cards/PreviewTxn";
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
    return Promise.resolve();
  },
};

export const SignaturePreview = Template.bind({});
SignaturePreview.args = {
  onContinue: async () => {
    console.log("Continue clicked");
  },
  onCancel: () => {
    console.log("Cancel clicked");
  },
  onReport: () => {
    console.log("Cancel clicked");
    return Promise.resolve();
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
