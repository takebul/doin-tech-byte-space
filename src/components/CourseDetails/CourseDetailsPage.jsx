"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function CourseSidebarCard({ enrolled, handleEnroll }) {
  return (
    <div className="w-full bg-white rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 shadow-2xl border border-neutral-100 flex flex-col">
      {/* Syllabus Header */}
      <h2 className="text-[#18181b] font-bold text-[16px] tracking-tight mb-4">
        112 Lessons (24 hours)
      </h2>

      {/* Sample Lessons Preview */}
      <div className="space-y-2.5 pb-4 border-b border-[#f0f1f4]">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-[#2d313a]">
            <span className="font-semibold text-neutral-400 mr-1.5">01</span>
            Introduction to Digital Assets
          </span>
          <span className="text-[#0047ff] font-medium shrink-0 ml-2">12 mins</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-[#2d313a]">
            <span className="font-semibold text-neutral-400 mr-1.5">02</span>
            Design Principles for Impacts
          </span>
          <span className="text-[#0047ff] font-medium shrink-0 ml-2">21 mins</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-medium text-[#2d313a]">
            <span className="font-semibold text-neutral-400 mr-1.5">03</span>
            Advanced Techniques in Digital Creation
          </span>
          <span className="text-[#0047ff] font-medium shrink-0 ml-2">16 mins</span>
        </div>
        <p className="text-[11.5px] text-[#8c919c] pt-0.5">99 more videos</p>
      </div>

      {/* Ready to dive in prompt */}
      <p className="text-[11.5px] text-[#696e79] mt-4 mb-2 leading-relaxed font-normal">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mt-1 mb-3">
        <span className="text-[#003be2] font-black text-[30px] tracking-tight leading-none">
          $25
        </span>
        <span className="text-[#8c919c] text-[12px] font-normal">/lifetime</span>
      </div>

      {/* Enroll Button */}
      <button
        type="button"
        onClick={handleEnroll}
        disabled={enrolled}
        className="w-full bg-[#cbfc01] hover:bg-[#bcf000] text-black font-bold text-[13.5px] py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-75"
      >
        {enrolled ? "Enrolling..." : "Enroll Now"}
      </button>

      {/* This course include */}
      <div className="mt-6 pt-5 border-t border-[#f0f1f4]">
        <h3 className="text-[#18181b] font-bold text-[13.5px] mb-3.5">
          This course include
        </h3>
        <ul className="space-y-2.5">
          {[
            {
              label: "Learning Resources",
              icon: (
                <svg className="w-4 h-4 text-[#0047ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              ),
            },
            {
              label: "Quality Lesson Videos",
              icon: (
                <svg className="w-4 h-4 text-[#0047ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ),
            },
            {
              label: "Certificate of Completion",
              icon: (
                <svg className="w-4 h-4 text-[#0047ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              ),
            },
            {
              label: "Private Consultation",
              icon: (
                <svg className="w-4 h-4 text-[#0047ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
          ].map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-[12px] text-[#4b4f58] font-medium">
              <span className="shrink-0">{feat.icon}</span>
              <span>{feat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Creator Profile Card */}
      <div className="mt-6 pt-5 border-t border-[#f0f1f4] flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0 border border-neutral-200">
            <Image
              src="/creator-purepearl-avatar.png"
              alt="PurePearl Studio creator"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[13px] text-[#18181b] leading-tight">
              PurePearl Studio
            </h4>
            <span className="text-[11px] text-[#717682] font-normal">
              Professional Creator
            </span>
          </div>
        </div>

        <p className="text-[11px] text-[#717682] mt-2.5 mb-3 leading-relaxed">
          Ready to Dive In? Enroll Now and Start Building Your Digital Future!
        </p>

        <button
          type="button"
          onClick={() => alert("Creator Profile: PurePearl Studio has authored 12 top-tier courses on ByteSpace.")}
          className="w-fit border border-[#d6d9e0] hover:border-neutral-400 bg-white text-[#2c3038] text-[11px] font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          See Full Profile
        </button>
      </div>

    </div>
  );
}

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("About");
  const [isPlaying, setIsPlaying] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [shared, setShared] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("All rating");

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } else {
      alert("Link copied to clipboard!");
    }
  };

  const handleEnroll = () => {
    setEnrolled(true);
    setTimeout(() => {
      alert("Congratulations! You have successfully enrolled in 'Build Digital Asset: A Comprehensive Guide'.");
      setEnrolled(false);
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* 1. Header Banner with Blue Electric Grid (Extends down to bottom of video player) */}
      <header className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-0 flex flex-col">
        {/* Navigation */}
        <Navbar />

        {/* Course Info + Video Grid Container */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8">
          
          {/* Header Top Row: Titles & Share Button */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6 sm:mb-8">
            <div className="flex flex-col items-start max-w-[760px]">
              {/* Title */}
              <h1 className="text-white font-extrabold text-[28px] sm:text-[36px] lg:text-[40px] tracking-[-0.025em] leading-[1.15]">
                Build Digital Asset: A Comprehensive Guide
              </h1>

              {/* Subtitle */}
              <p className="text-white/85 text-[14px] sm:text-[15px] mt-2 font-normal">
                Unlock the Power of Digital Creation with Expert Guidance
              </p>

              {/* Author */}
              <p className="text-[13px] text-white/90 mt-2 font-normal">
                by{" "}
                <span className="text-[#cbfc01] font-medium hover:underline cursor-pointer">
                  purepearl studio
                </span>
              </p>

              {/* Meta Tags (3 white rounded pills) */}
              <div className="flex items-center gap-2.5 mt-4 flex-wrap select-none">
                {/* Level */}
                <div className="bg-white text-[#22242a] text-[12px] font-medium px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <svg
                    className="w-3.5 h-3.5 text-neutral-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                  <span>Intermediate</span>
                </div>

                {/* Rating */}
                <div className="bg-white text-[#22242a] text-[12px] font-medium px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <svg
                    className="w-3.5 h-3.5 text-[#003be2]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.8 (172 reviews)</span>
                </div>

                {/* Students count */}
                <div className="bg-white text-[#22242a] text-[12px] font-medium px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <svg
                    className="w-3.5 h-3.5 text-neutral-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>199 Students</span>
                </div>
              </div>
            </div>

            {/* Share Button (Top Right) */}
            <div className="shrink-0 self-start">
              <button
                type="button"
                onClick={handleShare}
                className="bg-[#cbfc01] hover:bg-[#bcf000] text-black font-semibold text-[13px] px-5 py-2 rounded-full flex items-center gap-2 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span>{shared ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* Row 2: Video Player (Left 8 cols) & Desktop Sidebar Anchor (Right 4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              {/* Video Player Card (Sits completely on blue background) */}
              <div className="relative w-full aspect-[16/10.5] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl bg-neutral-100 border border-neutral-100 group">
                <Image
                  src="/course-video-player.png"
                  alt="Course preview video"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Play Button Overlay */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label="Play Course Video Preview"
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 text-neutral-800" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-neutral-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Sidebar Anchor (Starts in header, hangs down into white section) */}
            <div className="hidden lg:block lg:col-span-4 relative">
              <div className="absolute top-0 left-0 w-full z-30">
                <CourseSidebarCard enrolled={enrolled} handleEnroll={handleEnroll} />
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. White Main Section below Blue Header (Tabs & Content) */}
      <main className="w-full bg-white text-[#18181b] relative z-20 pb-20">
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-7 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start min-h-[600px]">
            
            {/* LEFT COLUMN (8 cols): Tabs + Active Tab Content */}
            <div className="lg:col-span-8 flex flex-col">
              
              {/* Navigation Tabs (About, Lesson, Reviews) */}
              <div className="flex items-center gap-2 select-none">
                {["About", "Lesson", "Reviews"].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#cbfc01] text-black shadow-xs font-semibold"
                          : "bg-white border border-[#e2e4e9] text-[#4b4f58] hover:border-neutral-400"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content: About */}
              {activeTab === "About" && (
                <div className="mt-6 flex flex-col">
                  {/* Description */}
                  <h2 className="text-[#18181b] font-bold text-[18px] tracking-tight mb-3">
                    Description
                  </h2>
                  <div className="space-y-4 text-[#4b4f58] text-[13px] sm:text-[13.5px] leading-[1.75] font-normal">
                    <p>
                      Embark on an enlightening exploration into the world of digital creation with our comprehensive course, &quot;Build Digital Assets: A Comprehensive Guide.&quot; This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.
                    </p>
                    <p>
                      In the initial modules, you&apos;ll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.
                    </p>
                    <p>
                      As you progress through the course, you&apos;ll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.
                    </p>
                  </div>

                  {/* Sneak Peak Section */}
                  <h3 className="text-[#18181b] font-bold text-[17px] tracking-tight mt-9 mb-3.5">
                    Sneak Peak
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-[560px]">
                    {[
                      { src: "/sneak-peek-1.png", alt: "Sketching digital layout" },
                      { src: "/sneak-peek-2.png", alt: "Laptop design screen" },
                      { src: "/sneak-peek-3.png", alt: "Desktop UI workstation" },
                      { src: "/sneak-peek-4.png", alt: "Mobile app interfaces" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="relative aspect-[16/10] rounded-[14px] overflow-hidden border border-[#e2e4e9] shadow-xs group bg-neutral-100"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Key Points Section */}
                  <h3 className="text-[#18181b] font-bold text-[17px] tracking-tight mt-9 mb-4">
                    Key Points
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Foundational Concepts",
                      "Design Principles Mastery",
                      "Advanced Techniques in Digital Creation",
                      "Project Showcase and Critique",
                      "Optimizing for Various Platforms",
                      "Digital Asset Management Best Practices",
                      "Monetization Strategies",
                      "Capstone Project: Build Your Portfolio",
                    ].map((point, index) => (
                      <li key={index} className="flex items-center gap-3 text-[13.5px] text-[#25282f] font-medium">
                        {/* Blue circular checkmark */}
                        <span className="w-4 h-4 rounded-full bg-[#003be2] text-white flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab Content: Lesson */}
              {activeTab === "Lesson" && (
                <div className="mt-6 flex flex-col">
                  {/* Heading */}
                  <h2 className="text-[#18181b] font-bold text-[18px] tracking-tight mb-2.5">
                    Explore the Modules
                  </h2>
                  <p className="text-[#4b4f58] text-[13px] sm:text-[13.5px] leading-[1.7] font-normal mb-7">
                    Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.
                  </p>

                  {/* Lesson List Heading */}
                  <h3 className="text-[#18181b] font-bold text-[16px] tracking-tight mb-5">
                    Lesson List
                  </h3>

                  {/* Modules List */}
                  <div className="space-y-5">
                    {[
                      {
                        title: "Module 1: Introduction to Digital Assets",
                        description:
                          "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
                      },
                      {
                        title: "Module 2: Design Principles for Impact",
                        description:
                          "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
                      },
                      {
                        title: "Module 4: User-Centric Design Strategies",
                        description:
                          "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
                      },
                      {
                        title: "Module 5: Interactive Media and Engagement",
                        description:
                          "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
                      },
                      {
                        title: "Module 6: Project Showcase and Critique",
                        description:
                          "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
                      },
                      {
                        title: "Module 7: Optimizing Digital Assets for Various Platforms",
                        description:
                          "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
                      },
                    ].map((mod, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        {/* Lime rounded square icon with video camera */}
                        <div className="w-10 h-10 rounded-[12px] bg-[#cbfc01] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <svg
                            className="w-5 h-5 text-black"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h11a2 2 0 002-2v-2.172l3.293 2.195A1 1 0 0022 17.172V6.828a1 1 0 00-1.707-.828L17 8.172V8a2 2 0 00-2-2H4z" />
                          </svg>
                        </div>
                        {/* Content */}
                        <div className="flex flex-col">
                          <h4 className="font-bold text-[13.5px] sm:text-[14px] text-[#18181b] tracking-tight leading-snug">
                            {mod.title}
                          </h4>
                          <p className="text-[12.5px] sm:text-[13px] text-[#555a64] leading-[1.65] font-normal mt-1">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lesson Content Section */}
                  <h3 className="text-[#18181b] font-bold text-[16px] tracking-tight mt-9 mb-2.5">
                    Lesson Content
                  </h3>
                  <p className="text-[#4b4f58] text-[13px] sm:text-[13.5px] leading-[1.7] font-normal mb-8">
                    Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.
                  </p>

                  {/* Lesson Progress Tracking */}
                  <h3 className="text-[#18181b] font-bold text-[16px] tracking-tight mt-1 mb-2.5">
                    Lesson Progress Tracking
                  </h3>
                  <p className="text-[#4b4f58] text-[13px] sm:text-[13.5px] leading-[1.7] font-normal mb-5">
                    Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.
                  </p>

                  {/* Progress Card */}
                  <div className="rounded-[18px] border border-[#e2e4e9] p-5 sm:p-6 bg-white max-w-[540px]">
                    <span className="text-[11.5px] text-[#717682] font-semibold block">
                      Learning Progress
                    </span>
                    <span className="text-[32px] sm:text-[36px] font-black text-[#18181b] block mt-1 mb-3.5 tracking-tight leading-none">
                      55%
                    </span>
                    <div className="w-full bg-[#f0f1f4] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#cbfc01] h-full rounded-full transition-all duration-500"
                        style={{ width: "55%" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content: Reviews */}
              {activeTab === "Reviews" && (
                <div className="mt-6 flex flex-col">
                  {/* Heading */}
                  <h2 className="text-[#18181b] font-bold text-[18px] tracking-tight mb-2.5">
                    What Learners Are Saying
                  </h2>
                  <p className="text-[#4b4f58] text-[13px] sm:text-[13.5px] leading-[1.7] font-normal mb-6">
                    Discover what our learners have to say about their experience with &apos;Build Digital Assets: A Comprehensive Guide.&apos; Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.
                  </p>

                  {/* Overall Ratings Card */}
                  <div className="rounded-[20px] border border-[#e2e4e9] p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-white mb-8">
                    {/* Lime Ratings Badge */}
                    <div className="bg-[#cbfc01] w-28 h-28 sm:w-30 sm:h-30 rounded-[18px] flex flex-col items-center justify-center shrink-0 shadow-2xs">
                      <span className="text-[12px] font-bold text-black/85 tracking-wide">
                        Ratings
                      </span>
                      <span className="text-[38px] sm:text-[42px] font-black text-black leading-none mt-1">
                        4.7
                      </span>
                    </div>

                    {/* Star Progress Breakdown */}
                    <div className="flex-1 w-full space-y-2.5">
                      {[
                        { percent: 90, count: 720 },
                        { percent: 32, count: 120 },
                        { percent: 8, count: 21 },
                        { percent: 4, count: 12 },
                        { percent: 6, count: 16 },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center gap-3 sm:gap-4 text-[12px]">
                          {/* Progress bar */}
                          <div className="flex-1 bg-[#f0f1f4] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#cbfc01] h-full rounded-full"
                              style={{ width: `${row.percent}%` }}
                            />
                          </div>
                          {/* 5 black stars */}
                          <div className="flex items-center gap-0.5 shrink-0 text-[#18181b]">
                            {[...Array(5)].map((_, s) => (
                              <svg
                                key={s}
                                className="w-3.5 h-3.5 fill-current text-[#18181b]"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {/* Count */}
                          <span className="text-[12px] font-medium text-[#717682] w-7 text-right shrink-0">
                            {row.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Reviews Heading */}
                  <h3 className="text-[#18181b] font-bold text-[16px] tracking-tight mb-4">
                    Individual Reviews:
                  </h3>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 flex-wrap mb-6 select-none">
                    {["All rating", "★ 5", "★ 4", "★ 3", "★ 2", "★ 1"].map((filter) => {
                      const isFilterActive = reviewFilter === filter;
                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setReviewFilter(filter)}
                          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer ${
                            isFilterActive
                              ? "bg-[#cbfc01] text-black font-semibold shadow-xs"
                              : "bg-white border border-[#e2e4e9] text-[#4b4f58] hover:border-neutral-400"
                          }`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        name: "PurePearl Studio",
                        role: "UI/UX Designer",
                        time: "a year ago",
                        stars: 5,
                        ratingKey: "★ 5",
                        avatar: "/reviewer-purepearl.png",
                        content:
                          "“The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!”",
                      },
                      {
                        id: 2,
                        name: "Albert Flores",
                        role: "UI/UX Designer",
                        time: "a year ago",
                        stars: 5,
                        ratingKey: "★ 5",
                        avatar: "/reviewer-albert.png",
                        content:
                          "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I’ve learned!",
                      },
                      {
                        id: 3,
                        name: "Cody Fisher",
                        role: "UI/UX Designer",
                        time: "a year ago",
                        stars: 5,
                        ratingKey: "★ 5",
                        avatar: "/reviewer-cody.png",
                        content:
                          "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
                      },
                      {
                        id: 4,
                        name: "Brooklyn Simmons",
                        role: "UI/UX Designer",
                        time: "a year ago",
                        stars: 5,
                        ratingKey: "★ 5",
                        avatar: "/reviewer-brooklyn.png",
                        content:
                          "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
                      },
                    ]
                      .filter((r) => reviewFilter === "All rating" || r.ratingKey === reviewFilter)
                      .map((rev) => (
                        <div
                          key={rev.id}
                          className="rounded-[20px] border border-[#e2e4e9] p-5 sm:p-6 bg-white hover:border-neutral-300 transition-colors"
                        >
                          {/* Top row */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0 border border-neutral-200">
                                <Image
                                  src={rev.avatar}
                                  alt={rev.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <h4 className="font-bold text-[13.5px] text-[#18181b] leading-tight">
                                  {rev.name}
                                </h4>
                                <span className="text-[11.5px] text-[#717682] font-normal">
                                  {rev.role}
                                </span>
                              </div>
                            </div>
                            <span className="text-[11.5px] text-[#8c919c] font-normal">
                              {rev.time}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex items-center gap-1 mb-3 text-[#18181b]">
                            {[...Array(rev.stars)].map((_, s) => (
                              <svg
                                key={s}
                                className="w-3.5 h-3.5 fill-current text-[#18181b]"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>

                          {/* Review text */}
                          <p className="text-[12.5px] sm:text-[13px] text-[#4b4f58] leading-[1.65] font-normal">
                            {rev.content}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN (4 cols): Reserved space for Sidebar on Desktop, or Mobile inline */}
            <div className="lg:col-span-4 w-full">
              {/* Mobile Sidebar (< lg) */}
              <div className="block lg:hidden mt-8">
                <CourseSidebarCard enrolled={enrolled} handleEnroll={handleEnroll} />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 3. Main Footer */}
      <Footer />
    </div>
  );
}
