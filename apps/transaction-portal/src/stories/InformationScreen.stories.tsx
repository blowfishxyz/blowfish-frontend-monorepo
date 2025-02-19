import type { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import type { ComponentStory } from "@storybook/react";
import React from "react";

import { SlimBottomMenu, SlimBottomMenuProps } from "~components/BottomMenus";
import {
  PopupContainer,
  PopupContainerProps,
} from "~components/PopupContainer";

import {
  AccountNotConnectedScreen,
  AccountNotConnectedScreenProps,
  OutdatedExtensionCTAScreen,
  SimulationErrorScreen,
  SimulationErrorScreenProps,
  TransactionBlockedScreen as TransactionBlockedScreenComponent,
  TransactionBlockedScreenProps,
  TransactionNotFoundScreen,
  UnknownErrorScreen,
  UnknownErrorScreenProps,
  UnsupportedChainScreen,
  UnsupportedChainScreenProps,
  WrongChainScreen,
  WrongChainScreenProps,
} from "../components/InformationScreens";

const DEFAULT_ARGS = {
  userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  chainFamily: "ethereum" as ChainFamily,
  chainNetwork: "mainnet" as ChainNetwork,
  onContinue: () => alert("Proceeding..."),
  onClose: () => alert("Closing..."),
  onRetry: () => alert("Retrying..."),
  isRetrying: false,
};
const storyDetails = {
  title: "InformationScreens",
  args: DEFAULT_ARGS,
};

export default storyDetails;

export const TransactionBlocked: ComponentStory<
  React.FC<
    PopupContainerProps & TransactionBlockedScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "600", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="CRITICAL"
        bottomMenuType="SLIM"
      >
        <TransactionBlockedScreenComponent onContinue={props.onContinue} />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};

export const SimulationError: ComponentStory<
  React.FC<
    PopupContainerProps & SimulationErrorScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "600", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <SimulationErrorScreen
          headline={props.headline}
          message={props.message}
          onRetry={props.onRetry}
          isRetrying={props.isRetrying}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};

SimulationError.args = {
  ...DEFAULT_ARGS,
  headline: "Simulation Failed",
  message:
    "We are unable to simulate this transaction. Approving may lead to loss of funds",
};

export const TransactionReverted: ComponentStory<
  React.FC<
    PopupContainerProps & SimulationErrorScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "600", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <SimulationErrorScreen
          headline={props.headline}
          message={props.message}
          errorMessage={props.errorMessage}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};
TransactionReverted.args = {
  ...DEFAULT_ARGS,
  headline: "Transaction reverted",
  message:
    "The transaction reverted when we simulated it. Approving may lead to loss of funds",
  errorMessage: "UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT",
};

export const UnsupportedChain: ComponentStory<
  React.FC<
    PopupContainerProps & UnsupportedChainScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "600", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <UnsupportedChainScreen
          onDismissUnsupportedChain={async (value) => {
            console.log("onToggleShowUnsupportedChain", value);
          }}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};

export const UnknownError: ComponentStory<
  React.FC<PopupContainerProps & UnknownErrorScreenProps & SlimBottomMenuProps>
> = (props) => {
  return (
    <div style={{ width: "600", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <UnknownErrorScreen
          onRetry={props.onRetry}
          isRetrying={props.isRetrying}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close this window"
        />
      </PopupContainer>
    </div>
  );
};

UnknownError.args = {
  ...DEFAULT_ARGS,
};

export const AccountNotConnected: ComponentStory<
  React.FC<
    PopupContainerProps & AccountNotConnectedScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "600px", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <AccountNotConnectedScreen
          accountToConnect={props.accountToConnect}
          onRetry={props.onRetry}
          isRetrying={props.isRetrying}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};
AccountNotConnected.args = {
  ...DEFAULT_ARGS,
  accountToConnect: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
};

export const AccountNotConnectedWhileImpersonating: ComponentStory<
  React.FC<
    PopupContainerProps & AccountNotConnectedScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "600px", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <AccountNotConnectedScreen
          impersonatingWallet={props.impersonatingWallet}
          accountToConnect={props.accountToConnect}
          onRetry={props.onRetry}
          isRetrying={props.isRetrying}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};
AccountNotConnectedWhileImpersonating.args = {
  ...DEFAULT_ARGS,
  impersonatingWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
};

export const WrongChain: ComponentStory<
  React.FC<PopupContainerProps & WrongChainScreenProps & SlimBottomMenuProps>
> = (props) => {
  return (
    <div style={{ width: "600px", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <WrongChainScreen
          currentChainId={props.currentChainId}
          chainIdToConnect={props.chainIdToConnect}
          onRetry={props.onRetry}
          isRetrying={props.isRetrying}
        />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};
WrongChain.args = {
  ...DEFAULT_ARGS,
  currentChainId: 1,
  chainIdToConnect: 137,
};

export const TransactionNotFound: ComponentStory<
  React.FC<PopupContainerProps & SlimBottomMenuProps>
> = (props) => {
  return (
    <div style={{ width: "600px", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <TransactionNotFoundScreen />
        <SlimBottomMenu
          style={{
            /* NOTE: This is only applicable in the context of the storybook,
             * in the extension we want this fixed to to bottom of the window */
            position: "absolute",
          }}
          onClick={props.onClick}
          buttonLabel="Close"
        />
      </PopupContainer>
    </div>
  );
};
TransactionNotFound.args = {
  ...DEFAULT_ARGS,
};

export const OutdatedExtension: ComponentStory<
  React.FC<PopupContainerProps>
> = (props) => {
  return (
    <div style={{ width: "600px", minHeight: "768px" }}>
      <PopupContainer
        style={{
          /* NOTE This is only for the story,
           * normally we want this to take up all the available window height */
          minHeight: "748px",
        }}
        {...props}
        severity="INFO"
        bottomMenuType="SLIM"
      >
        <OutdatedExtensionCTAScreen />
      </PopupContainer>
    </div>
  );
};
OutdatedExtension.args = {
  ...DEFAULT_ARGS,
};
