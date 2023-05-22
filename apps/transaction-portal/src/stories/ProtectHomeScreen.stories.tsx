import React from "react";
import { storiesOf } from "@storybook/react";
import ProtectHomeScreen from "~components/ProtectHomeScreen";

const ProtectHomeScreenStory = () => <ProtectHomeScreen />;

storiesOf("Components/ProtectHomeScreen", module).add("Default", () => (
  <ProtectHomeScreenStory />
));
