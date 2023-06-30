import { PauseDurationSelector } from "../core";
import { Meta, Story } from "@storybook/react";
import { PauseDuration } from "@blowfish/hooks";

export default {
  title: "PauseDurationSelector",
  component: PauseDurationSelector,
} as Meta;

interface PauseDurationSelectorArgs {
  onClick: (period: PauseDuration) => void;
}

const Template: Story<PauseDurationSelectorArgs> = (args) => (
  <PauseDurationSelector {...args} />
);

export const DefaultPauseDurationSelector = Template.bind({});
DefaultPauseDurationSelector.args = {
  onClick: (period) => {
    alert(`Clicked period: ${period}`);
  },
};
