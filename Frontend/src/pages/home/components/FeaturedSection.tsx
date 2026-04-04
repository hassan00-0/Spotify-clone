import FeaturedSkeleton from "@/components/Skeletons/FeaturedSkeleton";
import { useMusicStore } from "@/stores/useMusicStore.ts";

const FeaturedSection = () => {
  const { error, featuredSongs, isLoading } = useMusicStore();
  if (isLoading) return <FeaturedSkeleton />;
  return <div>FeaturedSection</div>;
};

export default FeaturedSection;
