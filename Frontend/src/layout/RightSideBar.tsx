import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore.ts";
import { useUser } from "@clerk/clerk-react";
import { Headphones, Music, Users } from "lucide-react";
import { useEffect } from "react";

const RightSideBar = () => {
  const { fetchUsers, users } = useChatStore();
  const { user } = useUser();

  const isPlaying = true;

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col overflow-hidden">
      {/* users logo header */}
      <div className="flex justify-between items-center gap-2 p-4 border-b border-zinc-800">
        <Users className="size-5 shrink-0" />
        <h2 className="font-semibold truncate">What they're listening to</h2>
      </div>

      {/* placeholder if user not logged in */}
      {!user && <LoginPrompt />}
      {/* the actual scrollarea */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors
              group"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  {/* profile image */}
                  <Avatar className="size-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>

                  {/* online status dot */}
                  <div
                    className="absolute bottom-0 right-0 size-3 rounded-full border-2
                  border-zinc-900 bg-zinc-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {/* username and song playing emoji */}
                    <span className="font-medium text-sm">{user.fullName}</span>
                    {isPlaying && (
                      <Music className="size-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>

                  {isPlaying ? (
                    <div className="mt-1">
                      <div className="mt-1 text-sm font-medium truncate">
                        Man Of The World
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        by Yasuharu Takanashi
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-zinc-400">Idle</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSideBar;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    {/* glow bg container */}
    <div className="relative">
      <div
        className="absolute inset-0 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75
    animate-pulse"
      />

      <div className="relative bg-zinc-900 rounded-full p-4 border border-zinc-800">
        <Headphones className="size-8 text-emerald-400" />
      </div>
    </div>
    <div className="space-y-2 max-w-62.5">
      <p className="text-lg font-semibold">See What Friends Are Playing</p>
      <p className="text-sm text-zinc-400 truncate">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
