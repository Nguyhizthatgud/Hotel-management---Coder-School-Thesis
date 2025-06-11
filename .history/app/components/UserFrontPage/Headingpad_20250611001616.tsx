"use client";
import React from "react";
import Image from "next/image";
import { IoCheckmarkDone } from "react-icons/io5";
import { Oswald } from "next/font/google";
type Props = {};

const Headingpad = (props: Props) => {
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      {/* heading */}
      <div className="py-10 h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <h1 className="font-medium md:font-semibold md:text-6xl text-3xl">
          {" "}
          hệ thống quản lý tài sản khách sạn
          <br />
          <span className="headingpad__introduce-text">Miễn phí</span> & Tăng
          cường kinh doanh của bạn với hệ thống quản lý tài sản tất cả trong một
          miễn phí
        </h1>
        <p className="text-sm">
          Dễ dàng quản lý tài sản của bạn và tăng cường kinh doanh của bạn với
          các công cụ mạnh mẽ và dễ sử dụng.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <button className=" text-white px-6 py-2 rounded-lg transition-colors">
            Tạo trang web miễn phí
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Tìm hiểu thêm
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * Không cần thẻ tín dụng. Không có phí ẩn. Hủy bất cứ lúc nào.
          <br />* Tất cả các tính năng đều miễn phí trong 30 ngày đầu tiên.
        </p>
        {/* Images of poster */}

        {/* Logos of partners */}
        <p className="flex items-center text-lg font-semibold mt-8 text-green-400 ">
          <span className="mr-2 text-3xl">
            <IoCheckmarkDone />
          </span>{" "}
          Các đối tác OTA
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Chúng tôi tự hào hợp tác với các đối tác hàng đầu trong ngành công
          nghiệp du lịch.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-white">
            <Image
              src="/assets/Logo/Agoda_logo.svg.png"
              alt="Agoda Logo"
              width={48} // or your preferred width
              height={48}
              className="object-contain headingpad__scale-animation"
            />
          </div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-blue-900">
            <Image
              src="/assets/Logo/Booking.com_Icon_2022.svg"
              alt="Booking.com Logo"
              width={33} // or your preferred width
              height={33}
              className="object-contain headingpad__scale-animation"
            />
          </div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-white">
            <Image
              src="/assets/Logo/trivago-logo-svg-vector.svg"
              alt="Tripadvisor Logo"
              width={42} // or your preferred width
              height={42}
              className="object-contain headingpad__scale-animation"
            />
          </div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-blue-950">
            <Image
              src="/assets/Logo/icons8-expedia.svg"
              alt="Expedia Logo"
              width={57}
              height={57}
              className="object-contain headingpad__scale-animation"
            />
          </div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-red-500">
            <Image
              src="/assets/Logo/red-book.png"
              alt="Red Book Logo"
              width={46}
              height={46}
              className="object-contain headingpad__scale-animation"
            />
          </div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-white">
            <Image
              src="/assets/Logo/tripadvisor-icon.png"
              alt="Tripadvisor Logo"
              width={56} // or your preferred width
              height={56}
              className="object-contain headingpad__scale-animation"
            />
          </div>
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-white">
            <Image
              src="/assets/Logo/traveloka-logo_brandlogos.net_gdkey-300x300.png"
              alt="Traveloka Logo"
              width={48} // or your preferred width
              height={48}
              className="object-contain headingpad__scale-animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Headingpad;
