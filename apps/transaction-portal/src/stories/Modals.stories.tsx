import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Modal } from "~components/common/Modal";
import { storiesOf } from "@storybook/react";
import {
  AccountNotConnectedModal,
  OutdatedExtensionModal,
  SimulationErrorModal,
  TransactionNotFoundModal,
  TransactionRevertedModal,
  UnknownErrorModal,
  UnsupportedChainModal,
  UnsupportedTransactionModal,
  WrongAccountModal,
  WrongNetworkModal,
} from "~modules/scan/components/modals";
import ShareToTwitterModal from "~modules/scan/components/ShareToTwitterModal";

const Default: Story = () => (
  <Modal
    title="ChatGPT good"
    description="ChatGPT generates paragraphs by leveraging its vast knowledge and understanding of language. It is designed to analyze and comprehend the input provided by users, allowing it to generate coherent and contextually appropriate responses"
  />
);

storiesOf("Components/Modal", module).add("Default", () => <Default />);

storiesOf("Modals", module)
  .add("TransactionNotFoundModal", () => <TransactionNotFoundModal />)
  .add("OutdatedExtensionModal", () => <OutdatedExtensionModal />)
  .add("UnsupportedChainModal", () => (
    <UnsupportedChainModal
      closeWindow={async () => {
        alert("Close");
      }}
    />
  ))
  .add("WrongAccountModal", () => (
    <WrongAccountModal correctAddress="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" />
  ))
  .add("WrongNetworkModal", () => (
    <WrongNetworkModal
      connectedChainId={137}
      targetChainId={1}
      switchNetwork={async () => {
        alert("Switch network");
      }}
    />
  ))
  .add("UnsupportedTransactionModal", () => (
    <UnsupportedTransactionModal
      closeWindow={() => {
        alert("Close");
      }}
    />
  ))
  .add("AccountNotConnectedModal", () => <AccountNotConnectedModal />)
  .add("UnknownErrorModal", () => (
    <UnknownErrorModal
      onRetry={async () => {
        alert("Retry");
      }}
    />
  ))
  .add("SimulationErrorModal", () => (
    <SimulationErrorModal
      onRetry={async () => {
        alert("Retry");
      }}
    />
  ))
  .add("TransactionRevertedModal", () => (
    <TransactionRevertedModal error="UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT" />
  ))
  .add("ShareToTwitterModal", () => (
    <ShareToTwitterModal
      scammerAddress="0x00000000000001ad428e4906ae43d8f9852d0dd6"
      rejectTxn={() => {
        alert("Transaction rejected");
      }}
    />
  ));
