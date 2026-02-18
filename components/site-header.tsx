"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUISlice } from "@/stores/UI/useUIStore";
import { Button } from "./ui/button";

import { Moon, Sun } from "lucide-react";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type SiteHeaderProps = {
  showThemeToggle?: boolean;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
};

export function SiteHeader({ showThemeToggle = false, theme = "light", onToggleTheme }: SiteHeaderProps) {
  const propSelection = useUISlice((state) => state.propSelection);
  const isDark = theme === "dark";
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className={isDark ? "text-white -ml-1" : "-ml-1"} />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div
          className={
            isDark ? "text-white hidden md:font-medium italic md:block" : "hidden md:font-medium italic md:block"
          }
        >
          Mô hình quản lý cho {propSelection}{" "}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          {showThemeToggle && (
            <Button variant="outline" size="icon" onClick={onToggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="size-5 text-white" /> : <Moon className="size-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
