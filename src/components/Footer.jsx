"use client";

import ByteSpaceLogo from "./Hero/ByteSpaceLogo";

const navColumns = [
  {
    title: "col1",
    links: [
      "Featured Courses",
      "Featured Categories",
      "Business",
      "IT",
      "Design",
    ],
  },
  {
    title: "col2",
    links: [
      "Development",
      "Marketing",
      "Photography",
      "Finance",
      "Sport",
    ],
  },
  {
    title: "col3",
    links: [
      "Become a Creator",
      "Affiliate Program",
      "Contact",
      "Help",
      "About",
    ],
  },
];

const legalLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Cookies Settings",
];

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#242528] pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 border-t border-[#f0f1f3]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          {/* Left Column: Brand & Newsletter */}
          <div className="w-full lg:max-w-[420px] flex flex-col">
            {/* Logo */}
            <ByteSpaceLogo dark={true} />

            {/* Newsletter Intro */}
            <p className="mt-4 text-[#585a62] text-xs sm:text-[13.5px] leading-relaxed max-w-[380px]">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>

            {/* Newsletter Input + Search Button Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex flex-wrap sm:flex-nowrap items-center gap-3 w-full"
            >
              <div className="relative flex-1 min-w-[200px] max-w-[300px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-2.5 sm:py-3 rounded-full border border-[#ced0d3] bg-white text-xs sm:text-sm text-[#1c1d20] placeholder-[#82868e] focus:outline-none focus:border-[#0043ff] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#cbfc01] text-[#1a1b1e] font-semibold text-xs sm:text-sm tracking-tight hover:bg-[#d8ff1f] active:scale-95 transition-all duration-200 shadow-sm shrink-0"
              >
                Search
              </button>
            </form>

            {/* Disclaimer */}
            <p className="mt-4 text-[#82868e] text-[11px] leading-relaxed max-w-[350px]">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          {/* Right Columns: 3 Navigation Link Columns */}
          <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 lg:justify-end">
            {navColumns.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-3 sm:gap-3.5">
                {col.links.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={`#${link.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-[#242528] text-xs sm:text-[13.5px] font-normal hover:text-[#0043ff] transition-colors cursor-pointer leading-tight"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#e5e6e8] mt-16 sm:mt-20 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-[12px] text-[#82868e] text-center sm:text-left">
          {/* Copyright */}
          <div>
            @ 2023 ByteSpace. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {legalLinks.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="hover:text-[#1c1d20] transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
