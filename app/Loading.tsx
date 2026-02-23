import React from "react";
const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
