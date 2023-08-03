import { memo, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { light } from "~/theme/light";
import { dark } from "~/theme/dark";
import type { ITheme } from "~/theme/common";
import { all as mergeAll } from "deepmerge";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type StyledProviderProps = React.ComponentProps<typeof StyledThemeProvider>;

type ThemeProviderProps = Omit<StyledProviderProps, "theme"> & {
  themeOverride?: DeepPartial<ITheme>;
  mode?: "light" | "dark";
  fontFamily?: string;
};

export const BlowfishUIProvider: React.FC<ThemeProviderProps> = memo(
  function ThemeProvider({
    mode = "light",
    fontFamily,
    themeOverride,
    children,
  }) {
    const defaultTheme = mode === "dark" ? dark : light;
    const theme: ITheme = useMemo(
      () =>
        mergeAll<ITheme>([
          defaultTheme,
          fontFamily ? { typography: { fontFamily } } : {},
          (themeOverride || {}) as ITheme,
        ]),
      [fontFamily, themeOverride]
    );

    return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
  }
);
