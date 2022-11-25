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

export default {
  title: "TransacitonBlockedScreen",
  component: TransactionBlockedScreenComponent,
  args: {
    userAccount: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    onProceed: () => alert("Proceeding..."),
  },
} as ComponentMeta<typeof TransactionBlockedScreenComponent>;

export const TransactionBlocked: ComponentStory<
  React.FC<PopupContainerProps & TransactionBlockedScreenProps>
> = (props) => {
  return (
    <div style={{ width: "392px", minHeight: "748px" }}>
      <Providers>
        <PopupContainer {...props} severity="CRITICAL">
          <TransactionBlockedScreenComponent onProceed={props.onProceed} />
        </PopupContainer>
      </Providers>
    </div>
  );
};
