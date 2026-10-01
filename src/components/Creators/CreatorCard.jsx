"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function CreatorCard({ creator, index = 0 }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(creator.followerCount || 12);

  const handleFollowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFollowing) {
      setIsFollowing(false);
      setFollowers((prev) => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowers((prev) => prev + 1);
    }
  };

  const formatFollowers = (count) => {
    if (!count) return "0";
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return String(count);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05, ease: "easeOut" }}
      className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#eaecf0] hover:border-[#003be2]/30 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Header: Avatar + Creator Identity */}
      <div>
        <div className="flex items-start gap-4">
          {/* Creator Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden relative shrink-0 shadow-sm border border-neutral-100 bg-[#fde8e8]">
            <Image
              src={creator.avatar || "/user-creator-avatar.jpg"}
              alt={creator.name || "Creator Avatar"}
              fill
              sizes="(max-width: 640px) 56px, 64px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Name & Badge */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[#1a1b1e] font-bold text-[16px] sm:text-[17px] tracking-tight truncate group-hover:text-[#003be2] transition-colors">
                {creator.name}
              </h3>
              <span className="bg-[#cbfc01] text-black font-bold text-[10px] px-2.5 py-0.5 rounded-full select-none shrink-0 shadow-2xs">
                {creator.badge || "Creator"}
              </span>
            </div>
            <p className="text-neutral-500 text-[12px] sm:text-[12.5px] mt-0.5 line-clamp-1 font-normal">
              {creator.category || "Creative Studio"}
            </p>
          </div>
        </div>

        {/* Subtitle / Bio Preview */}
        <p className="text-[#525660] text-[13px] leading-relaxed mt-4 line-clamp-2 font-normal">
          {creator.subtitle || (Array.isArray(creator.bio) ? creator.bio[0] : creator.bio)}
        </p>

        {/* Skills Pills */}
        {Array.isArray(creator.skills) && creator.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {creator.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="bg-[#f5f6f8] text-[#4b4e57] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#eaecf0]"
              >
                {skill}
              </span>
            ))}
            {creator.skills.length > 3 && (
              <span className="bg-transparent text-neutral-400 text-[11px] px-1 py-1 font-medium">
                +{creator.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats Divider & Row */}
      <div className="mt-6 pt-5 border-t border-[#f0f1f4]">
        <div className="flex items-center justify-between text-[12px] text-neutral-600 mb-5">
          {/* Rating */}
          <div className="flex items-center gap-1 font-semibold text-neutral-800">
            <svg
              className="w-3.5 h-3.5 text-[#ffb800] fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{creator.rating ? creator.rating.toFixed(1) : "4.8"}</span>
          </div>

          {/* Products Count */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-neutral-800">
              {creator.productsCount || creator.coursesCount || 3}
            </span>
            <span>Products</span>
          </div>

          {/* Followers */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-neutral-800">
              {formatFollowers(followers)}
            </span>
            <span>Followers</span>
          </div>
        </div>

        {/* Action Buttons: View Profile + Follow */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/creator-profile"
            className="flex-1 text-center py-2 px-3 rounded-full text-[12.5px] font-semibold text-[#18181b] bg-[#f5f6f8] hover:bg-[#ececee] transition-colors cursor-pointer"
          >
            View Profile
          </Link>

          <button
            type="button"
            onClick={handleFollowClick}
            className={`px-4 py-2 rounded-full text-[12.5px] font-bold transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs ${
              isFollowing
                ? "bg-neutral-800 text-white hover:bg-neutral-900"
                : "bg-[#cbfc01] text-black hover:bg-[#bcf000]"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
