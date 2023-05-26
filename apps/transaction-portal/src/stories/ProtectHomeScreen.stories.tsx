import React from "react";
import { storiesOf } from "@storybook/react";
import ProtectHomeScreen from "~components/ProtectHomeScreen";

const ProtectHomeScreenStory = () => <ProtectHomeScreen animate={false} />;

storiesOf("Components/ProtectHomeScreen", module).add("Default", () => (
  <ProtectHomeScreenStory />
));
