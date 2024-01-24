import React from "react";
import { Meta, Story } from "@storybook/react";
import { useScanMessage } from "@blowfishxyz/ui";
import { RequestType, SignMessagePayload } from "@blowfish/utils/types";
import ScanResultsV2, { ScanResultsV2Props } from "~components/ScanResultsV2";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { TransactionNotFoundModal } from "~components/modals";

export default {
  title: "Hooks/useScanMessage",
  component: ScanResultsV2,
} as Meta;
const Template: Story<ScanResultsV2Props> = ({ ...args }) => {
  const reqPayload = args.request.payload as SignMessagePayload;
  const { data, isLoading } = useScanMessage({
    message: reqPayload.message,
    userAccount: args.request.userAccount,
    metadata: { origin: "https://examples.blowfish.tools/" },
    chainFamily: args.chainFamily,
    chainNetwork: args.chainNetwork,
  });

  if (isLoading) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if (!data) {
    return <TransactionNotFoundModal />;
  }

  return <ScanResultsV2 {...args} scanResults={data} />;
};

export const ScanMessage = Template.bind({});
ScanMessage.args = {
  request: {
    type: RequestType.SignMessage,
    payload: {
      message:
        "0x40ac14ef28d35fb4540e0cd0950123b378224d3585ec887c26f7a510da544552",
      method: "eth_sign",
    },
    userAccount: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: "1",
    extensionVersion: "",
  },
  message: {
    id: "",
    type: RequestType.SignMessage,
    data: {
      type: RequestType.SignMessage,
      payload: {
        message:
          "0x40ac14ef28d35fb4540e0cd0950123b378224d3585ec887c26f7a510da544552",
        method: "eth_sign",
      },
      userAccount: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      chainId: "1",
      extensionVersion: "",
    },
    origin: "https://examples.blowfish.tools",
  },
  impersonatingAddress: "",
  chainNetwork: "mainnet",
  chainFamily: "ethereum",
  dappUrl: "https://examples.blowfish.tools/",
};
