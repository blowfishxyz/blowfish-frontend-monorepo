// Add support for theme inside styled-components
import "styled-components";

import { ITheme } from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
