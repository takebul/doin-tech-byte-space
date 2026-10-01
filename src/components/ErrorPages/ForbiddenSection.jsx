"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function ForbiddenSection() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/signin");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* Top Blue Hero Section with Electric Grid Background */}
      <div className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-20 sm:pb-28 lg:pb-36 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Navbar />

        {/* 403 Hero Content Area */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-10 lg:pt-14 flex flex-col items-center justify-center flex-1 my-auto">
          {/* Numbers 403 with Overlapping Headline */}
          <div className="relative flex flex-col items-center justify-center select-none w-full">
            {/* Giant Gradient 403 */}
            <span
              className="text-[170px] sm:text-[240px] md:text-[300px] lg:text-[350px] font-black tracking-[-0.035em] leading-[0.8] select-none bg-gradient-to-b from-[#ff7e5f] via-[#feb47b] to-[#cbfc01]/40 bg-clip-text text-transparent"
              aria-hidden="true"
            >
              403
            </span>

            {/* Headline Overlapping the bottom of 403 */}
            <div className="absolute -bottom-4 sm:-bottom-7 md:-bottom-9 lg:-bottom-12 inset-x-0 flex flex-col items-center text-center px-4 z-10">
              <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-300/30 px-3.5 py-1 rounded-full text-white text-[12px] font-semibold mb-2">
                <svg className="w-3.5 h-3.5 text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <span>Access Denied</span>
              </div>
              <h1 className="text-white font-extrabold text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px] leading-[1.12] tracking-[-0.02em] max-w-[860px]">
                Access to this area
                <br />
                is strictly forbidden
              </h1>
            </div>
          </div>

          {/* Subtitle & Action Buttons */}
          <div className="flex flex-col items-center text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 z-20">
            <p className="text-white/85 text-[13px] sm:text-[14px] font-normal max-w-[500px] leading-relaxed">
              {currentUser
                ? `You are signed in as ${currentUser.name || currentUser.email}, but your account lacks the administrative or creator privileges required to view this area.`
                : "You do not have the required permissions or credentials to access this protected area."}
            </p>

            <div className="flex items-center gap-3 mt-7 flex-wrap justify-center">
              <Link
                href="/"
                className="bg-[#cbfc01] hover:bg-[#bcf000] text-black font-bold text-[13px] sm:text-[13.5px] px-8 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Back to Home</span>
              </Link>

              <Link
                href="/courses"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] sm:text-[13.5px] px-7 py-2.5 rounded-full border border-white/20 transition-all duration-150 cursor-pointer"
              >
                Browse Courses
              </Link>

              {currentUser && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-white/75 hover:text-white font-medium text-[13px] sm:text-[13.5px] px-4 py-2.5 transition-colors cursor-pointer hover:underline"
                >
                  Switch Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer on White Background */}
      <Footer />
    </div>
  );
}
