import { memo, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { light } from "~/theme/light";
import { dark } from "~/theme/dark";
import type { ITheme } from "~/theme/common";
import deepmerge from "deepmerge";

const { all: mergeAll } = deepmerge;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type StyledProviderProps = React.ComponentProps<typeof StyledThemeProvider>;

type ThemeProviderProps = Omit<StyledProviderProps, "theme"> & {
  themeOverride?: DeepPartial<ITheme>;
  mode?: "light" | "dark" | "auto";
  fontFamily?: string;
};

export const BlowfishUIProvider: React.FC<ThemeProviderProps> = memo(
  function ThemeProvider({ children, ...rest }) {
    const theme = useTheme(rest);

    return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
  }
);

export function useTheme({
  mode,
  fontFamily,
  themeOverride,
}: {
  themeOverride?: DeepPartial<ITheme>;
  mode?: "light" | "dark" | "auto";
  fontFamily?: string;
}): ITheme {
  const defaultTheme = useMemo(() => {
    if (!mode) {
      return light;
    }
    let selectedMode = mode;
    if (
      selectedMode === "auto" &&
      typeof window !== "undefined" &&
      window.matchMedia
    ) {
      selectedMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return selectedMode === "dark" ? dark : light;
  }, [mode]);

  return useMemo(
    () =>
      mergeAll<ITheme>([
        defaultTheme,
        fontFamily ? { typography: { fontFamily } } : {},
        (themeOverride || {}) as ITheme,
      ]),
    [fontFamily, themeOverride, defaultTheme]
  );
}
