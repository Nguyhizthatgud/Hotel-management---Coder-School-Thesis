"use client";
import React from "react";
import ThemeContext from "../../Context/ThemeContext";
type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const ThemefromStorage: boolean =
    typeof localStorage !== "undefined" && localStorage.getItem("Page-Theme")
      ? JSON.parse(localStorage.getItem("Page-Theme")!)
      : false;
  const [darkTheme, setDarkTheme] = React.useState<boolean>(ThemefromStorage);
  const handleThemeChange = (value: boolean) => {
    setDarkTheme(value);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("Page-Theme", JSON.stringify(value));
    }
  };
  React.useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} bg-white dark:bg-[#1a1a1a] text-black dark:text-white`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
