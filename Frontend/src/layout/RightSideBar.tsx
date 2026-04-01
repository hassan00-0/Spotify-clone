import { useChatStore } from "@/stores/useChatStore.ts";
import { Headphones } from "lucide-react";
import { useEffect } from "react";

const RightSideBar = () => {
  const { fetchUsers, users } = useChatStore();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LoginPrompt />
    // <div className="h-full min-w-0 overflow-hidden flex flex-col gap-2">
    //   {users?.map((user) => (
    //     <div key={user._id} className="flex items-center justify-center">
    //       <img src={user.imageUrl} alt={user.fullName} />
    //       <p className="font-bold">{user.fullName}</p>
    //     </div>
    //   ))}
    // </div>
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
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);

// 15:41
