"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";
import { fetchUserEnrollments, deleteEnrollment } from "@/lib/api";

export default function EnrolledCoursesPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Delete modal state
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  // Route protection: If not authenticated and not loading, redirect to /unauthorized
  useEffect(() => {
    if (!isPending && !currentUser) {
      router.push("/unauthorized?redirect=" + encodeURIComponent("/enrolled-courses"));
    }
  }, [currentUser, isPending, router]);

  useEffect(() => {
    if (!currentUser) return;

    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchUserEnrollments(currentUser.email, currentUser.id);
        if (isMounted) {
          setEnrollments(data || []);
        }
      } catch (err) {
        console.warn("Error fetching enrollments:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    const handleUpdate = () => {
      fetchUserEnrollments(currentUser.email, currentUser.id).then((data) => {
        if (isMounted) setEnrollments(data || []);
      });
    };
    window.addEventListener("bytespace:enrollment-updated", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("bytespace:enrollment-updated", handleUpdate);
    };
  }, [currentUser]);

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    setIsDeleting(true);
    try {
      const userEmail = currentUser?.email || courseToDelete.userEmail;
      const userId = currentUser?.id || courseToDelete.userId;
      await deleteEnrollment({
        enrollmentId: courseToDelete.id,
        courseId: courseToDelete.courseId,
        userEmail,
        userId,
      });

      setEnrollments((prev) =>
        prev.filter(
          (e) =>
            e.id !== courseToDelete.id &&
            String(e.courseId) !== String(courseToDelete.courseId)
        )
      );

      setDeleteSuccessMessage(
        `"${courseToDelete.courseTitle}" has been removed from your enrolled courses.`
      );
      setTimeout(() => setDeleteSuccessMessage(""), 5000);
      setCourseToDelete(null);
    } catch (err) {
      console.error("Failed to delete enrollment:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || (!currentUser && loading)) {
    return (
      <div className="min-h-screen bg-[#003be2] hero-grid-bg flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredEnrollments = enrollments.filter((enr) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (enr.courseTitle || "").toLowerCase().includes(q) ||
      (enr.courseAuthor || "").toLowerCase().includes(q) ||
      (enr.category || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-x-hidden text-[#18181b]">
      {/* 1. Header Hero with Electric Grid Background */}
      <header className="relative w-full bg-[#003be2] hero-grid-bg text-white pb-16 sm:pb-20 flex flex-col">
        <Navbar />

        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-12">
          {/* Breadcrumb / Top Tag */}
          <div className="flex items-center gap-2 text-white/70 text-[12px] mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#cbfc01] font-medium">Enrolled Courses</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-white font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] tracking-tight leading-tight">
                  Enrolled Course History
                </h1>
                <span className="bg-[#cbfc01] text-black font-bold text-[12px] px-3.5 py-0.5 rounded-full shadow-2xs">
                  {enrollments.length} Courses
                </span>
              </div>
              <p className="text-white/85 text-[14px] sm:text-[15px] mt-2 font-normal max-w-[680px]">
                Track your active learning journey, resume your video lessons, and manage your enrolled course catalog.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shrink-0">
              <div className="w-8 h-8 rounded-xl bg-[#cbfc01] text-black flex items-center justify-center font-bold text-[13px]">
                {currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-[13px] leading-tight">
                  {currentUser?.name || "Student"}
                </span>
                <span className="text-white/70 text-[11px]">
                  {currentUser?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content Section */}
      <main className="w-full bg-[#fbfbfe] text-[#18181b] flex-1 pb-24 pt-10">
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Notification Alert for successful deletion */}
          {deleteSuccessMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-800 text-[13px] font-medium animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{deleteSuccessMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setDeleteSuccessMessage("")}
                className="text-emerald-700 hover:text-emerald-950 font-bold text-sm cursor-pointer p-1"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          )}

          {/* Top Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#eaecf0] shadow-2xs">
            <div className="relative w-full sm:w-80">
              <svg
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search enrolled courses..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-[13px] text-[#18181b] rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#003be2] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link
                href="/courses"
                className="bg-[#003be2] hover:bg-[#0032c2] text-white font-medium text-[12.5px] px-5 py-2 rounded-full shadow-xs transition-colors inline-flex items-center gap-1.5"
              >
                <span>Browse More Courses</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Courses Grid */}
          {enrollments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#eaecf0] p-12 sm:p-16 text-center flex flex-col items-center justify-center shadow-xs">
              <div className="w-20 h-20 rounded-3xl bg-[#003be2]/10 text-[#003be2] flex items-center justify-center mb-5">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h2 className="font-extrabold text-[22px] text-[#18181b] tracking-tight">
                No Enrolled Courses Yet
              </h2>
              <p className="text-[#646a78] text-[14px] mt-2 mb-7 max-w-[360px] leading-relaxed">
                You haven&apos;t enrolled in any courses yet. Browse our curated courses and enroll with one click!
              </p>
              <Link
                href="/courses"
                className="bg-[#cbfc01] hover:bg-[#bcf000] text-black font-bold text-[13.5px] px-8 py-3 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Explore All Courses
              </Link>
            </div>
          ) : filteredEnrollments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#eaecf0] p-12 text-center">
              <p className="text-[#646a78] text-[14px]">No courses match &quot;{searchQuery}&quot;.</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-[#003be2] hover:underline font-semibold text-[13px]"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredEnrollments.map((enr, idx) => (
                <div
                  key={enr.id || idx}
                  className="group bg-white rounded-3xl border border-[#eaecf0] hover:border-[#003be2]/30 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between relative"
                >
                  {/* Thumbnail & Badges */}
                  <div>
                    <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
                      <Image
                        src={enr.courseImage || "/course-1.png"}
                        alt={enr.courseTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Category Tag */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="bg-[#cbfc01] text-black font-bold text-[10.5px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                          {enr.category || "Design"}
                        </span>
                      </div>

                      {/* Top-Right Delete Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCourseToDelete(enr);
                        }}
                        title="Remove from enrolled courses"
                        aria-label={`Remove ${enr.courseTitle} from enrolled courses`}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95 z-10 backdrop-blur-xs group/del"
                      >
                        <svg
                          className="w-3.5 h-3.5 group-hover/del:stroke-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>

                      {/* Status Tag */}
                      <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-[11px] font-medium bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{enr.status || "In Progress"}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col">
                      <span className="text-[12px] text-[#717682]">
                        by {enr.courseAuthor || "ByteSpace Creator"}
                      </span>
                      <h3 className="font-extrabold text-[17px] text-[#18181b] tracking-tight leading-snug mt-1 group-hover:text-[#003be2] transition-colors line-clamp-2">
                        {enr.courseTitle}
                      </h3>

                      {enr.enrolledAt && (
                        <span className="text-[11px] text-[#8c919c] mt-2 font-normal">
                          Enrolled on {new Date(enr.enrolledAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA with Delete Option */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-[#f0f1f4] flex items-center justify-between">
                    {/* Delete Option Link */}
                    <button
                      type="button"
                      onClick={() => setCourseToDelete(enr)}
                      className="text-[#717682] hover:text-red-600 font-medium text-[12px] transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-2.5 -ml-1 rounded-xl hover:bg-red-50 group/delbtn"
                      title="Remove course from enrolled history"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-neutral-400 group-hover/delbtn:text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      <span>Delete</span>
                    </button>

                    <Link
                      href={
                        enr.courseSlug
                          ? `/courses/${enr.courseSlug}`
                          : `/courses/${enr.courseId}`
                      }
                      className="bg-[#003be2] hover:bg-[#0032c2] text-white font-semibold text-[12px] px-5 py-2 rounded-full shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {courseToDelete && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div
            onClick={() => !isDeleting && setCourseToDelete(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            aria-hidden="true"
          />
          <div className="relative w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-neutral-100">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            <h3 className="font-extrabold text-[19px] text-[#18181b] tracking-tight">
              Remove Enrolled Course?
            </h3>
            <p className="text-[#646a78] text-[13px] mt-2 leading-relaxed">
              Are you sure you want to remove <strong className="text-[#18181b] font-semibold">{courseToDelete.courseTitle}</strong> from your enrolled learning history? You can enroll again anytime from the course catalog.
            </p>

            <div className="mt-7 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setCourseToDelete(null)}
                className="px-5 py-2.5 rounded-full border border-[#d6d9e0] hover:bg-neutral-50 text-[#18181b] font-medium text-[13px] transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Removing...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
