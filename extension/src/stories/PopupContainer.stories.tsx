import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import { PopupContainer } from "../components/PopupContainer";
import { ScanResults } from "../components/ScanResults";

export default {
  title: "PopupContainer",
  component: PopupContainer,
  args: {
    userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof PopupContainer>;

// TODO(kimpers): move into story
const exampleTransaction = {
  from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  data: "0xa9059cbb00000000000000000000000013890a1dbfee3b7debc2b2dfeb9fef2fbf81bd50000000000000000000000000000000000000000000000000000000174876e800",
  value: null,
};

export const Container: ComponentStory<typeof PopupContainer> = (props) => (
  <div style={{ width: "368px", height: "625px" }}>
    <Providers>
      <PopupContainer {...props}>
        <ScanResults transaction={exampleTransaction} />
      </PopupContainer>
    </Providers>
  </div>
);
