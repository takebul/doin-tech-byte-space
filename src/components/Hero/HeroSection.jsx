import HeroSearch from "./HeroSearch";
import MainVisual from "./MainVisual";
import DecorativeShapes from "./DecorativeShapes";

export default function HeroSection() {
  return (
    <section className="relative w-full flex-1 flex flex-col justify-between items-center pt-4 sm:pt-6 lg:pt-8 pb-0 overflow-hidden">
      {/* Background Floating 3D Shapes */}
      <DecorativeShapes />

      {/* Hero Headline, Subtitle, & Search */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-white font-extrabold text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.06] tracking-[-0.025em]">
          Get Access to Hundreds <br />
          Courses Available
        </h1>

        <p className="mt-3.5 mb-6 sm:mb-7 text-white/85 text-[12.5px] sm:text-[13.5px] lg:text-[14px] max-w-[580px] mx-auto font-normal leading-relaxed">
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
        </p>

        {/* Hero Search Bar */}
        <HeroSearch />
      </div>

      {/* Main Central Visual (Model + Lime Shape + Floating Cards) */}
      <div className="relative z-20 w-full mt-2 sm:mt-4 flex justify-center">
        <MainVisual />
      </div>
    </section>
  );
}
