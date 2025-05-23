"use client";
import Link from "next/link";
import React from "react";
import "@ant-design/v5-patch-for-react-19";
import CustomButton from "./CustomButton";
import { useTheme } from "next-themes";
import { TbBrandAirbnb } from "react-icons/tb";
import { LuCircleUserRound } from "react-icons/lu";
import { Alfa_Slab_One } from "next/font/google";
import { MdModeNight, MdLightMode } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { Modal, Tabs } from "antd";
import ReactCountryFlag from "react-country-flag";

const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alfa",
});

type Props = {
  money: string;
};

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
    QAR: "Qatar",

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
    { code: "CZK", symbol: "Kč", nation: "CZ" },

    // add more currency objects as needed
  ];
  return (
    <div className="py-4 px-6 mx-auto container">
      <div className="flex flex-row justify-around">
        <div className="flex gap-2 items-center w-full md:2/3">
          <TbBrandAirbnb className="text-4xl text-orange-600" />
          <Link className={`${alfa.className} text-2xl pr-3`} href="">
            <span className="text-orange-600">A</span>
            pache
          </Link>
          <LuCircleUserRound className="text-2xl pr-2" />
          <div className="" onClick={handleThemeChange}>
            {theme === "dark" ? (
              <MdModeNight className="" />
            ) : (
              <MdLightMode className="" />
            )}
          </div>
        </div>
        <div className="flex ml-auto gap-4 text-lg font-semibold">
          {
            <CustomButton
              className="text-5xl"
              onClick={() => {
                setOpen(true);
                console.log("open currency: ", open);
              }}
            >
              <div className="currency flex flex-row gap-1 items-center">
                <AiOutlineGlobal />/
                <MdCurrencyExchange />
              </div>
            </CustomButton>
          }
          <Modal open={open} onCancel={handleCancel} footer={null} width={1200}>
            <Tabs>
              <Tabs.TabPane tab="Tiền Tệ & Ngôn Ngữ" key="1">
                <div className="text-sm font-bold">
                  Chọn mệnh giá quy đổi và ngôn ngữ đề xuất
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 overflow-y-auto max-h-96">
                  {currencies.slice(0, 6).map((currency) => (
                    <div
                      key={currency.code}
                      className="gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md "
                      onClick={() => {
                        console.log("Selected:", currency);
                        setOpen(false);
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={currency.nation}
                        svg
                        style={{ width: "1.5em", height: "1.5em" }}
                        title={currency.nation}
                      />
                      <span className="px-2">{currency.code}</span>/
                      <span className="px-1">{currency.symbol}</span>
                      <div>
                        <span className="text-gray-500 text-sm">
                          {countryNames[currency.nation] || currency.nation}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold p-2">
                  Tất cả mệnh giá và ngôn ngữ
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 overflow-y-auto max-h-96">
                  {currencies.map((currency) => (
                    <div
                      key={currency.code}
                      className="gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md "
                      onClick={() => {
                        console.log("Selected:", currency);
                        setOpen(false);
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={currency.nation}
                        svg
                        style={{ width: "1.5em", height: "1.5em" }}
                        title={currency.nation}
                      />
                      <span className="px-2">{currency.code}</span>/
                      <span className="px-1">{currency.symbol}</span>
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
          <CustomButton>Đăng nhập</CustomButton>
          <CustomButton>Đăng ký</CustomButton>
        </div>
      </div>
      <div className="mt-4">
        <ul className="flex flex-row md:text-lg text-sm font-semibold">
          <li className="px-2 ">Khách Sạn</li>
          <li className="px-2">Nhà Nghỉ B&B</li>
          <li className="px-2">Nhà Khách</li>
          <li className="px-2">Căn Hộ</li>
          <li className="px-2">Nhà Nghỉ</li>
          <li className="px-2">Biệt Thự</li>
          <li className="px-2">Nhà Trên Cây</li>
          <li className="px-2">Nhà Di Động</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
