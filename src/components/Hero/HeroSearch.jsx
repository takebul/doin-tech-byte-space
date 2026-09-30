"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-20 flex items-center justify-center gap-3 w-full max-w-[440px] mx-auto px-4"
    >
      {/* Search Input Pill */}
      <div className="relative flex-1 flex items-center bg-white rounded-full h-[36px] sm:h-[38px] px-3.5 shadow-sm border border-transparent focus-within:border-white focus-within:ring-2 focus-within:ring-[#cbfc01]/80 transition-all duration-150">
        {/* Search Magnifying Glass Icon */}
        <svg
          className="w-3.5 h-3.5 text-neutral-400 shrink-0 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Course, topic, creator"
          aria-label="Course, topic, creator"
          className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 text-[12px] sm:text-[13px] font-normal focus:outline-none"
        />
      </div>

      {/* HeroUI Search Button */}
      <Button
        type="submit"
        aria-label="Search"
        className="h-[32px] sm:h-[34px] px-5 sm:px-6 rounded-full bg-[#cbfc01] text-black font-semibold text-[11px] sm:text-[12px] tracking-normal hover:bg-[#d4fb20] active:scale-95 transition-all duration-150 cursor-pointer shrink-0 border-none shadow-none"
      >
        Search
      </Button>
    </form>
  );
}
