"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFoundSection() {
  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* Top Blue Hero Section with Electric Grid Background */}
      <div className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-20 sm:pb-28 lg:pb-36 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Navbar />

        {/* 404 Hero Content Area */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-10 lg:pt-14 flex flex-col items-center justify-center flex-1 my-auto">
          
          {/* Numbers 404 with Overlapping Headline */}
          <div className="relative flex flex-col items-center justify-center select-none w-full">
            {/* Giant Gradient 404 */}
            <span
              className="text-[170px] sm:text-[240px] md:text-[300px] lg:text-[350px] font-black tracking-[-0.035em] leading-[0.8] select-none bg-gradient-to-b from-[#d5fc06] via-[#8edb31] to-[#3a8b84]/35 bg-clip-text text-transparent"
              aria-hidden="true"
            >
              404
            </span>

            {/* Headline Overlapping the bottom of 404 */}
            <div className="absolute -bottom-4 sm:-bottom-7 md:-bottom-9 lg:-bottom-12 inset-x-0 flex flex-col items-center text-center px-4 z-10">
              <h1 className="text-white font-extrabold text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px] leading-[1.12] tracking-[-0.02em] max-w-[860px]">
                The page you are looking
                <br />
                for doesn&apos;t exist
              </h1>
            </div>
          </div>

          {/* Subtitle & Back to Home Button */}
          <div className="flex flex-col items-center text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 z-20">
            <p className="text-white/80 text-[12.5px] sm:text-[13.5px] font-normal">
              Try to use a correct url or go back to homepage to start again
            </p>

            <Link
              href="/"
              className="mt-6 sm:mt-7 bg-[#cbfc01] hover:bg-[#bcf000] text-black font-semibold text-[13px] sm:text-[13.5px] px-8 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer inline-block"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>

      {/* Main Footer on White Background */}
      <Footer />
    </div>
  );
}
