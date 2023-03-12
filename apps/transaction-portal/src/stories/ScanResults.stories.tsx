import { Severity, actionToSeverity } from "@blowfish/utils/types";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { ApproveBottomMenu, SlimBottomMenu } from "../components/BottomMenus";
import { TransactionBlockedScreen } from "../components/InformationScreens";
import {
  PopupContainer,
  PopupContainerProps,
} from "../components/PopupContainer";
import { Providers } from "../components/Providers";
import { ScanResults, ScanResultsProps } from "../components/ScanResults";
import {
  exampleDappUrl,
  exampleNftSignTypedDataRequest,
  examplePermitSignTypeDataRequest,
  exampleTransactionRequest,
  messageNoActionScanResult,
  messageWarnResultScanResult,
  transactionBlockScanResult,
  transactionNoActionScanResult,
  transactionWarningScanResult,
} from "./fixtures/scan";

export default {
  title: "ScanResults",
  component: ScanResults,
  args: {
    userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    request: exampleTransactionRequest,
    scanResults: transactionNoActionScanResult,
  },
} as ComponentMeta<typeof PopupContainer>;

export const TransactionNoAction: ComponentStory<
  React.FC<PopupContainerProps & ScanResultsProps>
> = (props) => {
  const [hasDismissedWarningScreen, setHasDismissedWarningScreen] =
    useState<boolean>(false);
  const { scanResults, request } = props;
  let severity: Severity;
  // If the story has manually set something other than info allow that override
  if (props.severity && props.severity !== "INFO") {
    severity = props.severity;
  } else {
    // Otherwise use the context derived from the action
    severity = actionToSeverity(scanResults.action);
  }

  const shouldShowWarningScreen =
    scanResults.action === "BLOCK" && !hasDismissedWarningScreen;

  return (
    <div style={{ width: "392px", minHeight: "748px" }}>
      <Providers>
        <PopupContainer
          style={{
            /* NOTE This is only for the story,
             * normally we want this to take up all the available window height */
            minHeight: "748px",
          }}
          {...props}
          severity={severity}
          bottomMenuType={shouldShowWarningScreen ? "SLIM" : "NONE"}
        >
          {shouldShowWarningScreen ? (
            <>
              <TransactionBlockedScreen
                onContinue={() => setHasDismissedWarningScreen(true)}
              />
              <SlimBottomMenu
                style={{
                  /* NOTE: This is only applicable in the context of the storybook,
                   * in the extension we want this fixed to to bottom of the window */
                  position: "absolute",
                }}
                onClick={() => alert("ABORTED...")}
                buttonLabel="Close"
              />
            </>
          ) : (
            <>
              <ScanResults
                request={request}
                scanResults={scanResults}
                dappUrl={exampleDappUrl}
                chainNetwork="mainnet"
                chainFamily="ethereum"
              />
              <ApproveBottomMenu
                style={{
                  /* NOTE: This is only applicable in the context of the storybook,
                   * in the extension we want this fixed to to bottom of the window */
                  position: "absolute",
                }}
                onContinue={() => alert("PROCEEDING...")}
                onCancel={() => alert("CANCEL")}
              />
            </>
          )}
        </PopupContainer>
      </Providers>
    </div>
  );
};

export const TransactionWarn = TransactionNoAction.bind({});
TransactionWarn.args = {
  scanResults: transactionWarningScanResult,
};

export const TransactionBlock = TransactionWarn.bind({});
TransactionBlock.args = {
  scanResults: transactionBlockScanResult,
};

export const MessageNoAction = TransactionNoAction.bind({});
MessageNoAction.args = {
  request: exampleNftSignTypedDataRequest,
  scanResults: messageNoActionScanResult,
};

export const MessageWarn = TransactionNoAction.bind({});
MessageWarn.args = {
  request: examplePermitSignTypeDataRequest,
  scanResults: messageWarnResultScanResult,
};
