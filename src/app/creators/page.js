import { Suspense } from "react";
import CreatorsCatalogPage from "@/components/Creators/CreatorsCatalogPage";

export const metadata = {
  title: "Explore Creators & Instructors - ByteSpace",
  description:
    "Discover top creators, instructors, and creative studios on ByteSpace.",
};

export default function CreatorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CreatorsCatalogPage />
    </Suspense>
  );
}

