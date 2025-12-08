"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
const HotelSite = () => {
  const router = useRouter();
  const { user, loading } = useAuthStore();
  console.log("HotelSite render - user:", user, "loading:", loading);
  const handleGetStarted = () => {
    if (user) {
      router.push("/hotelreception");
    } else {
      toast.error("Vui lòng đăng nhập để tiếp tục.");
    }
  };
  return (
    <>
      <section
        className="hero-section flex items-center w-screen relative overflow-hidden pt-10"
        style={{ backgroundColor: "#fff5ee" }}
      >
        {/* super graphic layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large geometric shapes */}
          <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-yellow-300/15 to-orange-300/15 rounded-full blur-2xl"></div>

          {/* Geometric patterns */}
          <div className="absolute top-10 left-10 w-10 h-10 bg-amber-400/30 rotate-45 transform"></div>
          <div className="absolute top-20 left-32 w-6 h-6 bg-orange-400/25 rotate-12 transform"></div>
          <div className="absolute bottom-32 right-20 w-8 h-8 bg-yellow-400/20 rotate-45 transform"></div>

          {/* Bottom Wave */}
          <svg
            className="absolute bottom-0 left-0 w-full h-16 md:h-32 lg:h-40 opacity-40 scale-y-[-1]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="currentColor"
              className="text-orange-300"
            />
          </svg>
        </div>
        <div className="container mx-auto py-10 relative">
          {/* describe of poster */}
          <div className="poster-text absolute right-50  top-50 items-start gap-6 z-10">
            <h1 className="poster-text text-4xl lg:text-7xl font-bold text-gray-800 leading-tight gap-7">
              Nền Tảng <br />
              Quản lý khách sạn <br />
              <span className="poster-text text-amber-600">chuyên nghiệp</span>
            </h1>
          </div>

          {/* Images of poster */}
          <div className="flex p-15">
            <Image
              className="relative  object-cover h-100 md:h-120 lg:h-[600px]"
              src="/assets/img/heroSlider/hotel-unsplash.jpg"
              alt="Hotel Management Dashboard"
              width={800}
              height={600}
            />
            <div className="flex flex-col justify-between">
              <div className="flex flex-col items-end gap-4 border-r-gray-400 border-r-2 pr-4">
                <div className="flex items-center gap-2 text-yellow-500 text-sm">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-sm text-gray-500">Công cụ hỗ trợ #1 cho các chủ sở hữu khách sạn và nhà nghỉ</p>
              </div>
              <div className="flex flex-col gap-4 p-4 mt-50">
                <p className="poster-text text-xl text-gray-600 font-light">
                  &quot;Cung cấp dịch vụ quản lý tất cả trong một cho khách sạn&quot;.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg"
                  onClick={handleGetStarted}
                >
                  Bắt đầu miễn phí
                </button>
                <button className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  Xem demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        {/* Service Section */}
        <div className="container mx-auto h-auto py-10">
          <div className="text-center my-5">
            <p className="service-content text-4xl mt-10 mx-auto">
              Chúng tôi là tất cả những điều bạn cần cho giải pháp quản lý khách sạn thông minh.
            </p>
          </div>
          <Tabs
            defaultActiveKey="1"
            className="custom-tabs text-center"
            centered={true}
            items={[
              {
                label: <span className="tab-label">Quản lý đặt phòng</span>,
                key: "1",
                children: (
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="p-15">
                        <Image
                          className="object-cover rounded-2xl w-full h-auto"
                          src="/assets/img/roomImages/2-lg.png"
                          alt="Khách sạn 2"
                          width={500}
                          height={300}
                        />
                      </div>
                      <div className="p-5 m-10 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">Quản lý khách sạn chuyên nghiệp</h3>
                        <p className="text-gray-700 leading-8 mb-4 service-details">
                          Hệ thống quản lý khách sạn toàn diện với đầy đủ tính năng từ đặt phòng, check-in/out, quản lý
                          dịch vụ đến báo cáo doanh thu chi tiết. Tích hợp công nghệ hiện đại giúp tối ưu hóa vận hành
                          và nâng cao trải nghiệm khách hàng.
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>• Quản lý đặt phòng trực tuyến</li>
                          <li>• Tích hợp PMS và Channel Manager</li>
                          <li>• Báo cáo doanh thu real-time</li>
                          <li>• Hỗ trợ đa ngôn ngữ</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">Tiếp tân</span>,
                key: "2",
                children: (
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="p-15">
                        <Image
                          className="object-cover rounded-2xl w-full h-auto"
                          src="/assets/img/roomImages/1-lg.png"
                          alt="Khách sạn 1"
                          width={500}
                          height={300}
                        />
                      </div>
                      <div className="p-5 m-10 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">Giải pháp cho nhà nghỉ B&B</h3>
                        <p className="text-gray-700 leading-8 mb-4 service-details">
                          Phù hợp với các cơ sở lưu trú quy mô nhỏ. Giao diện đơn giản, dễ sử dụng với các tính năng cơ
                          bản nhưng đầy đủ để quản lý hiệu quả việc kinh doanh nhà nghỉ và B&B.
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>• Quản lý phòng đơn giản</li>
                          <li>• Tính năng check-in nhanh</li>
                          <li>• Theo dõi khách hàng thân thiết</li>
                          <li>• Báo cáo tài chính cơ bản</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label text-shadow-amber-50">Thông tin chi tiết</span>,
                key: "3",
                children: (
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="p-15">
                        <Image
                          className="object-cover rounded-2xl w-full h-auto"
                          src="/assets/img/roomImages/3-lg.png"
                          alt="Khách sạn 2"
                          width={500}
                          height={300}
                        />
                      </div>
                      <div className="p-5 m-10 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">Quản lý căn hộ dịch vụ</h3>
                        <p className="text-gray-700 mb-4 leading-8 service-details">
                          Giải pháp tối ưu cho việc quản lý căn hộ dịch vụ và cho thuê ngắn hạn. Hệ thống hỗ trợ quản lý
                          nhiều căn hộ cùng lúc, tự động hóa quy trình từ đặt phòng đến thanh toán, giúp tối đa hóa lợi
                          nhuận và giảm thiểu công việc quản lý thủ công.
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-8">
                          <li>• Quản lý đa căn hộ trên một nền tảng</li>
                          <li>• Tích hợp với Airbnb, Booking.com</li>
                          <li>• Quản lý lịch trình dọn dẹp</li>
                          <li>• Báo cáo thu chi theo từng căn hộ</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">Hoạt động khách hàng</span>,
                key: "4",
                children: (
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="p-15">
                        <Image
                          className="object-cover rounded-2xl w-full h-auto"
                          src="/assets/img/roomImages/4-lg.png"
                          alt="Khách sạn 4"
                          width={500}
                          height={300}
                        />
                      </div>
                      <div className="p-5 m-10 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">Quản lý biệt thự cao cấp</h3>
                        <p className="text-gray-700 mb-4 leading-8 service-details">
                          Giải pháp chuyên biệt cho các biệt thự nghỉ dưỡng và villa cho thuê. Hệ thống tích hợp các
                          dịch vụ concierge, quản lý nhân viên, bảo trì tài sản và trải nghiệm khách hàng VIP. Phù hợp
                          cho các biệt thự đơn lẻ đến chuỗi resort villa.
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>• Dịch vụ concierge và butler</li>
                          <li>• Quản lý bảo trì tài sản</li>
                          <li>• Booking dài hạn và sự kiện</li>
                          <li>• Báo cáo chi phí vận hành</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">Thanh toán</span>,
                key: "5",
                children: (
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="p-15">
                        <Image
                          className="object-cover rounded-2xl w-full h-auto"
                          src="/assets/img/roomImages/5-lg.png"
                          alt="Khách sạn 5"
                          width={500}
                          height={300}
                        />
                      </div>
                      <div className="p-5 m-10 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">Quản lý nhà nguyên căn</h3>
                        <p className="text-gray-700 mb-4 leading-8 service-details">
                          Tối ưu cho việc cho thuê nhà nguyên căn theo ngày, tuần hoặc tháng. Hệ thống hỗ trợ quản lý từ
                          xa, theo dõi tình trạng nhà cửa, lập lịch dọn dẹp và bảo trì. Tích hợp với các nền tảng
                          Airbnb, Booking.com để tối đa hóa tỷ lệ lấp đầy.
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>• Quản lý từ xa qua mobile app</li>
                          <li>• Lập lịch dọn dẹp tự động</li>
                          <li>• Theo dõi tiện ích và hóa đơn</li>
                          <li>• Hỗ trợ check-in self-service</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">Metasearch </span>,
                key: "6",
                children: (
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="p-15">
                        <Image
                          className="object-cover rounded-2xl w-full h-auto"
                          src="/assets/img/roomImages/6-lg.png"
                          alt="Khách sạn 2"
                          width={500}
                          height={300}
                        />
                      </div>
                      <div className="p-5 m-10 text-left">
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">Quản lý homestay gia đình</h3>
                        <p className="text-gray-700 leading-8 space-y-2 service-details">
                          Dành riêng cho các homestay gia đình và du lịch cộng đồng. Tính năng đơn giản, dễ sử dụng với
                          focus vào trải nghiệm khách hàng và văn hóa địa phương. Hỗ trợ quản lý tour, hoạt động và dịch
                          vụ ăn uống tại chỗ.
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-10 service-details">
                          <li>• Quản lý tour và hoạt động</li>
                          <li>• Menu ăn uống gia đình</li>
                          <li>• Đánh giá trải nghiệm khách</li>
                          <li>• Kết nối cộng đồng địa phương</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default HotelSite;
