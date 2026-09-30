"use client";

import Image from "next/image";
import { motion } from "motion/react";

const logos = [
  { id: 1, src: "/logo-1.png", alt: "Logoipsum Wave" },
  { id: 2, src: "/logo-2.png", alt: "Logoipsum Sunburst" },
  { id: 3, src: "/logo-3.png", alt: "Logoipsum Lightning" },
  { id: 4, src: "/logo-4.png", alt: "Logoipsum Clover" },
  { id: 5, src: "/logo-5.png", alt: "Logoipsum Ripple" },
];

export default function StatsSection() {
  return (
    <section
      aria-label="Partners and Statistics"
      className="relative z-20 w-full bg-[#f5f5f6] min-h-[100px] sm:h-[143px] flex items-center border-t border-black/[0.04] shrink-0 py-6 sm:py-0"
    >
      <div className="w-full max-w-[880px] mx-auto px-6 sm:px-8">
        {/* Responsive Logo Container: wraps nicely on mobile, single row on desktop */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-x-8 sm:gap-x-6 gap-y-4 sm:gap-y-0">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center cursor-pointer transition-opacity duration-200 opacity-90 hover:opacity-100 shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={125}
                height={36}
                className="h-[21px] sm:h-[24px] lg:h-[26px] w-auto object-contain select-none"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
