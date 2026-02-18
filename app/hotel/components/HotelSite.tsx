"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

import { useTranslation } from "react-i18next";
const HotelSite = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, loading } = useAuthStore();
  console.log("HotelSite render - user:", user, "loading:", loading);
  const handleGetStarted = () => {
    if (user) {
      router.push("/hotelreception");
    } else {
      toast.error(t("hotel_site_toast_error"));
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
          <div className="absolute top-32 right-32 w-96 h-96 bg-linear-to-br from-orange-300/20 to-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-tr from-yellow-300/15 to-orange-300/15 rounded-full blur-2xl"></div>

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
              {t("hotel_site_posterText_line1")} <br />
              {t("hotel_site_posterText_line2")} <br />
              <span className="poster-text text-amber-600">{t("hotel_site_posterText_line3")}</span>
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
                <p className="text-sm text-gray-500">{t("hotel_site_posterText_disclaimer2")}</p>
              </div>
              <div className="flex flex-col gap-4 p-4 mt-50">
                <p className="poster-text text-xl text-gray-600 font-light">
                  &quot;{t("hotel_site_greatest_tool")}&quot;.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg"
                  onClick={handleGetStarted}
                >
                  {t("hotel_site_posterText_tryout_button1")}
                </button>
                <button className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  {t("hotel_site_posterText_tryout_button2")}
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
            <p className="service-content text-4xl mt-10 mx-auto">{t("hotel_site_service_heading")}</p>
          </div>
          <Tabs
            defaultActiveKey="1"
            className="custom-tabs text-center"
            centered={true}
            items={[
              {
                label: <span className="tab-label">{t("hotel_site_service_1_title")}</span>,
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
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("hotel_site_service_1_subtitle")}</h3>
                        <p className="text-gray-700 leading-8 mb-4 service-details">{t("hotel_site_service_1_desc")}</p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>{t("hotel_site_service_1_list1")}</li>
                          <li>{t("hotel_site_service_1_list2")}</li>
                          <li>{t("hotel_site_service_1_list3")}</li>
                          <li>{t("hotel_site_service_1_list4")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">{t("hotel_site_service_2_title")}</span>,
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
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("hotel_site_service_2_subtitle")}</h3>
                        <p className="text-gray-700 leading-8 mb-4 service-details">{t("hotel_site_service_2_desc")}</p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>{t("hotel_site_service_2_list1")}</li>
                          <li>{t("hotel_site_service_2_list2")}</li>
                          <li>{t("hotel_site_service_2_list3")}</li>
                          <li>{t("hotel_site_service_2_list4")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label text-shadow-amber-50">{t("hotel_site_service_3_title")}</span>,
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
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("hotel_site_service_3_subtitle")}</h3>
                        <p className="text-gray-700 mb-4 leading-8 service-details">{t("hotel_site_service_3_desc")}</p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>{t("hotel_site_service_3_list1")}</li>
                          <li>{t("hotel_site_service_3_list2")}</li>
                          <li>{t("hotel_site_service_3_list3")}</li>
                          <li>{t("hotel_site_service_3_list4")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">{t("hotel_site_service_4_title")}</span>,
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
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("hotel_site_service_4_subtitle")}</h3>
                        <p className="text-gray-700 mb-4 leading-8 service-details">{t("hotel_site_service_4_desc")}</p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>{t("hotel_site_service_4_list1")}</li>
                          <li>{t("hotel_site_service_4_list2")}</li>
                          <li>{t("hotel_site_service_4_list3")}</li>
                          <li>{t("hotel_site_service_4_list4")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">{t("hotel_site_service_5_title")}</span>,
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
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("hotel_site_service_5_subtitle")}</h3>
                        <p className="text-gray-700 mb-4 leading-8 service-details">{t("hotel_site_service_5_desc")}</p>
                        <ul className="text-gray-600 space-y-2 leading-8 service-details">
                          <li>{t("hotel_site_service_5_list1")}</li>
                          <li>{t("hotel_site_service_5_list2")}</li>
                          <li>{t("hotel_site_service_5_list3")}</li>
                          <li>{t("hotel_site_service_5_list4")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: <span className="tab-label">{t("hotel_site_service_6_title")}</span>,
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
                        <h3 className="text-2xl font-bold mb-4 text-amber-600">{t("hotel_site_service_6_subtitle")}</h3>
                        <p className="text-gray-700 leading-8 space-y-2 service-details">
                          {t("hotel_site_service_6_desc")}
                        </p>
                        <ul className="text-gray-600 space-y-2 leading-10 service-details">
                          <li>{t("hotel_site_service_6_list1")}</li>
                          <li>{t("hotel_site_service_6_list2")}</li>
                          <li>{t("hotel_site_service_6_list3")}</li>
                          <li>{t("hotel_site_service_6_list4")}</li>
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
      <section className="bg-amber-50/50">
        {/* application section */}
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{t("hotel_site_application_1")}</h2>
              <p className="text-gray-600 leading-7">{t("hotel_site_application_1_ul")}</p>
              <ul className="text-gray-600 space-y-2">
                <li>{t("hotel_site_application_1_ul_li1")}</li>
                <li>{t("hotel_site_application_1_ul_li2")}</li>
                <li>{t("hotel_site_application_1_ul_li3")}</li>
              </ul>
            </div>
            <Image
              className="relative  object-cover h-100 md:h-120 lg:h-[600px]"
              src="/assets/img/Application/resort-management-software-2.png"
              alt="Hotel Management Dashboard"
              width={700}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className="bg-amber-50/50">
        {/* application section */}
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Image
              className="relative  object-cover h-100 md:h-120 lg:h-[600px]"
              src="/assets/img/Application/resort-management-software-3.png"
              alt="Hotel Management Dashboard"
              width={700}
              height={500}
            />
            <div className="space-y-4 flex flex-col ">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{t("hotel_site_application_2")}</h2>
              <p className="text-gray-600 leading-7">{t("hotel_site_application_2_ul")}</p>
              <ul className="text-gray-600 space-y-2 self-right">
                <li>{t("hotel_site_application_2_ul_li1")}</li>
                <li>{t("hotel_site_application_2_ul_li2")}</li>
                <li>{t("hotel_site_application_2_ul_li3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-amber-50/50">
        {/* application section */}
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{t("hotel_site_application_3")}</h2>
              <p className="text-gray-600 leading-7">{t("hotel_site_application_3_ul")}</p>
              <ul className="text-gray-600 space-y-2">
                <li>{t("hotel_site_application_3_ul_li1")}</li>
                <li>{t("hotel_site_application_3_ul_li2")}</li>
                <li>{t("hotel_site_application_3_ul_li3")}</li>
              </ul>
            </div>
            <Image
              className="relative  object-cover h-100 md:h-120 lg:h-[600px]"
              src="/assets/img/Application/resort-management-software-4.png"
              alt="Hotel Management Dashboard"
              width={600}
              height={670}
            />
          </div>
        </div>
      </section>
      <section className="bg-white">
        {/* Demo section */}
        <div className="container mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <form className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Họ</label>
                  <input
                    type="text"
                    placeholder="Nguyễn"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tên</label>
                  <input
                    type="text"
                    placeholder="Văn A"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="email@company.com"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm text-gray-600">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="0909 000 000"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm text-gray-600">Tên khách sạn</label>
                <input
                  type="text"
                  placeholder="Khách sạn ABC"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Đặt lịch demo
              </button>
            </form>
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{t("hotel_site_signform_title")}</h2>
              <p className="text-gray-600 leading-7">{t("hotel_site_signform_subtitle")}</p>
              <ul className="text-gray-600 space-y-2">
                <li>{t("hotel_site_signform_li1")}</li>
                <li>{t("hotel_site_signform_li2")}</li>
                <li>{t("hotel_site_signform_li3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelSite;
