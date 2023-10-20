import type { Story, Meta } from "@storybook/react";

import { Spinner, SpinnerProps } from "~/common/spinner";
import { Column } from "~/common/layout";

export default {
  title: "Internal/Spinner",
  component: Spinner,
  argTypes: {
    contrast: { control: "boolean" },
  },
} as Meta<SpinnerProps>;

const Template: Story<SpinnerProps> = (args) => (
  <Column
    alignItems="center"
    justifyContent="center"
    padding={20}
    width={100}
    style={{ backgroundColor: args.design === "contrast" ? "black" : "white" }}
  >
    <Spinner {...args} />
  </Column>
);

export const Default = Template.bind({});
