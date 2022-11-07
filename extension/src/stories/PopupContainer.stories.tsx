import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PopupContainer } from "../components/PopupContainer";

export default {
  title: "PopupContainer",
  component: PopupContainer,
  args: {
    userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof PopupContainer>;

export const Container: ComponentStory<typeof PopupContainer> = (props) => (
  <PopupContainer {...props}>
    <div
      style={{
        backgroundColor: "white",
        width: "368px",
        height: "400px",
      }}
    >
      <p style={{ textAlign: "center" }}>Hello World</p>
    </div>
  </PopupContainer>
);
