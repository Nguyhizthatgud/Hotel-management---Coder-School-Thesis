import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from "react-icons/fa";
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaCode, FaGraduationCap } from "react-icons/fa6";
import { SiApachepulsar } from "react-icons/si";

import Image from "next/image";
type Props = {};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-700 to-gray-500 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Section */}
          <div>
            <div className="flex items-center gap-1 mb-5">
              {" "}
              <SiApachepulsar className="text-6xl text-orange-400" />
              <Link className="page-content text-4xl cursor-pointer mr-7" href="">
                <span className="text-orange-400">A</span>
                <span className="">pache</span>
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <FaCode className="text-lg" />
                Portfolio Project
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Apache is a clone hotel booking application is a full-stack demonstration project showcasing modern web
                development technologies and best practices.
              </p>
              <div className="flex gap-4 text-2xl">
                <SiNextdotjs className="text-white hover:text-amber-400 transition-colors" />
                <SiReact className="text-blue-400 hover:text-amber-400 transition-colors" />
                <SiTypescript className="text-blue-600 hover:text-amber-400 transition-colors" />
                <SiTailwindcss className="text-teal-400 hover:text-amber-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Tech Stack & Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400">Technologies Used</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Next.js 14 with App Router
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                TypeScript for type safety
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Tailwind CSS for styling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Ant Design components
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Responsive design
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400">Connect</h3>
            <p className="text-gray-300">Interested in collaborating or have questions about this project?</p>
            <div className="flex gap-4">
              <Link href="https://github.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                <FaGithub className="text-2xl" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                <FaLinkedin className="text-2xl" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                <FaTwitter className="text-2xl" />
              </Link>
              <Link href="mailto:contact@example.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                <FaEnvelope className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        {/* Separator */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Special Thanks Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGraduationCap className="text-amber-400 text-2xl" />
            <h3 className="text-xl font-bold text-amber-400">Special Thanks</h3>
          </div>
          <div className="text-center">
            <p className="text-gray-300 mb-2">This project was made possible with the generous support of</p>
            <div className="flex items-center justify-center gap-2">
              <Image
                className="inline-block object-contain"
                src="/assets/Logo/coderschool_logo.png"
                alt="CoderSchool"
                width={50}
                height={40}
              />
              <span className="text-2xl font-bold text-amber-400">CoderSchool</span>
              <FaHeart className="text-red-500" />
            </div>
            <p className="text-sm text-gray-400 mt-2">A leading donor in educational technology initiatives</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Project Features</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Multi-property management system</li>
              <li>• Multi-currency support</li>
              <li>• Responsive design for all devices</li>
              <li>• Performance optimized</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Purpose</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Created as a demonstration of modern web development skills, showcasing proficiency in React ecosystem,
              TypeScript, and contemporary UI/UX design principles.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">© 2024 Hotel Booking App - Portfolio Project</p>
              <p className="text-gray-500 text-xs">
                Built with <FaHeart className="inline text-red-500 mx-1" /> for learning and demonstration purposes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Powered by</span>
              <div className="flex items-center gap-2">
                <Image
                  className="inline-block object-contain"
                  src="/assets/Logo/coderschool_logo.png"
                  alt="CoderSchool"
                  width={50}
                  height={40}
                />
                <span className="text-amber-400 font-bold">CoderSchool</span>
                <span className="text-gray-400 text-sm">Education Initiative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-center text-gray-400 text-xs">
            <strong>Disclaimer:</strong> This is a portfolio demonstration project created for educational purposes. Not
            intended for commercial use. All hotel images and content are for demonstration only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
