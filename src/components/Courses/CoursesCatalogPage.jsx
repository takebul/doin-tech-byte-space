"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "./CourseCard";
import { fetchCourses, fetchCategories, fallbackCourses, fallbackCategories } from "@/lib/api";

const categories = fallbackCategories;

// 18-course catalog from dataset
const fullCatalog = fallbackCourses;

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState(fullCatalog);
  const [categoriesList, setCategoriesList] = useState(categories);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [selectedLevel, setSelectedLevel] = useState("All Level");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const [fetchedCourses, fetchedCatDoc] = await Promise.all([
          fetchCourses(),
          fetchCategories(),
        ]);
        if (isMounted) {
          if (Array.isArray(fetchedCourses) && fetchedCourses.length > 0) {
            setCourses(fetchedCourses);
          }
          if (fetchedCatDoc?.featured) {
            setCategoriesList(fetchedCatDoc.featured);
          }
        }
      } catch (err) {
        console.warn("Using fallback catalog:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Featured" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All Level" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      {/* 1. Top Blue Electric Grid Banner */}
      <header className="relative w-full bg-[#003be2] hero-grid-bg pt-0 pb-12 sm:pb-16 flex flex-col items-center">
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Title & Search */}
        <div className="w-full max-w-[800px] mx-auto px-6 text-center mt-6 sm:mt-8">
          <h1 className="text-white font-extrabold text-[32px] sm:text-[40px] tracking-[-0.02em] leading-tight mb-5">
            Find Your Next Course
          </h1>

          {/* Search Box with Pill and "Courses v" button */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center bg-white rounded-full h-[42px] sm:h-[44px] pl-4 pr-1.5 w-full max-w-[440px] mx-auto shadow-md"
          >
            {/* Magnifying Glass Icon */}
            <svg
              className="w-4 h-4 text-neutral-400 shrink-0 mr-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-[13px] text-slate-800 placeholder:text-neutral-400 focus:outline-none"
            />

            {/* Courses Dropdown Button */}
            <button
              type="button"
              className="h-[34px] sm:h-[36px] px-4 rounded-full bg-[#cbfc01] hover:bg-[#bcf000] text-black font-semibold text-[12px] flex items-center gap-1.5 transition-transform duration-150 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Courses</span>
              <svg
                className="w-3 h-3 text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </header>

      {/* 2. Main Courses Catalog (Pure White Background) */}
      <main className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10 flex-1">
        {/* Filters Top Bar */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Row 1: Filter, All Level, Category & Most Popular */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Left Filter Pills */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Filter */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium text-[#444851] hover:border-neutral-400 transition-colors cursor-pointer shadow-2xs"
              >
                <svg
                  className="w-3.5 h-3.5 text-neutral-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                <span>Filter</span>
              </button>

              {/* All Level Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLevelMenu(!showLevelMenu)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium text-[#444851] hover:border-neutral-400 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>{selectedLevel}</span>
                </button>
                {showLevelMenu && (
                  <div className="absolute top-full left-0 mt-1.5 bg-white border border-[#e2e4e9] rounded-xl shadow-lg py-1 z-30 min-w-[120px]">
                    {["All Level", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => {
                          setSelectedLevel(lvl);
                          setShowLevelMenu(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-neutral-50 ${
                          selectedLevel === lvl ? "font-semibold text-[#0047ff]" : "text-neutral-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Featured")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium text-[#444851] hover:border-neutral-400 transition-colors cursor-pointer shadow-2xs"
              >
                <svg
                  className="w-3.5 h-3.5 text-neutral-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Category</span>
              </button>
            </div>

            {/* Right: Most Popular */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium text-[#444851] hover:border-neutral-400 transition-colors cursor-pointer shadow-2xs"
              >
                <svg
                  className="w-3.5 h-3.5 text-neutral-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="15" y2="12" />
                  <line x1="3" y1="18" x2="9" y2="18" />
                </svg>
                <span>{sortBy}</span>
              </button>
              {showSortMenu && (
                <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#e2e4e9] rounded-xl shadow-lg py-1 z-30 min-w-[130px]">
                  {["Most Popular", "Highest Rated", "Price: Low to High"].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => {
                        setSortBy(sort);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-neutral-50 ${
                        sortBy === sort ? "font-semibold text-[#0047ff]" : "text-neutral-700"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#cbfc01] text-black shadow-xs"
                      : "bg-white border border-[#e2e4e9] text-[#4b4f58] hover:border-neutral-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Course Cards Grid (3 Columns) */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCourses.map((course, idx) => (
              <CourseCard key={course.id || idx} course={course} index={idx % 6} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500">
            <p className="text-base font-medium">No courses found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Featured");
                setSelectedLevel("All Level");
              }}
              className="mt-3 text-[#0047ff] text-sm font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* 4. Pagination */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-12 mb-6 select-none">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className="w-8 h-8 rounded-full border border-[#e2e4e9] flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers 1 to 5 */}
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`text-[13px] px-2 py-1 transition-colors cursor-pointer ${
                currentPage === page
                  ? "font-bold text-[#18181b]"
                  : "font-normal text-neutral-500 hover:text-black"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            disabled={currentPage === 5}
            aria-label="Next Page"
            className="w-8 h-8 rounded-full border border-[#e2e4e9] flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      {/* 5. Main Footer */}
      <Footer />
    </div>
  );
}
