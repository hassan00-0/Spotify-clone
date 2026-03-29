const PlayListSkeleton = () => {
  return Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="p-2 flex items-center rounded-md gap-3">
      {/* square */}
      <div className="size-12 bg-zinc-800 rounded-md animate-pulse shrink-0" />
      {/* both */}
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2" />
      </div>
    </div>
  ));
};

export default PlayListSkeleton;
