import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LoadingScreen as LoadingScreenComponent } from "../components/LoadingScreen";
import { PopupContainer } from "./../components/PopupContainer";
import OnboardingWizard from "~components/OnboardingWizard";

export default {
  title: "FullPageScreens",
  component: LoadingScreenComponent,
  args: {
    animate: false,
  },
} as ComponentMeta<typeof LoadingScreenComponent | typeof OnboardingWizard>;

const fullScreenStyleOverrides = {
  /* NOTE This is only for the story,
   * normally we want this to take up all the available window height */
  minHeight: "748px",
};
export const LoadingScreen: ComponentStory<typeof LoadingScreenComponent> = ({
  animate,
}) => (
  <div style={{ width: "392px", minHeight: "748px" }}>
    <PopupContainer style={fullScreenStyleOverrides}>
      <LoadingScreenComponent
        style={fullScreenStyleOverrides}
        animate={animate}
      />
    </PopupContainer>
  </div>
);

export const OnboardingScreen: ComponentStory<typeof OnboardingWizard> = () => {
  return (
    <div style={{ height: "100%", backgroundColor: "#f2f4f1" }}>
      <OnboardingWizard />
    </div>
  );
};
