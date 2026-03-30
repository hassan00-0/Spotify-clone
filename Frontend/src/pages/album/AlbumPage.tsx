import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  return (
    <ScrollArea className="h-full">
      {/* top half */}
      <div className="relative min-h-full">
        <div className="bg-linear-to-b from-[#5038a0]/80 via-zinc-900/80 p-6 rounded-md">
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              {/* album image  */}

              <img
                src={currentAlbum?.imageUrl}
                alt="album image"
                className="
                    size-60 shadow-xl rounded"
              />

              {/* album info container */}
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                {/* name */}
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                {/* artists */}
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* lower half */}
        <div className=""></div>
      </div>
    </ScrollArea>
  );
};

export default AlbumPage;

// 10:48
