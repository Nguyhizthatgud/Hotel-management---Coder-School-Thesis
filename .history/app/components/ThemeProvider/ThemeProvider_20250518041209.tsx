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
  const [renderComponent, setRenderComponent] = React.useState<boolean>(false);
  React.useEffect(() => {
    setRenderComponent(true);
  }, []);
  if (!renderComponent) {
    return <></>; // or a loading spinner
  }
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""}  min-h-screen`}>
        <div className="dark:text-white dark:bg-[#1a1a1a] text-[#1E1E1E]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
