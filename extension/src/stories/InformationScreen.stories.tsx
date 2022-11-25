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
} from "../components/InformationScreens";
import { SlimBottomMenu, SlimBottomMenuProps } from "../components/BottomMenus";

export default {
  title: "TransacitonBlockedScreen",
  component: TransactionBlockedScreenComponent,
  args: {
    userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    onProceed: () => alert("Proceeding..."),
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
        <PopupContainer {...props} severity="CRITICAL" bottomMenuType="SLIM">
          <TransactionBlockedScreenComponent onProceed={props.onProceed} />
          <SlimBottomMenu onClick={props.onClick} buttonLabel="Close" />
        </PopupContainer>
      </Providers>
    </div>
  );
};
