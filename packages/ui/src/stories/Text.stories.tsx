import { Meta, Story } from "@storybook/react";
import { Text } from "../core/Text";

export default {
  title: "Typography",
  argTypes: {
    design: {
      control: {
        type: "select",
        options: ["primary", "secondary", "danger"],
      },
      defaultValue: "primary",
    },
    weight: {
      control: {
        type: "select",
        options: ["semi-bold", "bold", "normal"],
      },
      defaultValue: "normal",
    },
    size: {
      control: {
        type: "select",
        options: ["xxs", "xs", "s", "m", "l", "xl", "xxl"],
      },
      defaultValue: "m",
    },
  },
} as Meta;

const TextTemplate: Story = () => <Text>Send 0.00001 ETH</Text>;
export const DefaultText = TextTemplate.bind({});
