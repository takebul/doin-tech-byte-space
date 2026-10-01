"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UnauthorizedSection() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "/";

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* Top Blue Hero Section with Electric Grid Background */}
      <div className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-20 sm:pb-28 lg:pb-36 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Navbar />

        {/* 401 Hero Content Area */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-10 lg:pt-14 flex flex-col items-center justify-center flex-1 my-auto">
          {/* Numbers 401 with Overlapping Headline */}
          <div className="relative flex flex-col items-center justify-center select-none w-full">
            {/* Giant Gradient 401 */}
            <span
              className="text-[170px] sm:text-[240px] md:text-[300px] lg:text-[350px] font-black tracking-[-0.035em] leading-[0.8] select-none bg-gradient-to-b from-[#d5fc06] via-[#8edb31] to-[#3a8b84]/35 bg-clip-text text-transparent"
              aria-hidden="true"
            >
              401
            </span>

            {/* Headline Overlapping the bottom of 401 */}
            <div className="absolute -bottom-4 sm:-bottom-7 md:-bottom-9 lg:-bottom-12 inset-x-0 flex flex-col items-center text-center px-4 z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-white text-[12px] font-semibold mb-2">
                <svg className="w-3.5 h-3.5 text-[#cbfc01]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Authentication Required</span>
              </div>
              <h1 className="text-white font-extrabold text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px] leading-[1.12] tracking-[-0.02em] max-w-[860px]">
                You are not authorized
                <br />
                to view this page
              </h1>
            </div>
          </div>

          {/* Subtitle & Action Buttons */}
          <div className="flex flex-col items-center text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 z-20">
            <p className="text-white/85 text-[13px] sm:text-[14px] font-normal max-w-[480px] leading-relaxed">
              Please sign in with your ByteSpace account to access your courses, enroll in new programs, and view your private learning dashboard.
            </p>

            <div className="flex items-center gap-3 mt-7 flex-wrap justify-center">
              <Link
                href={`/signin?redirect=${encodeURIComponent(redirectParam)}`}
                className="bg-[#cbfc01] hover:bg-[#bcf000] text-black font-bold text-[13px] sm:text-[13.5px] px-8 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>Sign In Now</span>
              </Link>

              <Link
                href="/register"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] sm:text-[13.5px] px-7 py-2.5 rounded-full border border-white/20 transition-all duration-150 cursor-pointer"
              >
                Create Account
              </Link>

              <Link
                href="/"
                className="text-white/75 hover:text-white font-medium text-[13px] sm:text-[13.5px] px-4 py-2.5 transition-colors cursor-pointer"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer on White Background */}
      <Footer />
    </div>
  );
}
