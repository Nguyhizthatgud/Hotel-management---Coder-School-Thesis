module.exports = {
  darkMode: "class", // or "media"
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
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
  plugins: ["@tailwindcss/forms", "@tailwindcss/typography"],
};
