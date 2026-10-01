import Image from "next/image";
import CourseInfoCard from "./CourseInfoCard";
import LearningProgressCard from "./LearningProgressCard";

export default function MainVisual() {
  return (
    <div className="relative w-full flex justify-center items-end select-none pb-0">
      {/* 1. Large Lime Circular Background Shape */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-340px] sm:bottom-[-360px] lg:bottom-[-380px] left-1/2 -translate-x-1/2 w-[600px] sm:w-[720px] lg:w-[790px] aspect-square rounded-full bg-[#cbfc01] z-0 shadow-[0_0_80px_rgba(203,252,1,0.2)]"
      />

      {/* 2. Central Model & Floating Cards Container */}
      <div className="relative z-10 w-[340px] sm:w-[430px] lg:w-[475px] flex items-end justify-center">
        {/* Card 1: Authentic Course Card ("Learn Figma from Basic" - Layered behind model on the left) */}
        <div className="absolute -left-10 sm:-left-24 md:-left-32 lg:-left-36 top-[13%] sm:top-[14%] lg:top-[15%] z-10 scale-[0.76] sm:scale-[0.88] lg:scale-100 origin-top-left pointer-events-auto">
          <CourseInfoCard />
        </div>

        {/* 3D Lime Doodle (shape-1.png - Floating at top-right above progress card) */}
        <div className="absolute -right-2 sm:-right-6 lg:-right-10 top-[11%] sm:top-[12%] lg:top-[13%] z-10 w-[70px] sm:w-[85px] lg:w-[100px] pointer-events-none animate-float-slow">
          <Image
            src="/shape-1.png"
            alt="Lime 3D squiggle doodle"
            width={120}
            height={150}
            className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* Card 2: Learning Progress (55% - Layered on the right below the lime doodle) */}
        <div className="absolute -right-6 sm:-right-12 lg:-right-16 top-[33%] sm:top-[35%] lg:top-[37%] z-10 scale-[0.8] sm:scale-[0.92] lg:scale-100 origin-top-right pointer-events-auto">
          <LearningProgressCard />
        </div>

        {/* Hero Model Image (z-20: sits in front of the card edges, exactly like Image 1) */}
        <div className="relative w-full z-20 pointer-events-none">
          <Image
            src="/hero-person.png"
            alt="Smiling student with headphones holding a laptop"
            width={475}
            height={475}
            priority
            className="w-full h-auto object-contain block drop-shadow-[0_14px_28px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </div>
  );
}
