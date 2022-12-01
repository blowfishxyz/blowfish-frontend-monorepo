import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";

export default {
  title: "Buttons",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton | typeof SecondaryButton>;

export const Primary: ComponentStory<typeof PrimaryButton> = () => (
  <PrimaryButton style={{ width: "160px" }}>Continue</PrimaryButton>
);

export const Secondary: ComponentStory<typeof SecondaryButton> = () => (
  <Providers>
    <SecondaryButton style={{ width: "160px" }}>Cancel</SecondaryButton>
  </Providers>
);
