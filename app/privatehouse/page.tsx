"use client";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import { useTranslation } from "react-i18next";
const Privatehouse = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen w-screen relative overflow-hidden pt-10 bg-linear-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 md:px-16 lg:px-32">
          <Image src="/assets/img/Error/under_development.svg" alt="Under development" width={700} height={800} />
          <h1 className="text-4xl font-bold text-center w-full">{t("privatehouse_site_construction")}</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privatehouse;
