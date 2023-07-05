declare module "@blowfish/protect-ui";

// Add support for theme inside styled-components
import "styled-components";

import "@blowfishxyz/ui";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ITheme {}
}
