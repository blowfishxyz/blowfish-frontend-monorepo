import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import { PopupContainer } from "../components/PopupContainer";
import { ScanResults } from "../components/ScanResults";
import { InformationContext, actionToInformationContext } from "../types";

import {
  noActionScanResult,
  exampleTransaction,
  exampleDappUrl,
} from "./fixtures/scan";

export default {
  title: "PopupContainer",
  component: PopupContainer,
  args: {
    userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    transaction: exampleTransaction,
    scanResults: noActionScanResult,
  },
} as ComponentMeta<typeof PopupContainer>;

export const Container: ComponentStory<typeof PopupContainer> = (props) => {
  // HACK(kimpers): Allows us to pass custom properties to ScanResults through the story
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scanResults, transaction } = props as unknown as any;
  let informationContext: InformationContext;
  // If the story has manually set something other than info allow that override
  // eslint-disable-next-line react/prop-types
  if (props.informationContext && props.informationContext !== "INFO") {
    // eslint-disable-next-line react/prop-types
    informationContext = props.informationContext!;
  } else {
    // Otherwise use the context derived from the action
    informationContext = actionToInformationContext(scanResults.action);
  }

  return (
    <div style={{ width: "392px", minHeight: "748px" }}>
      <Providers>
        <PopupContainer {...props} informationContext={informationContext}>
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
