import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import {
  PopupContainer,
  PopupContainerProps,
} from "../components/PopupContainer";
import { ScanResults, ScanResultsProps } from "../components/ScanResults";
import { Severity, actionToSeverity } from "../types";

import {
  noActionScanResult,
  warningScanResult,
  blockScanResult,
  exampleTransaction,
  exampleDappUrl,
} from "./fixtures/scan";

export default {
  title: "ScanResults",
  component: PopupContainer,
  args: {
    userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    transaction: exampleTransaction,
    scanResults: noActionScanResult,
  },
} as ComponentMeta<typeof PopupContainer>;

export const NoActionResults: ComponentStory<
  React.FC<PopupContainerProps & ScanResultsProps>
> = (props) => {
  const { scanResults, transaction } = props;
  let severity: Severity;
  // If the story has manually set something other than info allow that override
  if (props.severity && props.severity !== "INFO") {
    severity = props.severity!;
  } else {
    // Otherwise use the context derived from the action
    severity = actionToSeverity(scanResults.action);
  }

  return (
    <div style={{ width: "392px", minHeight: "748px" }}>
      <Providers>
        <PopupContainer {...props} severity={severity}>
          <ScanResults
            transaction={transaction}
            scanResults={scanResults}
            dappUrl={exampleDappUrl}
            onContinue={async () => {
              console.log("CONTINUE");
            }}
            onCancel={async () => {
              console.log("CANCEL");
            }}
            chainNetwork="mainnet"
            chainFamily="ethereum"
          />
        </PopupContainer>
      </Providers>
    </div>
  );
};

export const WarnResults = NoActionResults.bind({});
WarnResults.args = {
  scanResults: warningScanResult,
};

export const BlockResults = WarnResults.bind({});
BlockResults.args = {
  scanResults: blockScanResult,
};
