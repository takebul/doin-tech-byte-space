"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const studentAvatars = [
  "/avatar-1.png",
  "/avatar-2.png",
  "/avatar-3.png",
  "/avatar-4.png",
];

export default function CourseCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-[22px] p-3.5 sm:p-4 border border-[#e5e6e8] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* 1. Thumbnail */}
      <Link href="/course-details" className="block relative w-full aspect-[16/9.5] rounded-[16px] overflow-hidden select-none bg-neutral-100 cursor-pointer">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* 2. Course Details */}
      <div className="pt-3.5 sm:pt-4 flex flex-col flex-1 justify-between">
        {/* Title and Rating Header */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link href="/course-details" className="block flex-1 group/title">
              <h3 className="font-bold text-[16px] sm:text-[17px] text-[#242528] group-hover/title:text-[#0047ff] leading-snug line-clamp-1 tracking-tight transition-colors">
                {course.title}
              </h3>
            </Link>
            {/* Rating */}
            <div className="flex items-center gap-1 shrink-0 pt-0.5">
              <span className="font-semibold text-[13px] text-[#4b4c53] leading-none">
                {course.rating}
              </span>
              <svg
                className="w-3.5 h-3.5 text-[#abaeb5]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          {/* Author */}
          <p className="text-[12px] text-[#82868e] mt-0.5">
            by{" "}
            <span className="text-[#2872ff] font-medium hover:underline cursor-pointer">
              {course.author}
            </span>
          </p>
        </div>

        {/* Level Badge and Student Avatars */}
        <div className="flex items-center justify-between gap-2 mt-4 pt-1">
          {/* Beginner level pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f5f6] text-[#4b4c53] text-[11px] font-medium select-none">
            {/* 3-bar signal icon */}
            <svg
              className="w-3 h-3 text-[#82868e]"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="2" y="10" width="2.5" height="4" rx="0.6" />
              <rect x="6.5" y="6" width="2.5" height="8" rx="0.6" />
              <rect x="11" y="2" width="2.5" height="12" rx="0.6" />
            </svg>
            <span>{course.level || "Beginner"}</span>
          </div>

          {/* Overlapping student avatar cluster + 2K+ */}
          <div className="flex items-center -space-x-1.5 select-none">
            {studentAvatars.map((src, idx) => (
              <div
                key={idx}
                className="relative w-5 h-5 rounded-full overflow-hidden ring-2 ring-white shrink-0"
              >
                <Image
                  src={src}
                  alt={`Student ${idx + 1}`}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="relative w-5 h-5 rounded-full bg-[#cbfc01] ring-2 ring-white flex items-center justify-center shrink-0 z-10">
              <span className="text-[7.5px] font-bold text-[#242528] leading-none">
                26+
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-0.5 mt-3 pt-1">
          <span className="text-[#0043ff] font-extrabold text-[18px] sm:text-[19px] tracking-tight">
            ${course.price}
          </span>
          <span className="text-[#82868e] text-[11px] sm:text-[12px] font-normal">
            /lifetime
          </span>
        </div>
      </div>
    </motion.div>
  );
}
