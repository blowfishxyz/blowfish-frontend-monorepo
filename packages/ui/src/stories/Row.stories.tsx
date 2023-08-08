import React from "react";
import { Row } from "~/common/layout";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Internal/Row",
  component: Row,
  argTypes: {
    width: { control: "text" },
    align: {
      control: {
        type: "select",
        options: ["stretch", "flex-start", "flex-end", "center", "baseline"],
      },
    },
    justify: {
      control: {
        type: "select",
        options: [
          "flex-start",
          "flex-end",
          "center",
          "space-between",
          "space-around",
          "space-evenly",
        ],
      },
    },
    padding: { control: "text" },
    gap: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof Row>> = (args) => (
  <Row {...args}>
    <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>Child 1</div>
    <div style={{ backgroundColor: "lightgreen", padding: "1rem" }}>
      Child 2
    </div>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  gap: "md",
};
