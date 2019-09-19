import React from "react";

import darkTheme from "./dark-theme";
import lightTheme from "./light-theme";

export const themes: any = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeContext = React.createContext(themes.light);

export default ThemeContext;
