import "./index.ts";
import { ITheme } from "./index";

declare module "@blowfish/ui/core" {
  export * from "./index.ts";
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ITheme {}
}
