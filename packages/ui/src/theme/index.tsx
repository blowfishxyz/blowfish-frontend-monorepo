import { memo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { light } from "~/theme/light";
import { dark } from "~/theme/dark";
import type { ITheme } from "~/theme/common";

export const themes = {
  light,
  dark,
};

type StyledProviderProps = React.ComponentProps<typeof StyledThemeProvider>;

type ThemeProviderProps = Omit<StyledProviderProps, "theme"> & {
  customTheme?: ITheme;
  mode?: "light" | "dark";
};

export const ThemeProvider: React.FC<ThemeProviderProps> = memo(
  function ThemeProvider({ mode = "light", customTheme, ...props }) {
    return (
      <StyledThemeProvider
        {...props}
        theme={customTheme || (mode === "dark" ? themes.dark : themes.light)}
      />
    );
  }
);

export {
  ITheme,
  ThemeBackgroundColor,
  ThemeForegroundColor,
} from "~/theme/common";
