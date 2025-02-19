import React from "react";
import { Meta, Story } from "@storybook/react";
import { useScanTransactionsEvm } from "@blowfishxyz/ui";
import { RequestType } from "@blowfish/utils/types";
import ScanResultsV2, { ScanResultsV2Props } from "~components/ScanResultsV2";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { TransactionNotFoundModal } from "~components/modals";
import { EvmTxData } from "@blowfishxyz/api-client/.";

export default {
  title: "Hooks/useScanTransactionEvm",
  component: ScanResultsV2,
} as Meta;
const Template: Story<ScanResultsV2Props> = ({ ...args }) => {
  const { data, isLoading } = useScanTransactionsEvm({
    txObjects: [args.request.payload as EvmTxData],
    userAccount: args.request.userAccount,
    metadata: { origin: args.message.origin as string },
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

export const ScanTransactionEvm = Template.bind({});
ScanTransactionEvm.args = {
  request: {
    type: RequestType.Transaction,
    payload: {
      data: "0xa22cb465000000000000000000000000deadbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      to: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      value: "",
    },
    userAccount: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chainId: "1",
    extensionVersion: "",
  },
  chainNetwork: "mainnet",
  chainFamily: "ethereum",
  dappUrl: "https://examples.blowfish.tools/",
  message: {
    id: "",
    data: {
      type: RequestType.Transaction,
      payload: {
        data: "0xa22cb465000000000000000000000000deadbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
        from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        to: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        value: "",
      },
      userAccount: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      chainId: "1",
      extensionVersion: "",
    },
    origin: "https://examples.blowfish.tools",
    type: RequestType.Transaction,
  },
  impersonatingAddress: "",
};
