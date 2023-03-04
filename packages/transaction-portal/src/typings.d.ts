import "styled-components";

// import custom theme
import { ITheme } from "./styles/theme";
// extend the module declarations using custom theme type
declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
