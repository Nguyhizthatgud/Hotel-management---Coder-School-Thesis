"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { SiApachepulsar } from "react-icons/si";
import { Modal, Tabs, Avatar } from "antd";
import LanguageSwitcher from "./LanguageSwitcher";
import { FaHotel } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { GiFamilyHouse, GiTreehouse } from "react-icons/gi";
import { PiWarehouseThin } from "react-icons/pi";
import type { MenuProps } from "antd";

import LoginSignupPage from "./LoginSignupPage";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Button } from "@/components/ui/button";
import { useAuthUIStore } from "@/stores/useAuthUIStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUISlice } from "@/stores/UI/useUIStore";
import AvatarDrpdw from "./AvatarDrpdw";

import { BookUser, Building2, ChartNoAxesCombined, FileUser, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen } = useAuthUIStore();
  const { t } = useTranslation();
  const close = useAuthUIStore((state) => state.close) as () => void;
  const open = useAuthUIStore((state) => state.open) as () => void;
  const setPropSelection = useUISlice((s) => s.setPropSelection);
  const user = useAuthStore((state) => state.user);
  const displayName = useAuthStore((state) => state.user?.displayName);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleCancel = () => {
    close();
  };
  // set language change

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <AnimatePresence>
          {openDropdown ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mx-5 my-5"
            >
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-dark-400 text-2xl font-semibold my-3 border-b border-gray-200"
              >
                {t("feature_dropdown")}
              </motion.h2>

              <div className="grid grid-cols-3 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-gray-400 text-lg">{t("feature_dropdown_1")}</h3>
                  <ul className="font-semibold">
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                      className="my-5 group flex items-center gap-2"
                    >
                      <Link
                        href="/hotel"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setPropSelection("Khách Sạn");
                          localStorage.setItem("selectedService", "/hotelreception");
                        }}
                      >
                        <FaHotel className="text-amber-500" />
                        <span className="text-gray-600 hover:text-amber-600 group group-hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out group">
                          {t("feature_dropdown_1_sub1")}
                        </span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="my-5 flex items-center gap-2 group"
                    >
                      <Link
                        href="/motel"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setPropSelection("Nhà Nghỉ B&B");
                          localStorage.setItem("selectedService", "/motel");
                        }}
                      >
                        <RiHotelLine className="text-amber-500" />
                        <span className="text-gray-600 hover:text-amber-600 group group-hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_1_sub2")}
                        </span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35, duration: 0.3 }}
                      className="my-5 flex items-center gap-2 group"
                    >
                      <Link
                        href="/apartments"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setPropSelection("Căn Hộ");
                          localStorage.setItem("selectedService", "/apartments");
                        }}
                      >
                        <GiFamilyHouse className="text-amber-500" />
                        <span className="text-gray-600 hover:text-amber-600 group group-hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_1_sub3")}
                        </span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="my-5 flex items-center gap-2 group"
                    >
                      <Link
                        href="/villas"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setPropSelection("Biệt Thự");
                          localStorage.setItem("selectedService", "/villas");
                        }}
                      >
                        <GiTreehouse className="text-amber-500" />
                        <span className="text-gray-600 hover:text-amber-600 group group-hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_1_sub4")}
                        </span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                      className="my-5 flex items-center gap-2 group"
                    >
                      <Link
                        href="/privatehouse"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setPropSelection("Nhà Nguyên Căn");
                          localStorage.setItem("selectedService", "/privatehouse");
                        }}
                      >
                        <PiWarehouseThin className="text-amber-500" />
                        <span className="text-gray-600 hover:text-amber-600 group group-hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_1_sub5")}
                        </span>
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="my-5 flex items-center gap-2 group"
                    >
                      <Link
                        href="/homestays"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setPropSelection("Homestays");
                          localStorage.setItem("selectedService", "/homestays");
                        }}
                      >
                        <FaHotel className="text-amber-500 group-hover:text-amber-600" />
                        <span className="text-gray-600 hover:text-amber-600 group group-hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_1_sub6")}
                        </span>
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-gray-400 text-lg">{t("feature_dropdown_2")}</h3>
                  <ul className="pl-5 font-semibold">
                    <Link className="" href="">
                      {" "}
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="my-5 flex items-center gap-2"
                      >
                        <TrendingUp className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-600  hover:text-amber-600 group hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_2_sub1")}
                        </span>
                      </motion.li>
                    </Link>
                    <Link className="flex items-center gap-2" href="">
                      {" "}
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45, duration: 0.3 }}
                        className="my-5 flex items-center gap-2"
                      >
                        <ChartNoAxesCombined className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-600  hover:text-amber-600 group hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_2_sub2")}
                        </span>
                      </motion.li>
                    </Link>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-gray-400 text-lg">{t("feature_dropdown_3")}</h3>
                  <ul className="pl-4 font-semibold">
                    <Link className="" href="">
                      {" "}
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="my-5 flex items-center gap-2"
                      >
                        <Building2 className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-600  hover:text-amber-600 group hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_3_sub1")}
                        </span>
                      </motion.li>
                    </Link>
                    <Link className="" href="">
                      {" "}
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45, duration: 0.3 }}
                        className="my-5 flex items-center gap-2"
                      >
                        <BookUser className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-600  hover:text-amber-600 group hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_3_sub2")}
                        </span>
                      </motion.li>
                    </Link>
                    <Link className="" href="">
                      {" "}
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="my-5 flex items-center gap-2"
                      >
                        <FileUser className="w-4 h-4 text-amber-500" />
                        <span className="text-gray-600  hover:text-amber-600 group hover:font-bold hover:scale-105 transition-transform duration-200 ease-in-out">
                          {t("feature_dropdown_3_sub3")}
                        </span>
                      </motion.li>
                    </Link>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )
    }
  ];
  return (
    <section
      className={`header w-full py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md backdrop-blur-sm border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center md:w-2/3">
            <div className="flex items-center mr-7">
              {" "}
              <svg width={40} height={40} viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="apacheGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DA7523" />
                    <stop offset="100%" stopColor="#D1AE3C" />
                  </linearGradient>
                </defs>
                {/* Feather shape */}
                <path
                  d="M24 4C24 4 18 8 16 14C14 20 14 28 14 32C14 36 16 42 24 44C32 42 34 36 34 32C34 28 34 20 32 14C30 8 24 4 24 4Z"
                  fill="url(#apacheGradient1)"
                />
                {/* Feather details */}
                <path
                  d="M24 8L20 16M24 8L28 16M24 12L22 20M24 12L26 20M24 16L23 24M24 16L25 24"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Building outline at bottom */}
                <rect x="18" y="32" width="12" height="10" fill="white" opacity="0.3" rx="1" />
                <rect x="20" y="34" width="2" height="3" fill="#DC2626" />
                <rect x="23" y="34" width="2" height="3" fill="#DC2626" />
                <rect x="26" y="34" width="2" height="3" fill="#DC2626" />
              </svg>
              <Link href="/" className="">
                <div className=" flex flex-col text-xl md:text-2xl cursor-pointer mr-7">
                  {" "}
                  <div className="page-content leading-none">
                    <span className="text-orange-400">A</span>pache
                  </div>
                  <span className="text-xs text-gray-500 tracking-wider font-mono">handyPMS4U</span>
                </div>
              </Link>
            </div>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              arrow={true}
              onOpenChange={setOpenDropdown}
              overlayClassName="no-hover-dropdown"
            >
              <Button variant="ghost" className="mx-1 text-sm font-medium group items-center hidden md:flex">
                {t("navbar1")}
                <CaretDownOutlined
                  className={
                    "transition-transform duration-200 group-hover:rotate-180" + (openDropdown ? " rotate-180" : "")
                  }
                />
              </Button>
            </Dropdown>
            <Button
              onClick={() => {
                router.push("/pricing");
                router.refresh();
              }}
              variant="ghost"
              className="mx-3 text-sm font-medium hidden md:flex"
            >
              {t("navbar2")}
            </Button>
          </div>
          <div className="flex gap-4 text-sm font-semibold justify-end items-center w-full md:w-1/3">
            {/* language switcher */}
            <LanguageSwitcher />
            <Button
              className={`bg-orange-400 text-white hover:bg-orange-600 transition-colors px-4 py-2 rounded-md ${
                user ? "hidden" : "block"
              }`}
              onClick={() => {
                open();
              }}
            >
              {t("login")}/{t("signup")}
            </Button>
            {user && (
              <Button variant="ghost" className="hidden md:flex" onClick={() => router.push("/hotelreception")}>
                <Link href="/hotelreception" className="flex items-center gap-2">
                  <RiHotelLine className="text-amber-500" />
                  <span className="text-gray-600 hover:text-amber-600 hover:font-bold! hover:scale-105 transition-transform duration-200 ease-in-out">
                    {t("dashboard")}
                  </span>
                </Link>
              </Button>
            )}
            {user && (
              <AvatarDrpdw
                trigger={
                  <Avatar className="text-2xl p-2 cursor-pointer">{displayName?.charAt(0).toUpperCase()}</Avatar>
                }
              />
            )}
            <Modal open={isOpen} onCancel={handleCancel} footer={null} className="login-modal">
              <LoginSignupPage />
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Header;
