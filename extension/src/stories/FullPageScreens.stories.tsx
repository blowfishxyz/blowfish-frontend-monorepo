import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Providers } from "../components/Providers";
import { LoadingScreen as LoadingScreenComponent } from "../components/LoadingScreen";
import { PopupContainer } from "./../components/PopupContainer";

export default {
  title: "FullPageScreens",
  component: LoadingScreenComponent,
} as ComponentMeta<typeof LoadingScreenComponent>;

const fullScreenStyleOverrides = {
  /* NOTE This is only for the story,
   * normally we want this to take up all the available window height */
  minHeight: "748px",
};
export const LoadingScreen: ComponentStory<
  typeof LoadingScreenComponent
> = () => (
  <div style={{ width: "392px", minHeight: "748px" }}>
    <Providers>
      <PopupContainer style={fullScreenStyleOverrides}>
        <LoadingScreenComponent style={fullScreenStyleOverrides} />
      </PopupContainer>
    </Providers>
  </div>
);
