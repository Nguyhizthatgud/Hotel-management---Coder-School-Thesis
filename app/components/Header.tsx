"use client";
import Link from "next/link";
import React from "react";
import "@ant-design/v5-patch-for-react-19";

import { useTheme } from "next-themes";
import { TbBrandAirbnb } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@radix-ui/react-dropdown-menu";
import { Cherry_Bomb_One } from "next/font/google";
import { MdModeNight, MdLightMode } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { Modal, Tabs, Avatar, Button } from "antd";
import ReactCountryFlag from "react-country-flag";
import LoginSignupPage from "./LoginSignupPage";
import { CaretDownOutlined } from "@ant-design/icons";
const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alfa"
});

type Props = {
  money: string;
};

const Header = () => {
  const [openCurrency, setOpenCurrency] = React.useState(false);
  const [openSign, setOpenSign] = React.useState(false);
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
    <section className="py-4 px-6 mx-auto container">
      <div className="flex flex-row justify-around">
        <div className="flex gap-2 items-center w-full md:2/3">
          <TbBrandAirbnb className="text-4xl text-orange-400" />
          <Link className={`${cherryBomb.className} text-4xl pr-1 cursor-pointer`} href="">
            <span className="text-orange-400">A</span>
            <span>pache</span>
          </Link>
          <Avatar className="text-2xl pr-2" />
          <div className="cursor-pointer" onClick={handleThemeChange}>
            {theme === "dark" ? <MdModeNight className="" /> : <MdLightMode className="" />}
          </div>
          <div className="relative">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                asChild
                className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                <span className="text-lg font-semibold">
                  Loại hình
                  <CaretDownOutlined />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md p-2">
                <DropdownMenuItem className="px-2">Tất cả</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Nhà ở</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Khách sạn</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Nhà nghỉ B&B</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Nhà khách</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Căn hộ</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Nhà nghỉ</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Biệt thự</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Nhà trên cây</DropdownMenuItem>
                <DropdownMenuItem className="px-2">Nhà di động</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div> Giá dịch vụ</div>
        </div>
        <div className="flex gap-4 text-lg font-semibold">
          {
            <Button
              className="text-5xl bg-gray-600"
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
                <div className="currency flex flex-row gap-1 items-center">
                  <AiOutlineGlobal />|
                  <MdCurrencyExchange />
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
    </section>
  );
};
export default Header;
