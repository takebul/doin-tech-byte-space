"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ByteSpaceLogo from "../Hero/ByteSpaceLogo";

export default function RegisterSection({ isStandalone = false }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(`Welcome to ByteSpace, ${fullName || "explorer"}! Your account is ready.`);
      setSubmitted(false);
    }, 400);
  };

  return (
    <section
      id="register"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[728px] bg-[#003be2] hero-grid-bg text-white flex flex-col justify-between overflow-x-hidden select-none"
    >
      {/* Top Bar with standalone logo */}
      <div className="w-full max-w-[1024px] mx-auto px-6 sm:px-12 lg:px-[85px] pt-6 sm:pt-7 pb-2 flex items-center justify-between">
        <Link
          href="/"
          aria-label="ByteSpace Home"
          className="inline-block transition-transform hover:scale-105"
        >
          <ByteSpaceLogo iconOnly={true} whiteCutout={false} />
        </Link>
      </div>

      {/* Main Dual-Column Canvas */}
      <div className="w-full max-w-[1024px] mx-auto px-6 sm:px-12 lg:px-[85px] py-4 sm:py-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Narrative + 3D Cards Stack */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
            <h2 className="text-white font-medium text-[16px] sm:text-[17px] tracking-tight mb-2">
              Sign up and come in
            </h2>
            <p className="text-white/80 text-[12.5px] sm:text-[13px] leading-[1.65] max-w-[340px] mb-5 sm:mb-6 font-normal">
              The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost
            </p>

            {/* 3D Composition Artwork */}
            <div className="relative w-full max-w-[360px] sm:max-w-[370px] select-none pointer-events-none drop-shadow-lg">
              <Image
                src="/register-visual-composition.png"
                alt="ByteSpace course cards with 3D shapes and student reviews"
                width={370}
                height={425}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column: Floating White Card Container */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="bg-white text-[#18181b] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 lg:p-10 shadow-2xl shadow-blue-950/25 w-full max-w-[410px] flex flex-col items-start">
              <span className="text-[#0047ff] font-medium text-[13.5px] tracking-tight">
                Create an Account
              </span>

              <h1 className="text-[34px] sm:text-[38px] font-extrabold text-[#18181b] tracking-[-0.03em] leading-[1.12] mt-1.5 mb-7">
                Welcome to<br />ByteSpace
              </h1>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullname"
                    className="text-[12.5px] font-medium text-[#25282f]"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jamie Davis"
                    className="w-full h-[38px] px-3.5 rounded-[10px] border border-[#e1e3e8] bg-white text-[13px] text-[#18181b] placeholder-[#a6abb3] focus:outline-none focus:ring-2 focus:ring-[#003be2]/20 focus:border-[#003be2] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[12.5px] font-medium text-[#25282f]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="designer@example.com"
                    className="w-full h-[38px] px-3.5 rounded-[10px] border border-[#e1e3e8] bg-white text-[13px] text-[#18181b] placeholder-[#a6abb3] focus:outline-none focus:ring-2 focus:ring-[#003be2]/20 focus:border-[#003be2] transition-all"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-[12.5px] font-medium text-[#25282f]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="w-full h-[38px] px-3.5 rounded-[10px] border border-[#e1e3e8] bg-white text-[13px] text-[#18181b] placeholder-[#a6abb3] tracking-widest focus:outline-none focus:ring-2 focus:ring-[#003be2]/20 focus:border-[#003be2] transition-all"
                  />
                </div>

                {/* Continue Button (Right-aligned, bright neon lime pill) */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="bg-[#cbfc01] hover:bg-[#bcf000] text-[#18181b] font-medium text-[13px] px-7 py-2 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-75"
                  >
                    {submitted ? "Creating..." : "Continue"}
                  </button>
                </div>
              </form>

              {/* Login Link Note */}
              <div className="w-full text-center mt-12 pt-1">
                <p className="text-[12.5px] text-[#595d66]">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Existing users can sign in with their credentials.");
                    }}
                    className="text-[#0047ff] font-medium hover:underline transition-colors cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle bottom spacing */}
      <div className="h-6 shrink-0" />
    </section>
  );
}
