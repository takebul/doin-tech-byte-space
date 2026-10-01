"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ByteSpaceLogo from "../Hero/ByteSpaceLogo";
import { authClient } from "@/lib/auth-client";

export default function SignInSection() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: trimmedEmail,
        password: password,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message || "Invalid email or password. Please try again."
        );
        setLoading(false);
        return;
      }


      setSuccess("Signed in successfully! Redirecting...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 800);
    } catch (err) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
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
            <div className="bg-white text-[#18181b] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 lg:p-10 shadow-2xl shadow-blue-950/25 w-full max-w-[410px] flex flex-col items-start select-text">
              <span className="text-[#0047ff] font-medium text-[13.5px] tracking-tight">
                Sign In
              </span>

              <h1 className="text-[34px] sm:text-[38px] font-extrabold text-[#18181b] tracking-[-0.03em] leading-tight mt-1.5 mb-6">
                Welcome Back
              </h1>

              {/* Feedback Notifications */}
              {error && (
                <div className="w-full mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-[12px] px-3.5 py-2.5 rounded-[10px] flex items-start gap-2 animate-in fade-in duration-150">
                  <svg
                    className="w-4 h-4 shrink-0 text-rose-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="flex-1">{error}</span>
                  <button
                    type="button"
                    onClick={() => setError("")}
                    className="text-rose-400 hover:text-rose-700 transition-colors text-sm font-semibold leading-none cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              )}

              {success && (
                <div className="w-full mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] px-3.5 py-2.5 rounded-[10px] flex items-center gap-2 animate-in fade-in duration-150">
                  <svg
                    className="w-4 h-4 shrink-0 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="flex-1 font-medium">{success}</span>
                </div>
              )}

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
                    autoComplete="email"
                    disabled={loading || Boolean(success)}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="designer@example.com"
                    className="w-full h-[38px] px-3.5 rounded-[10px] border border-[#e1e3e8] bg-white text-[13px] text-[#18181b] placeholder-[#a6abb3] focus:outline-none focus:ring-2 focus:ring-[#003be2]/20 focus:border-[#003be2] transition-all disabled:opacity-60"
                  />
                </div>

                {/* Password with Eye Visibility Toggle */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-[12.5px] font-medium text-[#25282f]"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      disabled={loading || Boolean(success)}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="••••••••"
                      className="w-full h-[38px] pl-3.5 pr-10 rounded-[10px] border border-[#e1e3e8] bg-white text-[13px] text-[#18181b] placeholder-[#a6abb3] focus:outline-none focus:ring-2 focus:ring-[#003be2]/20 focus:border-[#003be2] transition-all disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8a8f98] hover:text-[#18181b] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sign In Button (Right-aligned, bright neon lime pill) */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={loading || Boolean(success)}
                    className="bg-[#cbfc01] hover:bg-[#bcf000] text-[#18181b] font-medium text-[13px] px-7 py-2 rounded-full shadow-sm hover:shadow transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-3.5 w-3.5 text-[#18181b]"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    {loading
                      ? "Signing in..."
                      : success
                      ? "Redirecting..."
                      : "Sign In"}
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
                  onClick={async () => {
                    await authClient.signIn.social({
                      provider: "google",
                    });
                  }}
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
