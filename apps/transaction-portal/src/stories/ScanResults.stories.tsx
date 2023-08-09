import { Severity, actionToSeverity } from "@blowfish/utils/types";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import {
  exampleEthSignScanResult,
  messageNoActionScanResult,
  messageWarnResultScanResult,
  transactionsBlockScanResult,
  transactionNoActionScanResult,
  transactionsWarningScanResult,
} from "@blowfishxyz/api-client/fixtures";

import { ApproveBottomMenu, SlimBottomMenu } from "../components/BottomMenus";
import {
  TransactionBlockedScreen,
  TransactionUnsupportedScreen,
} from "../components/InformationScreens";
import {
  PopupContainer,
  PopupContainerProps,
} from "../components/PopupContainer";
import { ScanResults, ScanResultsProps } from "../components/ScanResults";
import {
  exampleDappUrl,
  exampleEthSignRequest,
  exampleNftSignTypedDataRequest,
  examplePermitSignTypeDataRequest,
  exampleTransactionRequest,
} from "../components/fixtures/scan";

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

enum ScanResultScreenType {
  INFO = "INFO",
  UNSUPPORTED = "UNSUPPORTED",
  WARNING = "WARNING",
}
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

  let screenType = ScanResultScreenType.INFO;
  if (
    request?.payload &&
    "method" in request.payload &&
    request.payload.method === "eth_sign"
  ) {
    screenType = ScanResultScreenType.UNSUPPORTED;
  } else if (scanResults.action === "BLOCK" && !hasDismissedWarningScreen) {
    screenType = ScanResultScreenType.WARNING;
  }

  return (
    <div style={{ width: "100%", maxWidth: "600px", minHeight: "748px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity={severity}
        bottomMenuType={screenType !== "INFO" ? "SLIM" : "NONE"}
      >
        {}
        {screenType === "WARNING" && (
          <>
            <TransactionBlockedScreen
              onContinue={() => setHasDismissedWarningScreen(true)}
            />
            <SlimBottomMenu
              onClick={() => alert("ABORTED...")}
              buttonLabel="Close"
            />
          </>
        )}
        {screenType === "UNSUPPORTED" && (
          <>
            <TransactionUnsupportedScreen
              closeWindow={() => alert("CLOSING...")}
            />
            <SlimBottomMenu
              onClick={() => alert("ABORTED...")}
              buttonLabel="Close"
            />
          </>
        )}
        {screenType === "INFO" && (
          <>
            <ScanResults
              request={request}
              scanResults={scanResults}
              dappUrl={exampleDappUrl}
              chainNetwork="mainnet"
              chainFamily="ethereum"
            />
            <ApproveBottomMenu
              isImpersonatingWallet={false}
              onContinue={() => alert("PROCEEDING...")}
              onCancel={() => alert("CANCEL")}
            />
          </>
        )}
      </PopupContainer>
    </div>
  );
};

export const TransactionWarn = TransactionNoAction.bind({});
TransactionWarn.args = {
  scanResults: transactionsWarningScanResult,
};

export const TransactionBlock = TransactionWarn.bind({});
TransactionBlock.args = {
  scanResults: transactionsBlockScanResult,
};

export const TransactionUnsupported = TransactionNoAction.bind({});
TransactionUnsupported.args = {
  request: exampleEthSignRequest,
  scanResults: exampleEthSignScanResult,
  severity: "CRITICAL",
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
