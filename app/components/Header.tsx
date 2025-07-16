"use client";
import Link from "next/link";
import React from "react";
import "@ant-design/v5-patch-for-react-19";

import { useTheme } from "next-themes";
import { SiApachepulsar } from "react-icons/si";
import { MdModeNight, MdLightMode } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { Modal, Tabs, Avatar, Button as Button1, Menu } from "antd";
import { FaHotel } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { GiFamilyHouse, GiTreehouse } from "react-icons/gi";
import { PiWarehouseThin } from "react-icons/pi";
import type { MenuProps } from "antd";
import ReactCountryFlag from "react-country-flag";
import LoginSignupPage from "./LoginSignupPage";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Button } from "@/components/ui/button";

type Props = {
  money: string;
};

const Header = () => {
  const [openCurrency, setOpenCurrency] = React.useState(false);
  const [openSign, setOpenSign] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const [selectedCurrency, setSelectedCurrency] = React.useState<{
    code: string;
    symbol: string;
    nation: string;
  } | null>(null);
  const handleCancel = () => {
    setOpenCurrency(false);
    setOpenSign(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="mx-5 my-5">
          <h2 className="text-dark-400 text-2xl font-semibold my-3 border-b border-gray-200">Các Tính Năng</h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-3 mx-3">
              <h3 className="text-gray-400 text-lg">Loại Tài Sản</h3>
              <ul className=" pl-5 text-semibold">
                <li className="my-5 group flex items-center gap-2">
                  <Link
                    href="/hotels"
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 ease-in-out group"
                  >
                    <FaHotel className="text-amber-500" />
                    <span className="text-gray-600 group-hover:text-amber-600 group group-hover:font-bold">
                      Khách Sạn
                    </span>
                  </Link>
                </li>
                <li className="my-5 flex items-center gap-2 group">
                  <Link
                    href="/hotels"
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 ease-in-out group"
                  >
                    <RiHotelLine className="text-amber-500" />
                    <span className="text-gray-600 group-hover:text-amber-600 group group-hover:font-bold">
                      Nhà Nghỉ B&B
                    </span>
                  </Link>
                </li>
                <li className="my-5 flex items-center gap-2 group">
                  <Link
                    href="/hotels"
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 ease-in-out group"
                  >
                    <GiFamilyHouse className="text-amber-500" />
                    <span className="text-gray-600 group-hover:text-amber-600 group group-hover:font-bold">Căn Hộ</span>
                  </Link>
                </li>
                <li className="my-5 flex items-center gap-2 group">
                  <Link
                    href="/hotels"
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 ease-in-out group"
                  >
                    <GiTreehouse className="text-amber-500" />
                    <span className="text-gray-600 group-hover:text-amber-600 group group-hover:font-bold">
                      Biệt Thự
                    </span>
                  </Link>
                </li>
                <li className="my-5 flex items-center gap-2 group">
                  <Link
                    href="/hotels"
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 ease-in-out group"
                  >
                    <PiWarehouseThin className="text-amber-500" />
                    <span className="text-gray-600 group-hover:text-amber-600 group group-hover:font-bold">
                      Nhà Nguyên Căn
                    </span>
                  </Link>
                </li>
                <li className="my-5 flex items-center gap-2 group">
                  <Link
                    href="/hotels"
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 ease-in-out group"
                  >
                    <FaHotel className="text-amber-500 group-hover:text-amber-600" />
                    <span className="text-gray-600 group-hover:text-amber-600 group group-hover:font-bold">
                      Homestay
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-400 text-lg">Kênh Quảng Cáo</h3>
              <ul className=" pl-5 text-semibold">
                <li className="my-5">Trực Tuyến</li>
                <li className="my-5">Truyền Thống</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-400 text-lg">Đối Tượng Khách Hàng</h3>
              <ul className=" pl-4 text-semibold">
                <li className="my-5">Doanh Nghiệp</li>
                <li className="my-5">Gia Đình</li>
                <li className="my-5">Cặp Đôi</li>
                <li className="my-5">Nhóm Bạn Bè</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  const countryNames: { [key: string]: string } = {
    VN: "Việt Nam",
    US: "United States",
    EU: "European Union",
    JP: "Japan",
    GB: "United Kingdom",
    AU: "Australia",
    CA: "Canada",
    CH: "Switzerland",
    CN: "China",
    SE: "Sweden",
    NZ: "New Zealand",
    MX: "Mexico",
    SG: "Singapore",
    HK: "Hong Kong",
    NO: "Norway",
    KR: "South Korea",
    TR: "Turkey",
    RU: "Russia",
    IN: "India",
    BR: "Brazil",
    ZA: "South Africa",
    PL: "Poland",
    TH: "Thailand",
    AE: "United Arab Emirates",
    AR: "Argentina",
    CL: "Chile",
    CO: "Colombia",
    PH: "Philippines",
    MY: "Malaysia",
    ID: "Indonesia",
    PK: "Pakistan",
    TW: "Taiwan",
    HU: "Hungary",
    CZ: "Czech Republic",
    ILS: "Israel",
    DOP: "Dominican Republic",
    NG: "Nigeria",
    UAH: "Ukraine",
    RO: "Romania",
    SAR: "Saudi Arabia",
    QAR: "Qatar"

    // add more country codes and names as needed
  };
  const currencies = [
    { code: "VND", symbol: "₫", nation: "VN" },
    { code: "USD", symbol: "$", nation: "US" },
    { code: "EUR", symbol: "€", nation: "EU" },
    { code: "JPY", symbol: "¥", nation: "JP" },
    { code: "GBP", symbol: "£", nation: "GB" },
    { code: "AUD", symbol: "$", nation: "AU" },
    { code: "CAD", symbol: "$", nation: "CA" },
    { code: "CHF", symbol: "CHF", nation: "CH" },
    { code: "CNY", symbol: "¥", nation: "CN" },
    { code: "SEK", symbol: "kr", nation: "SE" },
    { code: "NZD", symbol: "$", nation: "NZ" },
    { code: "MXN", symbol: "$", nation: "MX" },
    { code: "SGD", symbol: "$", nation: "SG" },
    { code: "HKD", symbol: "$", nation: "HK" },
    { code: "NOK", symbol: "kr", nation: "NO" },
    { code: "KRW", symbol: "₩", nation: "KR" },
    { code: "TRY", symbol: "₺", nation: "TR" },
    { code: "RUB", symbol: "₽", nation: "RU" },
    { code: "INR", symbol: "₹", nation: "IN" },
    { code: "BRL", symbol: "R$", nation: "BR" },
    { code: "ZAR", symbol: "R", nation: "ZA" },
    { code: "PLN", symbol: "zł", nation: "PL" },
    { code: "THB", symbol: "฿", nation: "TH" },
    { code: "AED", symbol: "د.إ", nation: "AE" },
    { code: "ARS", symbol: "$", nation: "AR" },
    { code: "CLP", symbol: "$", nation: "CL" },
    { code: "COP", symbol: "$", nation: "CO" },
    { code: "PHP", symbol: "₱", nation: "PH" },
    { code: "MYR", symbol: "RM", nation: "MY" },
    { code: "IDR", symbol: "Rp", nation: "ID" },
    { code: "PKR", symbol: "₨", nation: "PK" },
    { code: "TWD", symbol: "$", nation: "TW" },
    { code: "HUF", symbol: "Ft", nation: "HU" },
    { code: "CZK", symbol: "Kč", nation: "CZ" }

    // add more currency objects as needed
  ];
  return (
    <section className="header w-full py-4 ">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center md:w-2/3">
            <SiApachepulsar className="text-4xl text-orange-400" />
            <Link className="text-3xl cursor-pointer mr-7" href="">
              <span className="text-orange-400">A</span>
              <span>pache</span>
            </Link>
            <Avatar className="text-2xl p-2" />
            <div className="cursor-pointer text-2xl mx-5" onClick={handleThemeChange}>
              {theme === "dark" ? <MdModeNight className="" /> : <MdLightMode className="" />}
            </div>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow={true}
              onOpenChange={setOpenDropdown}
              overlayClassName="no-hover-dropdown"
            >
              <Button variant="ghost" className="mx-1 text-lg font-semibold group flex items-center">
                Nền tảng số
                <CaretDownOutlined
                  className={
                    "transition-transform duration-200 group-hover:rotate-180" + (openDropdown ? " rotate-180" : "")
                  }
                />
              </Button>
            </Dropdown>
            <Button variant="ghost" className="mx-3 text-lg font-semibold">
              Giá dịch vụ
            </Button>
          </div>
          <div className="flex gap-4 text-lg font-semibold justify-end items-center w-full md:w-1/3">
            {
              <Button
                variant="secondary"
                className=" "
                onClick={() => {
                  setOpenCurrency(true);
                  console.log("open currency: ", openCurrency);
                }}
              >
                {selectedCurrency ? (
                  <div className="flex flex-row gap-1">
                    <ReactCountryFlag countryCode={selectedCurrency.nation} svg />|
                    <span className="mr-2">{selectedCurrency.code}</span>
                  </div>
                ) : (
                  <div className="currency flex flex-row gap-1 items-center justify-center">
                    <AiOutlineGlobal />/<MdCurrencyExchange />
                  </div>
                )}
              </Button>
            }
            <Modal open={openCurrency} onCancel={handleCancel} footer={null} width={1200}>
              <Tabs>
                <Tabs.TabPane tab="Tiền Tệ & Ngôn Ngữ" key="1">
                  <div className="text-sm font-bold">Chọn mệnh giá quy đổi và ngôn ngữ đề xuất</div>
                  <div className="grid grid-cols-6 gap-4 p-4 overflow-y-auto max-h-96">
                    {currencies.slice(0, 6).map((currency) => (
                      <div
                        key={currency.code}
                        className="gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md "
                        onClick={() => {
                          console.log("Selected:", currency);
                          setSelectedCurrency(currency);
                          setOpenCurrency(false);
                        }}
                      >
                        <ReactCountryFlag
                          countryCode={currency.nation}
                          svg
                          style={{ width: "1.5em", height: "1.5em" }}
                          title={currency.nation}
                        />
                        <span className="px-2">{currency.code}</span>/<span className="px-1">{currency.symbol}</span>
                        <div>
                          <span className="text-gray-500 text-sm">
                            {countryNames[currency.nation] || currency.nation}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-bold p-2">Tất cả mệnh giá và ngôn ngữ</div>
                  <div className="grid grid-cols-6 gap-4 p-4 overflow-y-auto max-h-96">
                    {currencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md "
                        onClick={() => {
                          console.log("Selected:", currency);
                          setSelectedCurrency(currency);
                          setOpenCurrency(false);
                        }}
                      >
                        <ReactCountryFlag
                          countryCode={currency.nation}
                          svg
                          style={{ width: "1.5em", height: "1.5em" }}
                          title={currency.nation}
                        />
                        <span className="px-2">{currency.code}</span>/<span className="px-1">{currency.symbol}</span>
                        <div>
                          <span className="text-gray-500 text-sm">
                            {countryNames[currency.nation] || currency.nation}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Modal>
            <Button
              className="bg-orange-400 text-white hover:bg-orange-600 transition-colors px-4 py-2 rounded-md"
              onClick={() => {
                setOpenSign(true);
              }}
            >
              Đăng nhập/Đăng ký
            </Button>
            <Modal open={openSign} onCancel={handleCancel} footer={null} className="login-modal">
              <LoginSignupPage />
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Header;
