import React from "react";
import { Column } from "~/common/layout";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Column",
  component: Column,
  argTypes: {
    gap: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    width: { control: "text" },
    flex: { control: "number" },
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof Column>> = (args) => (
  <Column {...args}>
    <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>Child 1</div>
    <div style={{ backgroundColor: "lightgreen", padding: "1rem" }}>
      Child 2
    </div>
  </Column>
);

export const Default = Template.bind({});
Default.args = {
  gap: "md",
};
