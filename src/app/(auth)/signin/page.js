import SignInSection from "@/components/Auth/SignInSection";

export const metadata = {
  title: "Sign In - ByteSpace",
  description: "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#003be2]">
      <SignInSection />
    </main>
  );
}
