// Add support for theme inside styled-components
import "styled-components";

import { ITheme } from "@blowfish/ui/core";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ITheme {}
}
