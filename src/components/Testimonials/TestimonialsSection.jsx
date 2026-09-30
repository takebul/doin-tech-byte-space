"use client";

import Image from "next/image";
import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/testimonial-sarah.png",
    quote:
      "\"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.\"",
  },
  {
    id: 2,
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/testimonial-james.png",
    quote:
      "\"I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.\"",
  },
  {
    id: 3,
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/testimonial-alex.png",
    quote:
      "\"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.\"",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 overflow-hidden bg-white text-[#242528]">
      {/* Ambient background mesh glows matching reference image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Top-center / right soft lime-yellow glow */}
        <div className="absolute -top-10 left-[45%] w-[450px] h-[450px] rounded-full bg-[#cbfc01]/20 blur-[130px]" />
        {/* Far-right lime-yellow glow */}
        <div className="absolute top-1/4 -right-16 w-[380px] h-[380px] rounded-full bg-[#dcfc2f]/20 blur-[140px]" />
        {/* Bottom-left soft lavender-blue glow */}
        <div className="absolute -bottom-10 -left-10 w-[420px] h-[420px] rounded-full bg-[#9bb7ff]/20 blur-[140px]" />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Two Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start justify-between">
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[44px] font-extrabold text-[#1a1b1e] tracking-tight leading-[1.18]">
              Discover What Our
              <br />
              Community Is Saying
            </h2>
          </motion.div>

          {/* Right Column: Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 flex lg:justify-end"
          >
            <p className="text-[#82868e] text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-xl font-normal">
              At <strong className="font-semibold text-[#1a1b1e]">ByteSpace</strong>,
              our vibrant community of learners and creators is at the heart of
              what we do. Hear directly from those who have experienced the
              transformative journey of learning and creating on our platform.
              Explore testimonials that reflect the diverse perspectives of
              enthusiastic learners and accomplished creators.
            </p>
          </motion.div>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-[24px] sm:rounded-[26px] p-6 sm:p-7 md:p-8 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Avatar */}
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 select-none ring-2 ring-white shadow-sm">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Name & Role */}
                  <div className="mt-4">
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#1a1b1e] tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[#0043ff] text-[13px] sm:text-[13.5px] font-medium mt-0.5">
                      {item.role}
                    </p>
                  </div>

                  {/* Quote */}
                  <p className="mt-5 text-[#585a62] text-[13.5px] sm:text-[14px] leading-relaxed font-normal">
                    {item.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
