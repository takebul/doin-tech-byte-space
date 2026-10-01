"use client";

import Image from "next/image";
import Link from "next/link";

const studentAvatars = [
  "/avatar-1.png",
  "/avatar-2.png",
  "/avatar-3.png",
  "/avatar-4.png",
];

export default function CourseInfoCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-[20px] sm:rounded-[22px] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.16)] border border-[#e5e6e8] w-[215px] sm:w-[245px] transition-transform duration-300 hover:-translate-y-1 select-none pointer-events-auto flex flex-col ${className}`}
    >
      {/* 1. Thumbnail Image (course-1.png natively contains 17 Lessons, 2 hours 16 mins, 59 Comments frosted pills) */}
      <Link
        href="/courses/1"
        className="block relative w-full aspect-[16/9.5] rounded-[14px] overflow-hidden select-none bg-neutral-100 group cursor-pointer"
      >
        <Image
          src="/course-1.png"
          alt="Learn Figma from Basic"
          fill
          sizes="(max-width: 768px) 240px, 280px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </Link>

      {/* 2. Course Details */}
      <div className="pt-2 sm:pt-2.5 flex flex-col">
        {/* Title and Rating Header */}
        <div className="flex items-start justify-between gap-1.5">
          <Link href="/courses/1" className="block flex-1 group/title">
            <h3 className="font-bold text-[12.5px] sm:text-[13.5px] text-[#242528] group-hover/title:text-[#0047ff] leading-snug line-clamp-1 tracking-tight transition-colors">
              Learn Figma from Basic
            </h3>
          </Link>
          <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
            <span className="font-semibold text-[11px] text-[#4b4c53] leading-none">
              4.5
            </span>
            <svg
              className="w-3 h-3 text-[#abaeb5]"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Author */}
        <p className="text-[10px] text-[#82868e] mt-0.5">
          by{" "}
          <span className="text-[#2872ff] font-medium hover:underline cursor-pointer">
            purepearl studio
          </span>
        </p>

        {/* Level Badge and Student Avatars */}
        <div className="flex items-center justify-between gap-1.5 mt-2 pt-0.5">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f5f5f6] text-[#4b4c53] text-[9.5px] font-medium select-none">
            <svg
              className="w-2.5 h-2.5 text-[#82868e]"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="2" y="10" width="2.5" height="4" rx="0.6" />
              <rect x="6.5" y="6" width="2.5" height="8" rx="0.6" />
              <rect x="11" y="2" width="2.5" height="12" rx="0.6" />
            </svg>
            <span>Beginner</span>
          </div>

          {/* Student Avatars + 26+ */}
          <div className="flex items-center -space-x-1 select-none">
            {studentAvatars.map((src, idx) => (
              <div
                key={idx}
                className="relative w-4 h-4 rounded-full overflow-hidden ring-1.5 ring-white shrink-0"
              >
                <Image
                  src={src}
                  alt={`Student ${idx + 1}`}
                  width={16}
                  height={16}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="relative w-4 h-4 rounded-full bg-[#cbfc01] ring-1.5 ring-white flex items-center justify-center shrink-0 z-10">
              <span className="text-[6.5px] font-bold text-[#242528] leading-none">
                26+
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-0.5 mt-2 pt-0.5">
          <span className="text-[#0043ff] font-extrabold text-[15px] sm:text-[16px] tracking-tight">
            $25
          </span>
          <span className="text-[#82868e] text-[10px] font-normal">
            /lifetime
          </span>
        </div>
      </div>
    </div>
  );
}
