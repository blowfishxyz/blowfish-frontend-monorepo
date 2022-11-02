import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PrimaryButton, SecondaryButton } from "../components/Buttons";

export default {
  title: "Button",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton | typeof SecondaryButton>;

export const Primary: ComponentStory<typeof PrimaryButton> = () => (
  <PrimaryButton style={{ width: "160px" }}>Continue</PrimaryButton>
);

export const Secondary: ComponentStory<typeof SecondaryButton> = () => (
  <SecondaryButton style={{ width: "160px" }}>Cancel</SecondaryButton>
);
