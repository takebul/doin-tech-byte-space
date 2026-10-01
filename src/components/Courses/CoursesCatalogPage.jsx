"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "./CourseCard";
import {
  fetchPaginatedCourses,
  fetchCategories,
  fallbackCourses,
  fallbackCategories,
} from "@/lib/api";

const PAGE_SIZE = 6;
const initialCourses = fallbackCourses.slice(0, PAGE_SIZE);

export default function CoursesCatalogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial values from URL query string
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPage = !isNaN(urlPage) && urlPage > 0 ? urlPage : 1;
  const initialCategory = searchParams.get("category") || "Featured";
  const initialLevel = searchParams.get("level") || "All Level";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sortBy") || "Most Popular";

  const [courses, setCourses] = useState(initialCourses);
  const [totalCourses, setTotalCourses] = useState(fallbackCourses.length);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(fallbackCourses.length / PAGE_SIZE)
  );
  const [categoriesList, setCategoriesList] = useState(fallbackCategories);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSort);
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Sync state when URL search params change externally (browser Back/Forward)
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    const validPage = !isNaN(p) && p > 0 ? p : 1;
    const cat = searchParams.get("category") || "Featured";
    const lvl = searchParams.get("level") || "All Level";
    const s = searchParams.get("search") || "";
    const sort = searchParams.get("sortBy") || "Most Popular";

    if (validPage !== currentPage) setCurrentPage(validPage);
    if (cat !== selectedCategory) setSelectedCategory(cat);
    if (lvl !== selectedLevel) setSelectedLevel(lvl);
    if (s !== searchQuery) setSearchQuery(s);
    if (sort !== sortBy) setSortBy(sort);
  }, [searchParams]);

  // Sync URL search parameters with current filters and pagination
  const updateUrl = useCallback(
    (page, category, level, search, sort) => {
      const params = new URLSearchParams();
      if (page && page > 1) {
        params.set("page", String(page));
      }
      if (category && category !== "Featured" && category !== "All") {
        params.set("category", category);
      }
      if (level && level !== "All Level" && level !== "All") {
        params.set("level", level);
      }
      if (search && search.trim()) {
        params.set("search", search.trim());
      }
      if (sort && sort !== "Most Popular") {
        params.set("sortBy", sort);
      }

      const queryString = params.toString();
      const currentQuery = searchParams.toString();
      if (queryString !== currentQuery) {
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(newUrl, { scroll: false });
      }
    },
    [pathname, router, searchParams]
  );

  // Fetch categories list on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const catDoc = await fetchCategories();
        if (isMounted && catDoc?.featured) {
          setCategoriesList(catDoc.featured);
        }
      } catch (err) {
        console.warn("Using fallback categories:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch paginated courses from backend whenever filters or page change
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        // Sync URL with current filters & pagination
        updateUrl(currentPage, selectedCategory, selectedLevel, searchQuery, sortBy);

        const res = await fetchPaginatedCourses({
          page: currentPage,
          limit: PAGE_SIZE,
          category: selectedCategory,
          level: selectedLevel,
          search: searchQuery,
          sortBy: sortBy,
        });

        if (isMounted && res?.courses) {
          setCourses(res.courses);
          setTotalCourses(res.total ?? res.courses.length);
          setTotalPages(res.totalPages ?? 1);
        }
      } catch (err) {
        console.warn("Backend fetch failed, using fallback:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    // Debounce search query to prevent excessive queries while typing
    const debounceTimer = setTimeout(
      () => {
        loadData();
      },
      searchQuery ? 300 : 0
    );

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [currentPage, selectedCategory, selectedLevel, searchQuery, sortBy, updateUrl]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleLevelSelect = (lvl) => {
    setSelectedLevel(lvl);
    setShowLevelMenu(false);
    setCurrentPage(1);
  };

  const handleSortSelect = (sort) => {
    setSortBy(sort);
    setShowSortMenu(false);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("Featured");
    setSelectedLevel("All Level");
    setSearchQuery("");
    setSortBy("Most Popular");
    setCurrentPage(1);
    router.replace(pathname, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      const gridElem = document.getElementById("courses-grid-section");
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const startIndex = totalCourses === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * PAGE_SIZE, totalCourses);

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
              onChange={handleSearchChange}
              placeholder="Search courses, instructors, topics..."
              className="w-full bg-transparent text-[13px] text-slate-800 placeholder:text-neutral-400 focus:outline-none"
            />

            {/* Courses Indicator Button */}
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
      <main
        id="courses-grid-section"
        className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10 flex-1 scroll-mt-6"
      >
        {/* Filters Top Bar */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Row 1: Filter, All Level, Category & Most Popular */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Left Filter Pills */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Filter Reset / Icon */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium text-[#444851] hover:border-neutral-400 transition-colors cursor-pointer shadow-2xs"
                title="Reset all filters"
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
                <span>All Filters</span>
              </button>

              {/* All Level Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLevelMenu(!showLevelMenu)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium text-[#444851] hover:border-neutral-400 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>{selectedLevel}</span>
                  <svg
                    className={`w-3 h-3 text-neutral-400 transition-transform ${showLevelMenu ? "rotate-180" : ""}`}
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
                {showLevelMenu && (
                  <div className="absolute top-full left-0 mt-1.5 bg-white border border-[#e2e4e9] rounded-xl shadow-lg py-1 z-30 min-w-[130px]">
                    {["All Level", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleLevelSelect(lvl)}
                        className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-neutral-50 cursor-pointer ${
                          selectedLevel === lvl ? "font-semibold text-[#0047ff]" : "text-neutral-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Quick Reset */}
              <button
                type="button"
                onClick={() => handleCategorySelect("Featured")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e2e4e9] bg-white text-[12px] font-medium transition-colors cursor-pointer shadow-2xs ${
                  selectedCategory === "Featured" ? "border-neutral-400 text-black font-semibold" : "text-[#444851] hover:border-neutral-400"
                }`}
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

            {/* Right: Most Popular Sort Dropdown */}
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
                <svg
                  className={`w-3 h-3 text-neutral-400 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
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
              {showSortMenu && (
                <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#e2e4e9] rounded-xl shadow-lg py-1 z-30 min-w-[150px]">
                  {["Most Popular", "Highest Rated", "Price: Low to High", "Price: High to Low"].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => handleSortSelect(sort)}
                      className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-neutral-50 cursor-pointer ${
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
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#cbfc01] text-black font-semibold shadow-xs"
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
        <div className={`transition-opacity duration-200 ${isLoading ? "opacity-60" : "opacity-100"}`}>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {courses.map((course, idx) => (
                <CourseCard
                  key={`${course.id}-${currentPage}-${idx}`}
                  course={course}
                  index={idx % 6}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-500">
              <p className="text-base font-medium">No courses found matching your criteria.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 text-[#0047ff] text-sm font-semibold hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* 4. Pagination (Fetched directly from backend with URL sync) */}
        {totalPages > 0 && (
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mt-12 mb-6 select-none">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1 || isLoading}
                aria-label="Previous Page"
                className="w-8 h-8 rounded-full border border-[#e2e4e9] flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dynamic Page Numbers generated from backend totalPages */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  disabled={isLoading}
                  className={`text-[13px] min-w-[28px] h-7 px-2 rounded-full transition-all cursor-pointer ${
                    currentPage === page
                      ? "font-bold text-[#18181b] bg-[#ececee] shadow-2xs"
                      : "font-normal text-neutral-500 hover:text-black"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages || isLoading}
                aria-label="Next Page"
                className="w-8 h-8 rounded-full border border-[#e2e4e9] flex items-center justify-center text-neutral-600 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Results Counter Summary */}
            {totalCourses > 0 && (
              <p className="text-[12.5px] text-neutral-500 font-normal">
                Showing{" "}
                <span className="font-semibold text-neutral-700">
                  {startIndex}–{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-neutral-700">
                  {totalCourses}
                </span>{" "}
                courses
              </p>
            )}
          </div>
        )}
      </main>

      {/* 5. Main Footer */}
      <Footer />
    </div>
  );
}
