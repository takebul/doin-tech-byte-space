"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchUserEnrollments, deleteEnrollment } from "@/lib/api";

export default function EnrolledCoursesDrawer({ isOpen, onClose, currentUser: propUser }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const currentUser = propUser || session?.user;

  const [mounted, setMounted] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Delete Action Modal State
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const userEmail = currentUser?.email;
        const userId = currentUser?.id;
        const data = await fetchUserEnrollments(userEmail, userId);
        if (isMounted) {
          setEnrollments(data || []);
        }
      } catch (err) {
        console.warn("Failed to load user enrollments:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [isOpen, currentUser]);

  // Listen to live enrollment events
  useEffect(() => {
    const handleUpdate = () => {
      const userEmail = currentUser?.email;
      const userId = currentUser?.id;
      fetchUserEnrollments(userEmail, userId).then((data) => {
        setEnrollments(data || []);
      });
    };

    window.addEventListener("bytespace:enrollment-updated", handleUpdate);
    return () => window.removeEventListener("bytespace:enrollment-updated", handleUpdate);
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
          (item) =>
            item.id !== courseToDelete.id &&
            String(item.courseId) !== String(courseToDelete.courseId)
        )
      );

      setDeleteSuccessMessage(
        `"${courseToDelete.courseTitle}" removed from enrolled courses.`
      );
      setTimeout(() => setDeleteSuccessMessage(""), 4000);
      setCourseToDelete(null);
    } catch (err) {
      console.error("Failed to delete enrollment from drawer:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (courseToDelete) {
          setCourseToDelete(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, courseToDelete, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex justify-end pointer-events-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in z-[99998]"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[420px] bg-white text-[#18181b] h-full shadow-2xl flex flex-col z-[99999] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#003be2] text-white flex items-center justify-between border-b border-white/10 select-none">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#cbfc01] text-black flex items-center justify-center font-bold shadow-xs">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3h12l2 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l2-5Z" />
                <path d="M4 8h16" />
                <path d="M9 11a3 3 0 0 0 6 0" />
              </svg>
            </div>
            <div>
              <h2 className="font-extrabold text-[17px] tracking-tight leading-tight">
                Enrolled Courses
              </h2>
              <p className="text-white/80 text-[11.5px]">
                {currentUser
                  ? `Active Learning for ${currentUser.name?.split(" ")[0] || "User"}`
                  : "Course History & Purchases"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Notification Banner */}
          {deleteSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] px-3.5 py-2.5 rounded-xl flex items-center gap-2 animate-in fade-in">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="flex-1 font-medium">{deleteSuccessMessage}</span>
            </div>
          )}

          {!currentUser ? (
            /* Logged Out State */
            <div className="h-full flex flex-col items-center justify-center text-center py-10 px-4">
              <div className="w-16 h-16 rounded-2xl bg-[#003be2]/10 text-[#003be2] flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-bold text-[18px] text-[#18181b] tracking-tight">
                Sign In to View History
              </h3>
              <p className="text-[#646a78] text-[13px] mt-2 mb-6 max-w-[280px] leading-relaxed">
                You need an active ByteSpace account to access your enrolled courses and resume your lessons.
              </p>
              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    router.push("/signin");
                  }}
                  className="w-full bg-[#003be2] hover:bg-[#0032c2] text-white font-semibold text-[13.5px] py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    router.push("/register");
                  }}
                  className="w-full border border-[#d6d9e0] hover:bg-neutral-50 text-[#18181b] font-medium text-[13.5px] py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Create an Account
                </button>
              </div>
            </div>
          ) : loading ? (
            /* Loading Spinner */
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-8 h-8 border-3 border-[#003be2] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-[13px] text-[#646a78]">Loading your enrolled courses...</p>
            </div>
          ) : enrollments.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[17px] text-[#18181b] tracking-tight">
                No Enrolled Courses Yet
              </h3>
              <p className="text-[#646a78] text-[13px] mt-1.5 mb-6 max-w-[260px] leading-relaxed">
                Explore our catalog of industry-leading courses and enroll to start learning today.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/courses");
                }}
                className="bg-[#cbfc01] hover:bg-[#bcf000] text-black font-bold text-[13px] px-6 py-2.5 rounded-full shadow-xs transition-all cursor-pointer"
              >
                Explore Courses
              </button>
            </div>
          ) : (
            /* Enrolled Courses List */
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#f0f1f4]">
                <span className="text-[12px] font-semibold text-[#717682] uppercase tracking-wider">
                  Total Courses ({enrollments.length})
                </span>
                <span className="text-[11.5px] text-[#003be2] font-medium bg-[#003be2]/10 px-2.5 py-0.5 rounded-full">
                  Lifetime Access
                </span>
              </div>

              {enrollments.map((enr, idx) => (
                <div
                  key={enr.id || idx}
                  className="group bg-white border border-[#e8eaee] hover:border-[#003be2]/40 rounded-2xl p-3.5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col gap-3"
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-neutral-100 border border-neutral-200">
                      <Image
                        src={enr.courseImage || "/course-1.png"}
                        alt={enr.courseTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#003be2] bg-[#003be2]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {enr.category || "Design"}
                      </span>
                      <h4 className="font-bold text-[13.5px] text-[#18181b] mt-1 line-clamp-1 group-hover:text-[#003be2] transition-colors">
                        {enr.courseTitle}
                      </h4>
                      <p className="text-[11.5px] text-[#717682] mt-0.5 truncate">
                        by {enr.courseAuthor || "ByteSpace Creator"}
                      </p>
                    </div>
                  </div>

                  {/* Progress & Action */}
                  <div className="pt-2 border-t border-[#f0f1f4] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] text-[#555a64] font-medium">
                        {enr.status || "In Progress"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Delete Action Trigger Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCourseToDelete(enr);
                        }}
                        title="Remove from enrolled history"
                        aria-label={`Remove ${enr.courseTitle}`}
                        className="px-2.5 py-1 rounded-full text-neutral-500 hover:text-red-600 hover:bg-red-50 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                      >
                        <svg
                          className="w-3.5 h-3.5"
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
                        onClick={onClose}
                        className="bg-[#003be2] hover:bg-[#0032c2] text-white font-medium text-[11.5px] px-3.5 py-1 rounded-full transition-colors inline-flex items-center gap-1"
                      >
                        <span>Continue</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {currentUser && enrollments.length > 0 && (
          <div className="p-4 bg-[#f8f9fb] border-t border-[#e8eaee] flex items-center justify-between">
            <Link
              href="/enrolled-courses"
              onClick={onClose}
              className="text-[#003be2] hover:underline font-semibold text-[12.5px] flex items-center gap-1"
            >
              <span>View Full History Page</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="text-[12px] text-[#717682] hover:text-[#18181b] font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Delete Action Confirmation Modal inside Portal */}
      {courseToDelete && (
        <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4">
          <div
            onClick={() => !isDeleting && setCourseToDelete(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            aria-hidden="true"
          />
          <div className="relative w-full max-w-[370px] bg-white rounded-3xl p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 border border-neutral-100 text-left">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-3.5">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            <h3 className="font-extrabold text-[17px] text-[#18181b] tracking-tight">
              Remove Enrolled Course?
            </h3>
            <p className="text-[#646a78] text-[12.5px] mt-1.5 leading-relaxed">
              Are you sure you want to remove <strong className="text-[#18181b] font-semibold">{courseToDelete.courseTitle}</strong> from your enrolled learning history? You can enroll again anytime from the course catalog.
            </p>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setCourseToDelete(null)}
                className="px-4 py-2 rounded-full border border-[#d6d9e0] hover:bg-neutral-50 text-[#18181b] font-medium text-[12.5px] transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-[12.5px] shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
    </div>,
    document.body
  );
}
