///<reference types="chrome"/>

// Add support for theme inside styled-components
import "styled-components";

import { ITheme } from "./styles/theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ITheme {}
}
declare global {
  interface Navigator {
    brave: {
      isBrave: () => Promise<boolean>;
    };
  }
}
