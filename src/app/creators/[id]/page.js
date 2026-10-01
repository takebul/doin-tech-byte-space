import CreatorProfilePage from "@/components/Creators/CreatorProfilePage";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `${id ? id.replace(/-/g, " ").toUpperCase() : "Creator"} - ByteSpace`,
    description: "Explore creator courses and assets on ByteSpace.",
  };
}

export default function CreatorDetailPage() {
  return <CreatorProfilePage />;
}
