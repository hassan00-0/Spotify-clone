import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

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

            {/* playbutton */}
            <div className="flex items-center">
              <Button className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all">
                <Play className="size-7 text-black" />
              </Button>
            </div>
          </div>
        </div>
        {/* lower half */}
        <div className="bg-black/20 backdrop-blur-sm">
          {/* table header */}
          <div
            className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2
          text-sm text-zinc-400 border-b border-white/5"
          >
            <div>#</div>
            <div>Title</div>
            <div>Released Date</div>
            <div>
              <Clock className="size-4" />
            </div>
          </div>

          {/* songs list */}
          <div className="space-y-2">
            {currentAlbum?.songs.map((song, index) => (
              <div
                key={song._id}
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 group cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <div className="group-hover:hidden">{index + 1}</div>
                  <Play className="hidden group-hover:block size-4" />
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="size-10"
                  />

                  <div>
                    <div className="font-medium ">{song.title}</div>
                    <div>{song.artist}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {song.createdAt.split("T")[0]}
                </div>
                <div className="flex items-center">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AlbumPage;

// 10:48
