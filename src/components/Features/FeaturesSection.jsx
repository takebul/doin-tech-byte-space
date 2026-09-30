"use client";

import Image from "next/image";
import { motion } from "motion/react";

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const creatorFeatures = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden bg-white text-[#242528]">
      {/* Ambient background mesh glows matching reference image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top-left soft lime-yellow glow */}
        <div className="absolute -top-16 left-[5%] w-[420px] h-[420px] rounded-full bg-[#cbfc01]/15 blur-[120px]" />
        {/* Top-right soft sky-blue glow */}
        <div className="absolute top-20 right-[5%] w-[380px] h-[380px] rounded-full bg-[#8fb2ff]/15 blur-[120px]" />
        {/* Bottom-left lime glow */}
        <div className="absolute bottom-10 -left-10 w-[440px] h-[440px] rounded-full bg-[#cbfc01]/20 blur-[130px]" />
        {/* Bottom-right soft purple/blue glow */}
        <div className="absolute bottom-20 right-[10%] w-[380px] h-[380px] rounded-full bg-[#9bb7ff]/15 blur-[130px]" />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            BLOCK 1: Your Path to Professional Growth Starts Here!
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, text, and 3 key metrics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-extrabold text-[#1a1b1e] tracking-tight leading-[1.16]">
              Your Path to Professional
              <br />
              Growth Starts Here!
            </h2>

            <p className="mt-5 text-[#82868e] text-sm sm:text-[15px] md:text-base leading-relaxed max-w-lg font-normal">
              Explore our curated selection of courses tailored to enhance your
              capabilities and accelerate your career journey. Whether you are
              looking to sharpen specific skills, gain industry expertise, or
              embark on a new career path entirely, we have the resources you
              need.
            </p>

            {/* Stats Row */}
            <div className="mt-9 sm:mt-11 flex items-center gap-8 sm:gap-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[#0043ff] font-extrabold text-3xl sm:text-4xl md:text-[40px] tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[#82868e] text-xs sm:text-sm font-medium mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Composition with floating cards and student */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[490px] aspect-[430/425] transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/feature-growth-visual.png"
                alt="Student learning progress and growth"
                fill
                sizes="(max-width: 768px) 100vw, 490px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            BLOCK 2: Create & Manage Courses Easily.
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-24 sm:mt-32 lg:mt-36">
          {/* Left Column: Visual Composition with creator model and revenue cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 order-2 lg:order-1 flex items-center justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[460px] aspect-[400/415] transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/feature-creator-visual.png"
                alt="Course creator analytics and revenue management"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column: Heading, text, and checkmark list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-extrabold text-[#1a1b1e] tracking-tight leading-[1.16]">
              Create & Manage
              <br />
              Courses Easily.
            </h2>

            <p className="mt-5 text-[#82868e] text-sm sm:text-[15px] md:text-base leading-relaxed max-w-lg font-normal">
              <strong className="font-semibold text-[#1a1b1e]">ByteSpace</strong>{" "}
              supports individuals or entities in the creation, publication, and
              administration of educational courses.
            </p>

            {/* Checkmark Features */}
            <div className="mt-8 flex flex-col gap-3.5 sm:gap-4">
              {creatorFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  {/* Blue circular checkmark icon */}
                  <div className="w-5 h-5 rounded-full bg-[#0043ff] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110">
                    <svg
                      className="w-3 h-3 text-white stroke-[2.5]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[15px] sm:text-[16px] font-semibold text-[#1c1d20] tracking-tight group-hover:text-[#0043ff] transition-colors">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
