import { Suspense } from "react";
import UnauthorizedSection from "@/components/ErrorPages/UnauthorizedSection";

export const metadata = {
  title: "401 - Unauthorized Access | ByteSpace",
  description: "Authentication is required to access this resource on ByteSpace.",
};

export default function UnauthorizedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#003be2] hero-grid-bg flex items-center justify-center text-white">
          <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UnauthorizedSection />
    </Suspense>
  );
}
