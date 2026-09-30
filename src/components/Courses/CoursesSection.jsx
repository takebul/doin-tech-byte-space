"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CourseCard from "./CourseCard";

const categoryRows = [
  // Row 1
  [
    "Featured",
    "Music",
    "Drawing & Painting",
    "Marketing",
    "Animation",
    "Social Media",
    "UI/UX Design",
    "Creative Marketing",
  ],
  // Row 2
  [
    "Digital Illustration",
    "Film & Video",
    "Crafts",
    "Freelance & Entrepreneurship",
    "Graphic Design",
    "Photography",
  ],
  // Row 3
  [
    "Productivity",
    "Web Development",
    "Data Science",
    "Cooking",
  ],
];

const allCourses = [
  {
    id: 1,
    title: "Learn Figma from Basic",
    author: "purepearl studio",
    rating: 4.5,
    level: "Beginner",
    price: 25,
    image: "/course-1.png",
    category: "UI/UX Design",
  },
  {
    id: 2,
    title: "Build Digital Asset",
    author: "purepearl studio",
    rating: 4.5,
    level: "Beginner",
    price: 25,
    image: "/course-2.png",
    category: "Graphic Design",
  },
  {
    id: 3,
    title: "the Power of Big Data",
    author: "purepearl studio",
    rating: 4.5,
    level: "Beginner",
    price: 25,
    image: "/course-3.png",
    category: "Data Science",
  },
  {
    id: 4,
    title: "Balancing Productivity an...",
    author: "purepearl studio",
    rating: 4.5,
    level: "Beginner",
    price: 25,
    image: "/course-4.png",
    category: "Productivity",
  },
  {
    id: 5,
    title: "Mastering Money Manage...",
    author: "purepearl studio",
    rating: 4.5,
    level: "Beginner",
    price: 25,
    image: "/course-5.png",
    category: "Freelance & Entrepreneurship",
  },
  {
    id: 6,
    title: "From Idea to Startup Succ...",
    author: "purepearl studio",
    rating: 4.5,
    level: "Beginner",
    price: 25,
    image: "/course-6.png",
    category: "Marketing",
  },
];

export default function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [showMore, setShowMore] = useState(false);

  // If Featured, show all 6. If specific category, filter or show all if category doesn't have courses yet
  const filteredCourses =
    activeCategory === "Featured"
      ? allCourses
      : allCourses.filter((c) => c.category === activeCategory).length > 0
      ? allCourses.filter((c) => c.category === activeCategory)
      : allCourses;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 text-[#242528] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1a1b1e] tracking-tight leading-[1.18]"
          >
            Discover Your Passion,
            <br />
            Build Your Skills
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-[#82868e] text-sm sm:text-[15px] md:text-[15.5px] leading-relaxed max-w-2xl mx-auto font-normal"
          >
            At Bytespace Courses, we bring you closer to life-changing knowledge.
            Explore a variety of courses across different fields, from technology
            to the arts, and make a difference in your career and life.
          </motion.p>
        </div>

        {/* Category Pills (3 Centered Rows matching Figma layout) */}
        <div className="mt-9 sm:mt-11 flex flex-col items-center gap-2 sm:gap-2.5 select-none">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categoryRows[0].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[13.5px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#cbfc01] text-[#1c1d20] font-semibold shadow-sm scale-[1.02]"
                      : "bg-[#f5f5f6] text-[#4b4c53] font-medium hover:bg-[#ececed] hover:text-[#1c1d20]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categoryRows[1].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[13.5px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#cbfc01] text-[#1c1d20] font-semibold shadow-sm scale-[1.02]"
                      : "bg-[#f5f5f6] text-[#4b4c53] font-medium hover:bg-[#ececed] hover:text-[#1c1d20]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Row 3 with + More */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categoryRows[2].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[13.5px] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#cbfc01] text-[#1c1d20] font-semibold shadow-sm scale-[1.02]"
                      : "bg-[#f5f5f6] text-[#4b4c53] font-medium hover:bg-[#ececed] hover:text-[#1c1d20]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            <button
              onClick={() => setShowMore(!showMore)}
              className="px-3 sm:px-4 py-2 text-[13px] sm:text-[13.5px] text-[#0043ff] font-semibold hover:text-[#0034c4] transition-colors cursor-pointer"
            >
              + More
            </button>
          </div>
        </div>

        {/* 6 Courses Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
