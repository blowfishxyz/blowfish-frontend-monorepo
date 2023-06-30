import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { PrimaryButton, SecondaryButton } from "@blowfish/protect-ui/core";

export default {
  title: "Buttons",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton | typeof SecondaryButton>;

export const Primary: ComponentStory<typeof PrimaryButton> = () => (
  <PrimaryButton style={{ width: "160px" }}>Continue</PrimaryButton>
);

export const Secondary: ComponentStory<typeof SecondaryButton> = () => (
  <SecondaryButton style={{ width: "160px" }}>Cancel</SecondaryButton>
);
