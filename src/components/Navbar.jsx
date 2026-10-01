"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ByteSpaceLogo from "./Hero/ByteSpaceLogo";
import { authClient } from "@/lib/auth-client";
import { fetchUserEnrollments } from "@/lib/api";
import EnrolledCoursesDrawer from "./EnrolledCourses/EnrolledCoursesDrawer";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [enrolledCount, setEnrolledCount] = useState(0);

  // Sign Out Modal State
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Directly consume Better-Auth session backed by cookieCache and MongoDB
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  // Lock body scroll when sign out modal is open
  useEffect(() => {
    if (showSignOutModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSignOutModal]);

  // Close sign out modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showSignOutModal && !isSigningOut) {
        setShowSignOutModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSignOutModal, isSigningOut]);

  useEffect(() => {
    if (!currentUser) {
      setEnrolledCount(0);
      return;
    }
    fetchUserEnrollments(currentUser.email, currentUser.id).then((list) => {
      setEnrolledCount(list?.length || 0);
    });

    const handleUpdate = (e) => {
      if (e.detail?.total !== undefined) {
        setEnrolledCount(e.detail.total);
      } else {
        fetchUserEnrollments(currentUser?.email, currentUser?.id).then((list) => {
          setEnrolledCount(list?.length || 0);
        });
      }
    };
    const handleOpenDrawer = () => setDrawerOpen(true);
    window.addEventListener("bytespace:enrollment-updated", handleUpdate);
    window.addEventListener("bytespace:open-enrolled-drawer", handleOpenDrawer);
    return () => {
      window.removeEventListener("bytespace:enrollment-updated", handleUpdate);
      window.removeEventListener("bytespace:open-enrolled-drawer", handleOpenDrawer);
    };
  }, [currentUser]);

  const handleOpenSignOutModal = () => {
    setShowSignOutModal(true);
    setMobileMenuOpen(false);
  };

  const handleConfirmSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      setShowSignOutModal(false);
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Creators", href: "/creators" },
  ];

  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setMounted(true);
    const updatePath = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };
    updatePath();
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, [pathname]);

  const activePath = (
    (mounted && typeof window !== "undefined" ? window.location.pathname : "") ||
    pathname ||
    currentPath ||
    "/"
  ).toLowerCase();

  const isActiveLink = (href) => {
    if (href === "/") {
      return activePath === "/" || activePath === "";
    }
    if (href === "/courses") {
      return (
        activePath === "/courses" ||
        activePath.startsWith("/courses/") ||
        activePath.startsWith("/course-details")
      );
    }
    if (href === "/creators") {
      return (
        activePath === "/creators" ||
        activePath.startsWith("/creators/") ||
        activePath.startsWith("/creator-profile")
      );
    }
    return activePath === href;
  };

  return (
    <header className="relative z-30 w-full pt-6 pb-2 px-6 sm:px-12 lg:px-22 max-w-[1440px] mx-auto flex items-center justify-between">
      {/* Brand Logo (Left) */}
      <div className="flex items-center">
        <Link href="/" aria-label="ByteSpace Home">
          <ByteSpaceLogo />
        </Link>
      </div>

      {/* Desktop Navigation Links (Center) - Dynamic Route Active Color Switching */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:flex items-center gap-7 lg:gap-8 absolute left-1/2 -translate-x-1/2"
      >
        {navLinks.map((link) => {
          const active = isActiveLink(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] transition-colors duration-150 py-1 ${
                active
                  ? "text-white font-semibold"
                  : "text-white/70 font-normal hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Right Action Items */}
      <div className="hidden md:flex items-center gap-5 lg:gap-6">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors">
              <div className="w-5 h-5 rounded-full bg-[#cbfc01] text-[#18181b] font-bold text-[10px] flex items-center justify-center uppercase">
                {currentUser.name ? currentUser.name[0] : "U"}
              </div>
              <span className="text-white text-[13px] font-medium max-w-[110px] truncate">
                {currentUser.name?.split(" ")[0] || "User"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleOpenSignOutModal}
              className="text-white/70 hover:text-white text-[12px] font-normal transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/signin"
              className={`text-[13px] transition-colors duration-150 ${
                pathname === "/signin"
                  ? "text-white font-semibold"
                  : "text-white/70 font-normal hover:text-white"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className={`text-[13px] transition-colors duration-150 ${
                pathname === "/register"
                  ? "text-white font-semibold"
                  : "text-white/70 font-normal hover:text-white"
              }`}
            >
              Join Us
            </Link>
          </>
        )}

        {/* Enrolled Courses / Shopping Bag Icon */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Enrolled Courses History"
          className="relative text-white/90 hover:text-white p-1 transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded cursor-pointer group"
          title="View Enrolled Courses History"
        >
          <svg
            className="w-[19px] h-[19px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bag outline */}
            <path d="M6 3h12l2 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l2-5Z" />
            <path d="M4 8h16" />
            {/* Handle */}
            <path d="M9 11a3 3 0 0 0 6 0" />
          </svg>
          {enrolledCount > 0 && (
            <span className="absolute -top-1 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#cbfc01] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-xs">
              {enrolledCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="flex md:hidden items-center gap-3">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Enrolled Courses History"
          className="relative text-white p-1"
          title="View Enrolled Courses History"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h12l2 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l2-5Z" />
            <path d="M4 8h16" />
            <path d="M9 11a3 3 0 0 0 6 0" />
          </svg>
          {enrolledCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 bg-[#cbfc01] text-black font-extrabold text-[9px] rounded-full flex items-center justify-center shadow-xs">
              {enrolledCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full px-6 py-4 bg-[#071e5f]/95 backdrop-blur-md border-b border-white/10 md:hidden flex flex-col gap-4 text-center shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 text-base transition-colors ${
                  active
                    ? "text-white font-semibold"
                    : "text-white/70 font-normal hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <hr className="border-white/10 my-1" />
          <div className="flex justify-center items-center gap-6 pt-2">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-white font-medium text-sm">
                  {currentUser.name || "User"}
                </span>
                <button
                  type="button"
                  onClick={handleOpenSignOutModal}
                  className="bg-white/20 hover:bg-white/30 text-white text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition-colors ${
                    pathname === "/signin"
                      ? "text-white font-semibold"
                      : "text-white/70 font-normal hover:text-white"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#cbfc01] text-black font-semibold text-sm px-4 py-1.5 rounded-full"
                >
                  Join Us
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Enrolled Courses History Drawer (Triggered by bag icon on right of Sign Out) */}
      <EnrolledCoursesDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentUser={currentUser}
      />

      {/* Sign Out Confirmation Action Modal */}
      {mounted && showSignOutModal && createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div
            onClick={() => !isSigningOut && setShowSignOutModal(false)}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-[420px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-neutral-100 text-left">
            {/* Close Button */}
            <button
              type="button"
              disabled={isSigningOut}
              onClick={() => setShowSignOutModal(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 shadow-2xs">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>

            {/* Title & Description */}
            <h3 className="font-black text-[20px] sm:text-[22px] text-[#18181b] tracking-tight leading-tight">
              Sign Out of ByteSpace?
            </h3>
            <p className="text-[#646a78] text-[13px] sm:text-[13.5px] mt-2 leading-relaxed font-normal">
              Are you sure you want to sign out? You will need to sign in again to access your enrolled courses and personal dashboard.
            </p>

            {/* Current User Card */}
            {currentUser && (
              <div className="mt-4 p-3 bg-[#f8f9fb] border border-[#e8eaee] rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#cbfc01] text-black font-extrabold text-[13px] flex items-center justify-center uppercase shrink-0 shadow-2xs">
                  {currentUser.name ? currentUser.name[0] : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[13px] text-[#18181b] truncate">
                    {currentUser.name || "User"}
                  </h4>
                  <p className="text-[11.5px] text-[#717682] truncate">
                    {currentUser.email || ""}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isSigningOut}
                onClick={() => setShowSignOutModal(false)}
                className="px-5 py-2.5 rounded-full border border-[#d6d9e0] hover:bg-neutral-50 text-[#18181b] font-semibold text-[13px] transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSigningOut}
                onClick={handleConfirmSignOut}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 active:scale-95"
              >
                {isSigningOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing Out...</span>
                  </>
                ) : (
                  <span>Yes, Sign Out</span>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
