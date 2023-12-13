import React from "react";
import { Meta } from "@storybook/react";
import { useSimulateHistoricalTransaction } from "@blowfishxyz/ui";
import { JsonViewer } from "~components/JsonViewerV2";
import { ProtectLoadingScreen } from "~components/ProtectLoadingScreen";
import { TransactionNotFoundModal } from "~components/modals";

export default {
  title: "Hooks/useSimulateHistoricalTransaction",
  component: JsonViewer,
} as Meta;
export const ScanDomain = () => {
  const { data, isLoading } = useSimulateHistoricalTransaction(
    "0x8010da429a651ca117e5c087497cdd8d62e2b7ac1d4095358897817a4d1aa477",
    "0xc1e42f862d202b4a0ed552c1145735ee088f6ccf"
  );

  if (isLoading) {
    return <ProtectLoadingScreen key="loading" />;
  }

  if (!data) {
    return <TransactionNotFoundModal />;
  }

  return <JsonViewer data={data} />;
};
