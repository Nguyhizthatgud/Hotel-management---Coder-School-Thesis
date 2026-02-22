"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUISlice } from "@/stores/UI/useUIStore";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import AddBooking from "./components/AddBooking";
import { useTranslation } from "react-i18next";

// skip static prerendering for protected routes; render only on demand
export const dynamic = "force-dynamic";

const STORAGE_KEY = "hotelreception-theme";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const isHotelReception = pathname.startsWith("/hotelreception");
  const { hotelTheme, setHotelTheme } = useUISlice();
  const { user, loading, init } = useAuthStore();

  // initialize Firebase listener (first render only)
  useEffect(() => {
    init();
  }, [init]);

  // redirect if not authenticated (runs after loading finishes)
  useEffect(() => {
    if (!loading && !user) {
      toast.info(t("login_required_message"));
      router.push("/");
    }
  }, [user, loading, router, t]);

  useEffect(() => {
    if (!isHotelReception) {
      return;
    }
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      setHotelTheme(saved);
    }
  }, [isHotelReception, setHotelTheme]);

  const toggleHotelTheme = () => {
    const next = hotelTheme === "dark" ? "light" : "dark";
    setHotelTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  // show loading or block render until auth resolves
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (!user) return null; // Prevent flash before redirect

  return (
    <div className={isHotelReception && hotelTheme === "dark" ? "dark" : ""}>
      <SidebarProvider className="p-6 rounded-2xl bg-gray-50/10 dark:bg-gray-800 min-h-screen">
        <AppSidebar />
        <SidebarInset className="w-full">
          <SiteHeader showThemeToggle={isHotelReception} theme={hotelTheme} onToggleTheme={toggleHotelTheme} />
          <AddBooking hideTrigger />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
