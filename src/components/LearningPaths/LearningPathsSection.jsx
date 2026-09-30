"use client";

import Image from "next/image";
import { motion } from "motion/react";

const learningPaths = [
  {
    id: 1,
    title: "Design",
    icon: "/category-design.png",
  },
  {
    id: 2,
    title: "Development",
    icon: "/category-development.png",
  },
  {
    id: 3,
    title: "IT & Software",
    icon: "/category-it-software.png",
  },
  {
    id: 4,
    title: "Business",
    icon: "/category-business.png",
  },
  {
    id: 5,
    title: "Marketing",
    icon: "/category-marketing.png",
  },
  {
    id: 6,
    title: "Photography",
    icon: "/category-photography.png",
  },
];

export default function LearningPathsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 text-[#242528] relative overflow-hidden border-t border-[#f0f1f3]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-[42px] lg:text-[44px] font-extrabold text-[#1a1b1e] tracking-tight leading-[1.2]"
          >
            Explore Diverse Learning Paths at Bytespace
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-[#82868e] text-sm sm:text-[15px] md:text-[15.5px] leading-relaxed max-w-2xl mx-auto font-normal"
          >
            At Bytespace, we believe in empowering individuals through knowledge.
            Our diverse range of courses spans various fields, ensuring
            there&apos;s something for everyone. Unleash your potential and explore
            our carefully curated categories.
          </motion.p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer bg-white rounded-[22px] sm:rounded-[24px] py-7 sm:py-8 px-3 sm:px-4 border border-[#e5e7eb] hover:border-[#cbfc01] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col items-center justify-center text-center select-none"
              >
                {/* Icon Circle */}
                <div className="relative w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-full overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={path.icon}
                    alt={path.title}
                    width={54}
                    height={54}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Category Title */}
                <h3 className="mt-4 text-[14.5px] sm:text-[15.5px] font-semibold text-[#1c1d20] tracking-tight group-hover:text-[#0043ff] transition-colors leading-tight">
                  {path.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
