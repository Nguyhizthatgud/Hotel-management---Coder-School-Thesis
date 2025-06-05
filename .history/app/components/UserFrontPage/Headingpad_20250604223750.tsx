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
        <p className="text-gray-500 text-sm">
          Tạo trang web khách sạn miễn phí, quản lý đặt phòng và khách hàng, và
          nhận thanh toán trực tuyến với hệ thống quản lý tài sản khách Sạn miễn
          phí của chúng tôi. Dễ dàng quản lý tài sản của bạn và tăng cường kinh
          doanh của bạn với các công cụ mạnh mẽ và dễ sử dụng.
        </p>

        <div className="flex items-center gap-2 mt-4">
          <img
            src="/images/agoda-logo.png"
            alt="Agoda Logo"
            className="w-24 h-8 object-contain"
          />
          <img
            src="/images/booking-logo.png"
            alt="Booking Logo"
            className="w-24 h-8 object-contain"
          />
          <img
            src="/images/expedia-logo.png"
            alt="Expedia Logo"
            className="w-24 h-8 object-contain"
          />
          <img
            src="/images/tripadvisor-logo.png"
            alt="Tripadvisor Logo"
            className="w-24 h-8 object-contain"
          />
        </div>
      </div>
    </section>
  );
};
export default Headingpad;
