import React from "react";
import { Spinner } from "@/components/ui/spinner";
const Loading = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Spinner className="w-12 h-12 text-gray-500 animate-spin" />
      </div>
    </>
  );
};

export default Loading;
