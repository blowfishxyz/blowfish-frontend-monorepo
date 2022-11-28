import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import {
  PopupContainer,
  PopupContainerProps,
} from "../components/PopupContainer";
import {
  TransactionBlockedScreen as TransactionBlockedScreenComponent,
  TransactionBlockedScreenProps,
  SimulationFailedScreen,
  SimulationFailedScreenProps,
} from "../components/InformationScreens";
import { SlimBottomMenu, SlimBottomMenuProps } from "../components/BottomMenus";

export default {
  title: "InformationScreens",
  component: TransactionBlockedScreenComponent,
  args: {
    userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    onContinue: () => alert("Proceeding..."),
    onClose: () => alert("Closing..."),
  },
} as ComponentMeta<typeof TransactionBlockedScreenComponent>;

export const TransactionBlocked: ComponentStory<
  React.FC<
    PopupContainerProps & TransactionBlockedScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "392px", minHeight: "768px" }}>
      <Providers>
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
      </Providers>
    </div>
  );
};

export const SimulationFailed: ComponentStory<
  React.FC<
    PopupContainerProps & SimulationFailedScreenProps & SlimBottomMenuProps
  >
> = (props) => {
  return (
    <div style={{ width: "392px", minHeight: "768px" }}>
      <Providers>
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
          <SimulationFailedScreen />
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
      </Providers>
    </div>
  );
};
