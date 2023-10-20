import { Meta, Story } from "@storybook/react";
import { Text, TextProps } from "../src/common/text";

const meta: Meta<TextProps> = {
  title: "Internal/Text",
  component: Text,
  argTypes: {
    design: {
      control: {
        type: "select",
        options: ["primary", "secondary", "danger", "success"],
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
};

const Template: Story<TextProps> = (args) => (
  <Text {...args}>Send 3.1 ETH</Text>
);

export const Default = Template.bind({});

export default meta;
