import React from "react";
import { Meta } from "@storybook/react";
import { useScanDomains } from "@blowfishxyz/ui";
import { JsonViewer } from "~components/JsonViewerV2";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { TransactionNotFoundModal } from "~components/modals";

export default {
  title: "Hooks/useScanDomains",
  component: JsonViewer,
} as Meta;
export const ScanDomain = () => {
  const { data, isLoading } = useScanDomains([
    "https://app.uniswap.org",
    "https://opensea.io",
  ]);

  if (isLoading) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if (!data) {
    return <TransactionNotFoundModal />;
  }

  return <JsonViewer data={data} />;
};
