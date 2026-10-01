"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  useEffect(() => {
    if (isPending) return;

    if (!currentUser) {
      // 401: Unauthenticated
      router.push("/unauthorized?redirect=" + encodeURIComponent("/admin"));
      return;
    }

    if (currentUser.role !== "admin") {
      // 403: Authenticated but unauthorized role
      router.push("/forbidden");
    }
  }, [currentUser, isPending, router]);

  if (isPending || !currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#003be2] hero-grid-bg flex items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-[#003be2] hero-grid-bg text-white pb-10">
        <Navbar />
        <div className="max-w-[1240px] mx-auto px-6 pt-8">
          <h1 className="text-3xl font-bold">Admin Management Console</h1>
        </div>
      </header>
      <main className="flex-1 max-w-[1240px] mx-auto px-6 py-12">
        <p>Welcome, Administrator {currentUser.name}.</p>
      </main>
      <Footer />
    </div>
  );
}
