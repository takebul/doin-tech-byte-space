import RegisterSection from "@/components/Auth/RegisterSection";

export const metadata = {
  title: "Create an Account - ByteSpace",
  description: "Sign up and come in. The registration process is straightforward, uncomplicated, and efficient.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#003be2]">
      <RegisterSection isStandalone={true} />
    </main>
  );
}
