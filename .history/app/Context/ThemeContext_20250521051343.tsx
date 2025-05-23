import { Dispatch, SetStateAction, createContext } from "react";

type ThemeContext = {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContext>({
  darkTheme: false,
  setDarkTheme: () => {
    // Default function does nothing
  },
});

export default ThemeContext;
