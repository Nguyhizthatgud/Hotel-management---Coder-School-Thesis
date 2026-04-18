import React from "react";
import { useUISlice } from "@/stores/UI/useUIStore";
const Loading = () => {
  const { hotelTheme } = useUISlice();
  return (
    <>
      <div
        className={
          hotelTheme === "dark"
            ? "fixed inset-0 flex items-center justify-center bg-gray-800 z-50"
            : "fixed inset-0 flex items-center justify-center bg-white z-50"
        }
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
