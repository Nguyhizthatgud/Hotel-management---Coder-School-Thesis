"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Headingpad from "./Headingpad";
import Service from "./Service";

const Userfrontfield = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    // Only redirect if user is logged in and loading is complete
    if (!loading && user) {
      const savedService = localStorage.getItem("selectedService");
      if (savedService) {
        // Redirect to the saved service dashboard
        router.push(savedService);
      }
    }
  }, [user, loading, router]);

  return (
    <section>
      {/* heading */}
      <Headingpad />
      <Service />

      {/* image hotel room showcase */}
    </section>
  );
};

export default Userfrontfield;
