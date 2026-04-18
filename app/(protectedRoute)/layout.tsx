"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUISlice } from "@/stores/UI/useUIStore";
import { toast } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import AddBooking from "./components/AddBooking";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "hotelreception-theme";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const isHotelReception = pathname.startsWith("/hotelreception");
  const { hotelTheme, setHotelTheme } = useUISlice();
  const { user, loading, init } = useAuthStore();
  const hasShownToastRef = useRef(false); // prevent multiple toasts/redirects

  // initialize Firebase listener (first render only)
  useEffect(() => {
    init();
  }, [init]);

  // redirect if not authenticated (runs after loading finishes)
  useEffect(() => {
    if (!loading && !user && !hasShownToastRef.current) {
      hasShownToastRef.current = true; // prevent multiple toasts

      toast.error(t("login_required_message")); //Use error for better visibility

      const timer = setTimeout(() => {
        router.push("/");
      }, 1500); // 1.5s to read the message

      return () => clearTimeout(timer);
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
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
        </div>
      </div>
    );
  if (!user) return null; // Prevent flash before redirect

  return (
    isHotelReception && (
      <div className={hotelTheme === "dark" ? "dark" : ""}>
        <SidebarProvider className={`min-h-screen ${hotelTheme === "dark" ? "bg-gray-800" : "bg-gray-50/10"}`}>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader showThemeToggle={isHotelReception} theme={hotelTheme} onToggleTheme={toggleHotelTheme} />
            <AddBooking hideTrigger />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 px-3 lg:px-6 py-4 md:gap-6 md:py-6">{children}</div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    )
  );
}
