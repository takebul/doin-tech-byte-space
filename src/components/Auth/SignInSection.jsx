"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ByteSpaceLogo from "../Hero/ByteSpaceLogo";

export default function SignInSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(`Welcome back to ByteSpace! Signing you in...`);
      setSubmitted(false);
    }, 400);
  };

  return (
    <section
      id="signin"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[728px] bg-[#003be2] hero-grid-bg text-white flex flex-col justify-between overflow-x-hidden select-none"
    >
      {/* Top Bar with standalone ByteSpace logo */}
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
              Sign in with ease
            </h2>
            <p className="text-white/80 text-[12.5px] sm:text-[13px] leading-[1.65] max-w-[340px] mb-5 sm:mb-6 font-normal">
              Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.
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
                Sign In
              </span>

              <h1 className="text-[34px] sm:text-[38px] font-extrabold text-[#18181b] tracking-[-0.03em] leading-tight mt-1.5 mb-7">
                Welcome Back
              </h1>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
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

                {/* Sign In Button (Right-aligned, bright neon lime pill) */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="bg-[#cbfc01] hover:bg-[#bcf000] text-[#18181b] font-medium text-[13px] px-7 py-2 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-75"
                  >
                    {submitted ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>

              {/* 'or' Divider */}
              <div className="relative flex py-5 sm:py-6 items-center w-full my-1">
                <div className="flex-grow border-t border-[#e2e4e9]"></div>
                <span className="flex-shrink mx-4 text-[#8a8f98] text-[12px]">or</span>
                <div className="flex-grow border-t border-[#e2e4e9]"></div>
              </div>

              {/* Social Login Buttons (Facebook & Google) */}
              <div className="w-full flex items-center justify-center gap-3.5">
                {/* Facebook Button */}
                <button
                  type="button"
                  aria-label="Sign in with Facebook"
                  onClick={() => alert("Facebook login would trigger here.")}
                  className="w-[46px] h-[46px] rounded-[16px] border border-[#e2e4e9] bg-white flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="black" />
                    <path
                      fill="white"
                      d="M15.2 12.2h-2.1v6.8h-2.9v-6.8H8.8v-2.5h1.4V8.1c0-1.3.8-3.1 3.1-3.1l2.3.01v2.5h-1.6c-.3 0-.6.2-.6.7v1.5h2.4l-.2 2.5z"
                    />
                  </svg>
                </button>

                {/* Google Button */}
                <button
                  type="button"
                  aria-label="Sign in with Google"
                  onClick={() => alert("Google login would trigger here.")}
                  className="w-[46px] h-[46px] rounded-[16px] border border-[#e2e4e9] bg-white flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-black font-extrabold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.24 10.285V14.4h6.887C18.2 17.65 15.64 20 12.24 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c2.08 0 3.93.79 5.34 2.085l3.05-3.05C18.73 1.25 15.68 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.76 0 12.24-5.48 12.24-12.24 0-.82-.08-1.46-.24-1.955H12.24z" />
                  </svg>
                </button>
              </div>

              {/* Registration Link Note */}
              <div className="w-full text-center mt-8 pt-1">
                <p className="text-[12.5px] text-[#595d66]">
                  New user?{" "}
                  <Link
                    href="/register"
                    className="text-[#0047ff] font-medium hover:underline transition-colors cursor-pointer"
                  >
                    Create an account
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
