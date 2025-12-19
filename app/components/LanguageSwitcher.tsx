"use client";
import React from "react";

import i18next from "@/utils/i18n";

const locales = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "cn", label: "中文" }
];

export default function LanguageSwitcher() {
  const [current, setCurrent] = React.useState<string>("vi");
  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null;
    setCurrent(saved === "vi" ? "vi" : saved === "cn" ? "cn" : "en");
  }, []);

  const changeLocale = (lng: string) => {
    i18next.changeLanguage(lng);
    setCurrent(lng);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", lng);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLocale(lng.code)}
          className={`px-2 py-1 rounded text-sm ${current === lng.code ? "bg-amber-500 text-white" : "bg-gray-200"}`}
        >
          {lng.label}
        </button>
      ))}
    </div>
  );
}
