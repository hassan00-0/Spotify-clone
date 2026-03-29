import PlayListSkeleton from "@/components/Skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { Home, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="h-full min-w-0 overflow-hidden flex flex-col gap-2">
      {/* top navigation box */}
      <div className="flex flex-col bg-zinc-900 rounded-lg p-4 gap-6">
        <Link
          to={"/"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className:
                "w-full flex justify-start items-center gap-4 hover:bg-zinc-800",
            }),
          )}
        >
          <Home className="shrink-0 size-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <SignedIn>
          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "w-full flex justify-start items-center gap-4 hover:bg-zinc-800",
              }),
            )}
          >
            <MessageCircle className="shrink-0 size-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </SignedIn>
      </div>
      {/* playlists */}
      <div className="flex-1 flex flex-col bg-zinc-900 rounded-lg p-4 min-h-0">
        {/* library header text */}
        <div className="flex items-center px-2">
          <Library className="size-5 mr-2" />
          <span className="hidden md:inline">Playlists</span>
        </div>
        {/* the actual scrollarea */}
        <ScrollArea className="flex-1 min-h-0">
          <PlayListSkeleton />
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
