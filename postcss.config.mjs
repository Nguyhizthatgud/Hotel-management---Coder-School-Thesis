const config = {
  plugins: ["@tailwindcss/postcss"],
};
//setup dark mode

const tailwindConfig = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./public/index.ejs",
  ],
  theme: {
    extend: {
      colors: {
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
export default config;
