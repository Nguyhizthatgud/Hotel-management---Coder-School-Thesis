"use client";
import React from "react";
import Image from "next/image";
import Typed from "typed.js";
import { IoCheckmarkDone } from "react-icons/io5";
import { useTranslation } from "react-i18next";
const Headingpad = () => {
  const { t, i18n } = useTranslation();
  const el = React.useRef(null);
  React.useEffect(() => {
    // Get typed strings from i18n based on current language
    const typedStrings = [t("typedStrings_1"), t("typedStrings_2"), t("typedStrings_3")];

    const typed = new Typed(el.current, {
      strings: typedStrings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      smartBackspace: true
    });

    return () => {
      typed.destroy();
    };
  }, [i18n.language, t]); // Re-run when language changes

  return (
    <section className="hero-section flex items-center w-screen" style={{ backgroundColor: "#fff5ee" }}>
      <div className="container mx-auto py-20 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* describe of poster */}
        <div className="">
          <div className="flex flex-row items-center gap-4">
            <Image
              src="https://resources.littlehotelier.com/images/website/en-header-review.svg"
              alt="4.5 stars | 921 Reviews"
              width={192}
              height={36}
              priority
              unoptimized
            />
            <p className="text-sm text-gray-500">{t("headingPad_line1")}</p>
          </div>
          <h1 className="poster-text text-3xl font-bold my-25">
            {t("posterText_line1")} <br /> {t("posterText_line2")} <span className="text-amber-600" ref={el}></span>{" "}
            {t("posterText_line3")}
          </h1>
          <p className="text-xs text-gray-500 mt-10">
            {t("posterText_disclaimer1")}
            <br />
            {t("posterText_disclaimer2")}
          </p>
          {/* Logos of partners */}
          <div>
            <p className="flex items-center text-lg font-semibold mt-8 text-green-400 ">
              <span className="mr-2 text-3xl">
                <IoCheckmarkDone />
              </span>{" "}
              Các đối tác OTA
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Chúng tôi tự hào hợp tác với các đối tác hàng đầu trong ngành công nghiệp du lịch.
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
        </div>
        {/* Images of poster */}
        <div className="grid grid-cols-2 grid-rows-2 gap-5">
          {/* Large featured image */}
          <div className="col-span-1 row-span-3 rounded-xl overflow-hidden group">
            <Image
              src="/assets/img/heroSlider/1.jpg"
              alt="Featured Hotel"
              width={600}
              height={500}
              className="object-cover w-full h-full headingpad__scale-animation transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Small images column */}
          <div className="col-span-1 row-span-2 rounded-xl overflow-hidden group">
            <Image
              src="/assets/img/heroSlider/2.jpg"
              alt="Hotel View"
              width={250}
              height={250}
              className="object-cover w-full h-full headingpad__scale-animation transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="col-span-1 row-span-1 rounded-xl overflow-hidden group">
            <Image
              src="/assets/img/heroSlider/3.jpg"
              alt="Hotel Room"
              width={250}
              height={250}
              className="object-cover w-full h-full headingpad__scale-animation transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Headingpad;
