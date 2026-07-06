import React from "react";
import Link from "next/link";
import { FaWindows, FaApple, FaGooglePlay } from "react-icons/fa";
import PhoneMockup from "./PhoneMockup";

export const metadata = {
  title: "Download App | Disha Arts Classes",
  description:
    "Download the Disha Arts Classes app for Windows, Apple, and Android.",
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Spacer for Navbar so it stays normal (light background) */}
      <div className="h-20 lg:h-20 w-full bg-[#f8f9fa]"></div>

      {/* Dark Hero Section */}
      <div className="flex-1 bg-gray-300 py-16 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left Content Area */}
            <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1">
              <div className="flex flex-wrap gap-4 mb-6 justify-center lg:justify-start">
                <Link
                  href="https://play.google.com/store/apps/details?id=co.dishaonlineclasses"
                  target="_blank"
                  className="group flex items-center gap-3 bg-[#1e293b] border border-slate-700 hover:bg-[#0f172a] text-white px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(61,220,132,0.1)] w-[200px]"
                >
                  <FaGooglePlay size={24} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-tight text-slate-400">
                      GET IT ON
                    </span>
                    <span className="text-base text-white font-bold leading-tight">
                      Google Play
                    </span>
                  </div>
                </Link>
                {/* App Store */}
                <Link
                  href="https://apps.apple.com/us/app/disha-online-classes/id6739337537"
                  target="_blank"
                  className="group flex items-center gap-3 bg-[#1e293b] border border-slate-700 hover:bg-[#0f172a] text-white px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] w-[200px]"
                >
                  <FaApple size={28} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-tight text-slate-400">
                      Download on the
                    </span>
                    <span className="text-base text-white font-bold leading-tight">
                      App Store
                    </span>
                  </div>
                </Link>
                <a
                  href="https://appx-content-v2.classx.co.in/windows/Disha_Online_Classes_Setup_0.0.3.exe"
                  className="group flex items-center gap-3 bg-[#1e293b] border border-slate-700 hover:bg-[#0f172a] text-white px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,120,212,0.1)] w-[200px]"
                >
                  <FaWindows size={24} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-tight text-slate-400">
                      Download on the
                    </span>
                    <span className="text-base text-white font-bold leading-tight">
                      Windows
                    </span>
                  </div>
                </a>
                {/* Mac App */}
                <a
                  href="https://appx-content-v2.classx.co.in/windows/Disha_online classes-0.0.1.dmg"
                  className="group flex items-center gap-3 bg-[#1e293b] border border-slate-700 hover:bg-[#0f172a] text-white px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] w-[200px]"
                >
                  <FaApple size={28} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-[10px] leading-tight text-slate-400">
                      Download on the
                    </span>
                    <span className="text-base font-bold text-white leading-tight">
                      Mac App
                    </span>
                  </div>
                </a>

                {/* Windows */}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-[1.1] tracking-tight mb-6 mx-auto lg:mx-0">
                The most trusted learning platform on your phone
              </h1>
              <p className="text-lg text-black mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                With our training programs, learning online can be a very
                exciting experience! Take the next step toward achieving your
                professional and personal objectives.
              </p>

              {/* Download Buttons Grid */}
            </div>

            {/* Right Image Area */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-10 lg:mb-0">
              {/* Glowing Background Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>

              {/* Phone Mockup with Floating Animation */}
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
