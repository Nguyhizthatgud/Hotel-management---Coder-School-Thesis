"use client";
import React from "react";
import ThemeContext from "../../Context/ThemeContext";
type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const themeFromStorage =
      typeof window !== "undefined" && localStorage.getItem("Page-Theme")
        ? JSON.parse(localStorage.getItem("Page-Theme")!)
        : false;
    setDarkTheme(themeFromStorage);
  }, []);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (darkTheme) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, [darkTheme]);
  return (
    // <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
    //   <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
    //     <div className="dark:text-white dark:bg-[#1a1a1a] text-[#1E1E1E]">
    //       {children}
    //     </div>
    //   </div>
    // </ThemeContext.Provider>
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
