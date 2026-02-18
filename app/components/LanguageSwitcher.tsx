"use client";
import React from "react";

import i18next from "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useUISlice } from "@/stores/UI/useUIStore";

const locales = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "cn", label: "中文" }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [current, setCurrent] = React.useState<string>("vi");
  const { hotelTheme } = useUISlice();

  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null;
    const initial = saved || i18n.language || "vi";
    setCurrent(initial);
    if (i18n.language !== initial) {
      i18n.changeLanguage(initial);
    }
  }, [i18n]);

  React.useEffect(() => {
    const handleLanguageChange = (lng: string) => setCurrent(lng);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const changeLocale = (lng: string) => {
    i18next.changeLanguage(lng);
    setCurrent(lng);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", lng);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* {locales.map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLocale(lng.code)}
          className={`px-2 py-1 rounded text-sm ${current === lng.code ? "bg-amber-500 text-white" : "bg-gray-200"}`}
        >
          {lng.label}
        </button>
      ))} */}
      <Select
        value={current}
        onValueChange={(value) => {
          changeLocale(value);
        }}
      >
        <SelectTrigger
          className={hotelTheme === "dark" ? "bg-slate-950 border-slate-700 text-white w-[140px]" : "w-[140px] "}
        >
          {current === "en" ? (
            <ReactCountryFlag className="mr-1" countryCode="US" svg />
          ) : current === "vi" ? (
            <ReactCountryFlag className="mr-1" countryCode="VN" svg />
          ) : (
            <ReactCountryFlag className="mr-1" countryCode="CN" svg />
          )}

          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent
          className={hotelTheme === "dark" ? "bg-slate-950 border-slate-700 text-white" : ""}
          style={hotelTheme === "dark" ? { backgroundColor: "#020617", borderColor: "#3f3f46" } : {}}
        >
          <SelectItem className={hotelTheme === "dark" ? "bg-slate-950 text-white" : "w-full"} value="en">
            <div className="w-full flex items-center">
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">🇺🇸</span>
              </div>
              <div className="m-1">
                <span className="mr-1">English</span>
              </div>
            </div>
          </SelectItem>
          <SelectItem className={hotelTheme === "dark" ? "bg-slate-950 text-white" : "w-full"} value="vi">
            <div className="w-full flex items-center">
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">🇻🇳</span>
              </div>
              <div className="m-1 flex items-center">
                <div className="mr-1">Việt Nam</div>
              </div>
            </div>
          </SelectItem>
          <SelectItem className={hotelTheme === "dark" ? "bg-slate-950 text-white" : "w-full"} value="cn">
            <div className="w-full flex items-center">
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">🇨🇳</span>
              </div>
              <div className="m-1 flex items-center">
                <div className="mr-1">Chinese</div>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
