import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PrimaryButton } from "../components/Buttons";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

export const Primary: ComponentStory<typeof PrimaryButton> = () => (
  <PrimaryButton style={{ maxWidth: "300px" }}>Button</PrimaryButton>
);
