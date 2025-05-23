import React from "react";
import ThemeContext from "../../Context/ThemeContext";
type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const themeFromStorage = localStorage.getItem("Page-Theme");
      let isDark = false;
      if (themeFromStorage !== null) {
        isDark = JSON.parse(themeFromStorage);
      } else {
        // fallback to system preference
        isDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      setDarkTheme(isDark);
      setMounted(true);
    }
  }, []);
  if (!mounted) return null;
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
