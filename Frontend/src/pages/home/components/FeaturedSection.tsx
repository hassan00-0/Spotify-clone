import FeaturedSkeleton from "@/components/Skeletons/FeaturedSkeleton";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { AlertCircle } from "lucide-react";

const FeaturedSection = () => {
  const { error, featuredSongs, isLoading, fetchFeaturedSongs } =
    useMusicStore();
  if (isLoading) return <FeaturedSkeleton />;
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <AlertCircle className="size-10 text-red-500 mb-4" />
        <p className="text-zinc-400 text-lg mb-4">
          Could not load featured songs.
        </p>
        <button
          onClick={fetchFeaturedSongs}
          className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
          hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="size-16 sm:size-20 object-cover shrink-0"
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>
        // todo add a play button
      ))}
    </div>
  );
};

export default FeaturedSection;
