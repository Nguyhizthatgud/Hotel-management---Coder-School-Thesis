"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
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

  return <>{children}</>;
}
