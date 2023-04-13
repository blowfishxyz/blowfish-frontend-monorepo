import type { Story, Meta } from "@storybook/react";

import {
  BaseButton,
  PrimaryButton,
  SecondaryButton,
  SmallButtonPrimary,
} from "../core";

export default {
  title: "Buttons",
  component: BaseButton,
} as Meta<
  | typeof PrimaryButton
  | typeof SecondaryButton
  | typeof SmallButtonPrimary
  | typeof BaseButton
>;

export const Base: Story<typeof BaseButton> = () => (
  <BaseButton style={{ width: "160px" }}>Continue</BaseButton>
);

export const Primary: Story<typeof PrimaryButton> = () => (
  <PrimaryButton style={{ width: "160px" }}>Continue</PrimaryButton>
);

export const Secondary: Story<typeof SecondaryButton> = () => (
  <SecondaryButton style={{ width: "160px" }}>Cancel</SecondaryButton>
);

export const SmallPrimary: Story<typeof SmallButtonPrimary> = () => (
  <SmallButtonPrimary style={{ width: "160px" }}>Continue</SmallButtonPrimary>
);
