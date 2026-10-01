import ForbiddenSection from "@/components/ErrorPages/ForbiddenSection";

export const metadata = {
  title: "403 - Forbidden Access | ByteSpace",
  description: "You do not have permission to access this resource on ByteSpace.",
};

export default function ForbiddenPage() {
  return <ForbiddenSection />;
}
