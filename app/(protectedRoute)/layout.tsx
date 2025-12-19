"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

// Skip static prerendering for protected routes; render only on demand
export const dynamic = "force-dynamic";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, init } = useAuthStore();

  // Initialize Firebase listener (first render only)
  useEffect(() => {
    init();
  }, [init]);

  // Redirect if not authenticated (runs after loading finishes)
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Vui lòng đăng nhập để tiếp tục");
    }
  }, [user, loading, router]);

  // Show loading or block render until auth resolves
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (!user) return null; // Prevent flash before redirect

  return (
    <SidebarProvider className="p-6 bg-gray-50 min-h-screen">
      <AppSidebar />
      <SidebarInset className="w-full">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
