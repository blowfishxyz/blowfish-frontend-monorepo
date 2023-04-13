import { Text, TextXL, TextSmall, GrayText, RedText } from "../core";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Typography",
} as Meta;

const TextTemplate: Story = () => <Text>Default Text</Text>;
export const DefaultText = TextTemplate.bind({});

const TextXLTemplate: Story = () => <TextXL>Extra Large Text</TextXL>;
export const DefaultTextXL = TextXLTemplate.bind({});

const TextSmallTemplate: Story = () => (
  <TextSmall>Small Text</TextSmall>
);
export const DefaultTextSmall = TextSmallTemplate.bind({});

const GrayTextTemplate: Story = () => (
  <GrayText>Gray Text</GrayText>
);
export const DefaultGrayText = GrayTextTemplate.bind({});

const RedTextTemplate: Story = () => <RedText>Red Text</RedText>;
export const DefaultRedText = RedTextTemplate.bind({});
