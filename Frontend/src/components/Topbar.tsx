import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthButtons from "./ui/SignInAuthButtons.tsx";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { buttonVariants } from "./ui/button.tsx";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="flex gap-4 items-center justify-between sticky top-0 p-4 bg-zinc-900/75 backdrop-blur-md rounded-lg overflow-hidden">
      <div className="flex items-center gap-2">
        <img src="/logo/spotify_logo.png" alt="logo" className="size-8" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
