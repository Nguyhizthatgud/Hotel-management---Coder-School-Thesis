"use client";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loading from "../Loading";
import { useAuthStore } from "@/stores/useAuthStore";

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const initAuth = useAuthStore((state) => state.init);

  useEffect(() => {
    // Initialize auth on app load
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {" "}
      {isLoading && <Loading />}
      {children}
    </>
  );
};
