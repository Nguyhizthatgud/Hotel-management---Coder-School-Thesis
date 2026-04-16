module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
  safelist: [
    // Force include colors that are dynamically used
    "text-orange-400",
    "text-amber-600",
    "text-amber-500",
    "bg-orange-400",
    "hover:text-amber-600",
    "group-hover:text-amber-600",
    "text-amber-600",
  ],
  plugins: [],
};
