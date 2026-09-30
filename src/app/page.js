import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero/HeroSection";
import StatsSection from "@/components/StatsSection";
import CoursesSection from "@/components/Courses/CoursesSection";
import LearningPathsSection from "@/components/LearningPaths/LearningPathsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden">
      {/* Top Hero Container (matches reference 728px height on desktop) */}
      <div className="relative w-full min-h-[728px] lg:h-[728px] bg-[#003be2] hero-grid-bg flex flex-col justify-between overflow-hidden shrink-0">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Hero Section */}
        <HeroSection />
      </div>

      {/* Stats / Partner Logos Section (143px height on reference) */}
      <StatsSection />

      {/* Courses Catalog Section */}
      <CoursesSection />

      {/* Diverse Learning Paths Section */}
      <LearningPathsSection />
    </main>
  );
}
