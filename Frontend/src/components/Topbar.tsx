import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthButtons from "./ui/SignInAuthButtons.tsx";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";

const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="flex gap-4 items-center justify-between sticky top-0 p-4 bg-zinc-900/75 backdrop-blur-md rounded-lg overflow-hidden">
      <div className="flex">Spotify</div>
      <div className="flex">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
