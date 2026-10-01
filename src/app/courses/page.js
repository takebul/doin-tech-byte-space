import { Suspense } from "react";
import CoursesCatalogPage from "@/components/Courses/CoursesCatalogPage";

export const metadata = {
  title: "Find Your Next Course - ByteSpace",
  description: "Explore hundreds of high quality courses in UI/UX Design, Marketing, Programming, Animation, and more.",
};

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-white flex items-center justify-center text-sm text-neutral-400">Loading courses...</div>}>
      <CoursesCatalogPage />
    </Suspense>
  );
}
