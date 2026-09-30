"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function CreatorCtaSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#003be2] hero-grid-bg text-white overflow-hidden flex flex-col items-center justify-center select-none">
      {/* 1. Left 3D Decorative Shapes Cluster */}
      <div className="absolute left-0 top-0 bottom-0 w-[180px] sm:w-[220px] lg:w-[260px] pointer-events-none z-0 hidden sm:block">
        <div className="relative w-full h-full animate-float-slow">
          <Image
            src="/cta-decor-left-transparent.png"
            alt=""
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 180px, 260px"
          />
        </div>
        {/* Subtle mid-left white squiggle overlay */}
        <div className="absolute top-[28%] left-[70%] w-[55px] sm:w-[68px] lg:w-[80px] -translate-x-1/2 animate-float-reverse">
          <Image
            src="/shape-2.png"
            alt=""
            width={80}
            height={90}
            className="w-full h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>

      {/* 2. Right 3D Decorative Shapes Cluster */}
      <div className="absolute right-0 top-0 bottom-0 w-[180px] sm:w-[220px] lg:w-[260px] pointer-events-none z-0 hidden sm:block">
        <div className="relative w-full h-full animate-float-reverse">
          <Image
            src="/cta-decor-right-transparent.png"
            alt=""
            fill
            className="object-contain object-right"
            sizes="(max-width: 768px) 180px, 260px"
          />
        </div>
      </div>

      {/* 3. Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.2] max-w-2xl"
        >
          Unlock Your Potential as a
          <br />
          Creator with ByteSpace
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-4 sm:mt-5 text-white/85 text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-[690px] mx-auto font-normal"
        >
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-7 sm:mt-8"
        >
          <button
            type="button"
            className="cursor-pointer px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#cbfc01] text-[#1a1b1e] font-semibold text-xs sm:text-sm tracking-tight hover:bg-[#d8ff1f] hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_10px_25px_rgba(203,252,1,0.28)]"
          >
            Join as Creator
          </button>
        </motion.div>
      </div>
    </section>
  );
}
