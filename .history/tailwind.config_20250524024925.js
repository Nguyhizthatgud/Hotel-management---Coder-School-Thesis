module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ...existing colors
        "react-dark": "#23272f",
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786",
        neutral: "#AAB8C2",
        "base-100": "#FFFFFF",
        info: "#1DA1F2",
        success: "#17BF63",
        warning: "#FFAD1F",
        error: "#E0245E",
      },
    },
  },
  plugins: [],
};
