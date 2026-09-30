import Image from "next/image";
import CourseInfoCard from "./CourseInfoCard";
import LearningProgressCard from "./LearningProgressCard";
import HappyStudentsCard from "./HappyStudentsCard";

export default function MainVisual() {
  return (
    <div className="relative w-full flex justify-center items-end select-none pointer-events-none pb-0">
      {/* 1. Large Lime Circular Background Shape */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-340px] sm:bottom-[-360px] lg:bottom-[-380px] left-1/2 -translate-x-1/2 w-[600px] sm:w-[720px] lg:w-[790px] aspect-square rounded-full bg-[#cbfc01] z-0 shadow-[0_0_80px_rgba(203,252,1,0.2)]"
      />

      {/* 2. Central Model & Floating Cards Container */}
      <div className="relative z-10 w-[340px] sm:w-[430px] lg:w-[475px] flex items-end justify-center">
        {/* Hero Model Image */}
        <div className="relative w-full">
          <Image
            src="/hero-person.png"
            alt="Smiling student with headphones holding a laptop"
            width={475}
            height={475}
            priority
            className="w-full h-auto object-contain block drop-shadow-[0_14px_28px_rgba(0,0,0,0.25)]"
          />
        </div>

        {/* 3. Floating Information Cards (Responsive Scaling) */}
        {/* Card 1: UI/UX Design (Left of ear/headset) */}
        <div className="absolute left-0 sm:-left-8 lg:-left-12 top-[19%] sm:top-[19%] lg:top-[20%] z-20 scale-[0.82] sm:scale-100 origin-bottom-left">
          <CourseInfoCard />
        </div>

        {/* Card 2: Learning Progress (Right of shoulder) */}
        <div className="absolute right-0 sm:-right-10 lg:-right-16 top-[21%] sm:top-[21%] lg:top-[22%] z-20 scale-[0.82] sm:scale-100 origin-bottom-right">
          <LearningProgressCard />
        </div>

        {/* Card 3: Happy Students (Bottom Left with safe bottom margin) */}
        <div className="absolute left-0 sm:-left-14 lg:-left-20 bottom-[14%] sm:bottom-[15%] lg:bottom-[16%] z-20 scale-[0.82] sm:scale-100 origin-bottom-left">
          <HappyStudentsCard />
        </div>
      </div>
    </div>
  );
}
