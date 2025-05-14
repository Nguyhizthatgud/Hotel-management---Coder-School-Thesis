import React from "react";
import { dispatch, SetStateAction, createContext } from "react";

type ThemeContext = {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContext>({
  darkTheme: false,
  setDarkTheme: () => {}
});

export default ThemeContext;
