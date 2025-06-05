import React from "react";

type Props = {};

const Headingpad = (props: Props) => {
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      {/* heading */}
      <div className="py-10 h-full">
        <h1 className="font-heading mb-6 text-3xl text-gray-600">
          Tăng cường kinh doanh của bạn với hệ thống quản lý tài sản tất cả
          trong một miễn phí
        </h1>
      </div>
    </section>
  );
};
export default Headingpad;
