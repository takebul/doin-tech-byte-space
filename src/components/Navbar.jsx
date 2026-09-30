"use client";

import { useState } from "react";
import Link from "next/link";
import ByteSpaceLogo from "./Hero/ByteSpaceLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full pt-6 pb-2 px-6 sm:px-12 lg:px-22 max-w-[1440px] mx-auto flex items-center justify-between">
      {/* Brand Logo (Left) */}
      <div className="flex items-center">
        <Link href="/" aria-label="ByteSpace Home">
          <ByteSpaceLogo />
        </Link>
      </div>

      {/* Desktop Navigation Links (Center) */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:flex items-center gap-7 lg:gap-8 absolute left-1/2 -translate-x-1/2"
      >
        <a
          href="#home"
          className="text-white font-medium text-[13px] hover:text-[#cbfc01] transition-colors duration-150"
        >
          Home
        </a>
        <a
          href="#courses"
          className="text-white/80 font-normal text-[13px] hover:text-white transition-colors duration-150"
        >
          Courses
        </a>
        <a
          href="#creators"
          className="text-white/80 font-normal text-[13px] hover:text-white transition-colors duration-150"
        >
          Creators
        </a>
      </nav>

      {/* Right Action Items */}
      <div className="hidden md:flex items-center gap-5 lg:gap-6">
        <Link
          href="/signin"
          className="text-white/90 font-normal text-[13px] hover:text-white transition-colors duration-150"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="text-white/90 font-normal text-[13px] hover:text-white transition-colors duration-150"
        >
          Join Us
        </Link>

        {/* Shopping Bag Icon */}
        <button
          type="button"
          aria-label="Shopping Cart"
          className="text-white/90 hover:text-white p-0.5 transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded cursor-pointer"
        >
          <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bag outline */}
            <path d="M6 3h12l2 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l2-5Z" />
            <path d="M4 8h16" />
            {/* Handle */}
            <path d="M9 11a3 3 0 0 0 6 0" />
          </svg>
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="flex md:hidden items-center gap-3">
        <button
          type="button"
          aria-label="Shopping Cart"
          className="text-white p-1"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h12l2 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l2-5Z" />
            <path d="M4 8h16" />
            <path d="M9 11a3 3 0 0 0 6 0" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full px-6 py-4 bg-[#071e5f]/95 backdrop-blur-md border-b border-white/10 md:hidden flex flex-col gap-4 text-center shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-medium py-1.5"
          >
            Home
          </a>
          <a
            href="#courses"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 py-1.5"
          >
            Courses
          </a>
          <a
            href="#creators"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 py-1.5"
          >
            Creators
          </a>
          <hr className="border-white/10 my-1" />
          <div className="flex justify-center items-center gap-6 pt-2">
            <Link
              href="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/90 text-sm"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#cbfc01] text-black font-semibold text-sm px-4 py-1.5 rounded-full"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
