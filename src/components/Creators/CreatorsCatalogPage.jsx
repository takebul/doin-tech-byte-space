"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorCard from "./CreatorCard";
import {
  fetchPaginatedCreators,
  fetchCategories,
  fallbackCreators,
  fallbackCategories,
  fallbackCreator,
} from "@/lib/api";

const PAGE_SIZE = 6;
const initialCreators = fallbackCreators.slice(0, PAGE_SIZE);

export default function CreatorsCatalogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query params
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPage = !isNaN(urlPage) && urlPage > 0 ? urlPage : 1;
  const initialCategory = searchParams.get("category") || "Featured";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sortBy") || "Most Popular";

  // Featured Hero Creator State (Preserving Screenshot Design)
  const [heroCreator, setHeroCreator] = useState(fallbackCreator);
  const [heroFollowers, setHeroFollowers] = useState(fallbackCreator.followerCount || 12);
  const [isHeroFollowing, setIsHeroFollowing] = useState(false);

  // Creators Catalog List & Pagination State
  const [creators, setCreators] = useState(initialCreators);
  const [totalCreators, setTotalCreators] = useState(fallbackCreators.length);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(fallbackCreators.length / PAGE_SIZE)
  );
  const [categoriesList, setCategoriesList] = useState(fallbackCategories);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSort);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleHeroFollowToggle = () => {
    if (isHeroFollowing) {
      setIsHeroFollowing(false);
      setHeroFollowers((prev) => Math.max(0, prev - 1));
    } else {
      setIsHeroFollowing(true);
      setHeroFollowers((prev) => prev + 1);
    }
  };

  // Sync state when URL search params change externally (browser Back/Forward)
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    const validPage = !isNaN(p) && p > 0 ? p : 1;
    const cat = searchParams.get("category") || "Featured";
    const s = searchParams.get("search") || "";
    const sort = searchParams.get("sortBy") || "Most Popular";

    if (validPage !== currentPage) setCurrentPage(validPage);
    if (cat !== selectedCategory) setSelectedCategory(cat);
    if (s !== searchQuery) setSearchQuery(s);
    if (sort !== sortBy) setSortBy(sort);
  }, [searchParams]);

  // Sync URL search parameters with current filters and pagination
  const updateUrl = useCallback(
    (page, category, search, sort) => {
      const params = new URLSearchParams();
      if (page && page > 1) {
        params.set("page", String(page));
      }
      if (category && category !== "Featured" && category !== "All") {
        params.set("category", category);
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

  // Fetch paginated creators from backend whenever page or filters change
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        // Sync URL with current filters & pagination
        updateUrl(currentPage, selectedCategory, searchQuery, sortBy);

        const res = await fetchPaginatedCreators({
          page: currentPage,
          limit: PAGE_SIZE,
          category: selectedCategory,
          search: searchQuery,
          sortBy: sortBy,
        });

        if (isMounted && res?.creators) {
          setCreators(res.creators);
          setTotalCreators(res.total ?? res.creators.length);
          setTotalPages(res.totalPages ?? 1);
        }
      } catch (err) {
        console.warn("Backend creators fetch failed, using fallback:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

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
  }, [currentPage, selectedCategory, searchQuery, sortBy, updateUrl]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortSelect = (sort) => {
    setSortBy(sort);
    setShowSortDropdown(false);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("Featured");
    setSearchQuery("");
    setSortBy("Most Popular");
    setCurrentPage(1);
    router.replace(pathname, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      const gridElem = document.getElementById("creators-catalog-grid");
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const startIndex = totalCreators === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * PAGE_SIZE, totalCreators);

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* 1. TOP SECTION: PRESERVED SCREENSHOT DESIGN HERO BANNER */}
      <header className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-12 sm:pb-16 flex flex-col">
        {/* Navigation Bar */}
        <Navbar />

        {/* Profile Header Content (Exact Screenshot Layout) */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10 flex flex-col">
          {/* Creator Avatar & Info Row */}
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Creator Avatar (User's Photo) */}
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-[22px] sm:rounded-[26px] overflow-hidden relative shrink-0 shadow-xl border-2 border-white/30 bg-neutral-900 ring-4 ring-black/10">
              <Image
                src="/user-creator-avatar.jpg"
                alt={`${heroCreator.name} Avatar`}
                fill
                priority
                className="object-cover object-top"
              />
            </div>

            {/* Creator Title, Badge & Subtitle */}
            <div className="flex flex-col pt-0.5 sm:pt-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-white font-extrabold text-[24px] sm:text-[30px] lg:text-[34px] tracking-tight leading-tight">
                  {heroCreator.name}
                </h1>
                {/* Creator neon lime badge from screenshot */}
                <span className="bg-[#cbfc01] text-black font-bold text-[11px] sm:text-[11.5px] px-3.5 py-0.5 rounded-full select-none shadow-2xs">
                  {heroCreator.badge || "Creator"}
                </span>
              </div>
              <p className="text-white/85 text-[13px] sm:text-[14px] mt-1 font-normal">
                {heroCreator.subtitle}
              </p>
            </div>
          </div>

          {/* Creator Bio Paragraphs from screenshot */}
          <div className="space-y-2.5 text-white/85 text-[12.5px] sm:text-[13px] leading-[1.7] max-w-[860px] font-normal mt-6 sm:mt-7">
            <p>
              Welcome to the creative world of PurePearl Studio. Here, you'll
              discover the passion, expertise, and inspiration that drive my
              creative journey. Let's explore and learn together!
            </p>
            <p>
              Dive into my creative portfolio, showcasing a glimpse of my
              artistic endeavors. From digital designs to multimedia projects,
              each piece tells a unique story. Explore the world of creativity
              with me.
            </p>
          </div>

          {/* Stats Pills and Follow Button Row from screenshot */}
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
                <span className="font-bold">{heroFollowers}</span>
                <span className="text-[#3b3e45] font-medium">Followers</span>
              </div>
            </div>

            {/* Right: Neon Lime Follow Button from screenshot */}
            <button
              type="button"
              onClick={handleHeroFollowToggle}
              className={`font-bold text-[13px] px-6 py-2 rounded-full shadow-sm transition-all duration-150 active:scale-95 cursor-pointer ${
                isHeroFollowing
                  ? "bg-white text-black hover:bg-neutral-100"
                  : "bg-[#cbfc01] hover:bg-[#bcf000] text-black"
              }`}
            >
              {isHeroFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </header>

      {/* 2. BOTTOM SIDE: CREATORS CARDS (6 CARDS) + PAGINATION */}
      <main
        id="creators-catalog-grid"
        className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 flex flex-col flex-1 scroll-mt-6"
      >
        {/* Section Heading & Subtitle */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <span className="text-[12px] font-bold text-[#003be2] uppercase tracking-wider bg-[#003be2]/10 px-3 py-1 rounded-full">
              Explore Instructors
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#1a1b1e] tracking-tight mt-2.5">
              Discover Talented Creators
            </h2>
            <p className="text-neutral-500 text-[13.5px] mt-1">
              Learn from top industry practitioners, design studios, and thought leaders.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <svg
              className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
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
              placeholder="Search creators..."
              className="w-full bg-[#f6f7f9] border border-[#e2e4e9] rounded-full pl-10 pr-4 py-2 text-[12.5px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#003be2] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Filter and Sorting Toolbar */}
        <div className="flex items-center justify-between py-2 flex-wrap gap-4 border-b border-[#f0f1f4] pb-5 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
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

          {/* Right Sort Button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="bg-white border border-[#e2e4e9] hover:border-neutral-400 text-[#3b3e45] text-[12px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer select-none"
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
              <svg
                className={`w-3 h-3 text-neutral-400 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
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

            {/* Dropdown menu */}
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-2xl shadow-xl py-1.5 z-40">
                {["Most Popular", "Highest Rated", "Most Followers", "Most Products"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSortSelect(item)}
                      className={`w-full text-left px-4 py-2 text-[12px] transition-colors cursor-pointer ${
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

        {/* 6 Creator Cards Grid */}
        <div className={`transition-opacity duration-200 ${isLoading ? "opacity-60" : "opacity-100"}`}>
          {creators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {creators.map((creator, index) => (
                <CreatorCard
                  key={`${creator.id}-${currentPage}-${index}`}
                  creator={creator}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-500">
              <p className="text-base font-medium">No creators found matching your criteria.</p>
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

        {/* Pagination Section (Showing 6 cards per page, with dynamic page numbers) */}
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

              {/* Dynamic Page Numbers (e.g. 1 2 3 4) */}
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
            {totalCreators > 0 && (
              <p className="text-[12.5px] text-neutral-500 font-normal">
                Showing{" "}
                <span className="font-semibold text-neutral-700">
                  {startIndex}–{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-neutral-700">
                  {totalCreators}
                </span>{" "}
                creators
              </p>
            )}
          </div>
        )}
      </main>

      {/* 3. Main Footer */}
      <Footer />
    </div>
  );
}
