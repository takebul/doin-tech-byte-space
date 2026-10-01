"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/Courses/CourseCard";
import { fetchCreatorById, fallbackCreator, fallbackCourses } from "@/lib/api";

const defaultCourses = fallbackCourses;

export default function CreatorProfilePage() {
  const [creator, setCreator] = useState(fallbackCreator);
  const [courses, setCourses] = useState(defaultCourses);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(fallbackCreator.followerCount || 12);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("Most relevant");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchCreatorById("purepearl-studio");
        if (isMounted) {
          if (data?.creator) {
            setCreator(data.creator);
            setFollowerCount(data.creator.followerCount || 12);
          }
          if (Array.isArray(data?.courses) && data.courses.length > 0) {
            setCourses(data.courses);
          }
        }
      } catch (err) {
        console.warn("Using fallback creator profile:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* 1. Creator Profile Hero Section (Electric Blue Grid Background) */}
      <header className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-12 sm:pb-16 flex flex-col">
        {/* Navigation Bar */}
        <Navbar />

        {/* Profile Header Content */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10 flex flex-col">
          {/* Creator Avatar & Info Row */}
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Avatar with rounded corners (User's Photo) */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-[20px] sm:rounded-[24px] overflow-hidden relative shrink-0 shadow-xl border-2 border-white/30 bg-neutral-900 ring-4 ring-black/10">
              <Image
                src="/user-creator-avatar.jpg"
                alt={`${creator.name} Avatar`}
                fill
                priority
                className="object-cover object-top"
              />
            </div>

            {/* Creator Title, Badge & Subtitle */}
            <div className="flex flex-col pt-0.5 sm:pt-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-white font-extrabold text-[24px] sm:text-[30px] lg:text-[34px] tracking-tight leading-tight">
                  {creator.name}
                </h1>
                {/* Creator neon lime badge */}
                <span className="bg-[#cbfc01] text-black font-bold text-[11px] sm:text-[11.5px] px-3.5 py-0.5 rounded-full select-none shadow-2xs">
                  {creator.badge || "Creator"}
                </span>
              </div>
              <p className="text-white/85 text-[13px] sm:text-[14px] mt-1 font-normal">
                {creator.subtitle}
              </p>
            </div>
          </div>

          {/* Creator Bio Paragraphs */}
          <div className="space-y-2.5 text-white/85 text-[12.5px] sm:text-[13px] leading-[1.7] max-w-[860px] font-normal mt-6 sm:mt-7">
            {Array.isArray(creator.bio) ? (
              creator.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{creator.bio}</p>
            )}
          </div>

          {/* Stats Pills and Follow Button Row */}
          <div className="flex items-center justify-between gap-4 mt-8 flex-wrap">
            {/* Left: Products & Followers white pills */}
            <div className="flex items-center gap-2.5 select-none">
              {/* Products pill */}
              <div className="bg-white text-[#18181b] text-[12px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="font-bold">3</span>
                <span className="text-[#3b3e45] font-medium">Products</span>
              </div>

              {/* Followers pill */}
              <div className="bg-white text-[#18181b] text-[12px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="font-bold">{followerCount}</span>
                <span className="text-[#3b3e45] font-medium">Followers</span>
              </div>
            </div>

            {/* Right: Neon Lime Follow Button */}
            <button
              type="button"
              onClick={handleFollowToggle}
              className={`font-bold text-[13px] px-6 py-2 rounded-full shadow-sm transition-all duration-150 active:scale-95 cursor-pointer ${
                isFollowing
                  ? "bg-white text-black hover:bg-neutral-100"
                  : "bg-[#cbfc01] hover:bg-[#bcf000] text-black"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </header>

      {/* 2. White Main Section: Filters Toolbar + Creator Courses Grid */}
      <main className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10 flex flex-col flex-1">
        {/* Filter and Sorting Toolbar */}
        <div className="flex items-center justify-between py-2 flex-wrap gap-4 border-b border-[#f0f1f4] pb-6 mb-8">
          {/* Left Buttons: Filter, Level, Category */}
          <div className="flex items-center gap-2.5 flex-wrap select-none">
            {/* Filter Button */}
            <button
              type="button"
              onClick={() => alert("Filters dialog opened.")}
              className="bg-white border border-[#e2e4e9] hover:border-neutral-400 text-[#3b3e45] text-[12.5px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-neutral-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>Filter</span>
            </button>

            {/* Level Button */}
            <button
              type="button"
              onClick={() => alert("Select course difficulty level.")}
              className="bg-white border border-[#e2e4e9] hover:border-neutral-400 text-[#3b3e45] text-[12.5px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-neutral-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
              <span>Level</span>
            </button>

            {/* Category Button */}
            <button
              type="button"
              onClick={() => alert("Select course category.")}
              className="bg-white border border-[#e2e4e9] hover:border-neutral-400 text-[#3b3e45] text-[12.5px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-neutral-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>Category</span>
            </button>
          </div>

          {/* Right Sort Button: Most relevant */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="bg-white border border-[#e2e4e9] hover:border-neutral-400 text-[#3b3e45] text-[12.5px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <svg
                className="w-3.5 h-3.5 text-neutral-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="17" y1="12" x2="3" y2="12" />
                <line x1="11" y1="18" x2="3" y2="18" />
              </svg>
              <span>{sortBy}</span>
            </button>

            {/* Dropdown menu */}
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-neutral-200 rounded-2xl shadow-xl py-1.5 z-40">
                {["Most relevant", "Highest Rated", "Newest", "Price: Low to High"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSortBy(item);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[12.5px] transition-colors cursor-pointer ${
                        sortBy === item
                          ? "bg-neutral-100 font-semibold text-[#003be2]"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* 6 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </main>

      {/* 3. Main Footer */}
      <Footer />
    </div>
  );
}
