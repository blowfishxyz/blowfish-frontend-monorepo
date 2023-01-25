import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LoadingScreen as LoadingScreenComponent } from "../components/LoadingScreen";
import { Providers } from "../components/Providers";
import { PopupContainer } from "./../components/PopupContainer";

export default {
  title: "FullPageScreens",
  component: LoadingScreenComponent,
  args: {
    animate: false,
  },
} as ComponentMeta<typeof LoadingScreenComponent>;

const fullScreenStyleOverrides = {
  /* NOTE This is only for the story,
   * normally we want this to take up all the available window height */
  minHeight: "748px",
};
export const LoadingScreen: ComponentStory<typeof LoadingScreenComponent> = ({
  animate,
}) => (
  <div style={{ width: "392px", minHeight: "748px" }}>
    <Providers>
      <PopupContainer style={fullScreenStyleOverrides}>
        <LoadingScreenComponent
          style={fullScreenStyleOverrides}
          animate={animate}
        />
      </PopupContainer>
    </Providers>
  </div>
);
