export default function BlogArticleLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#2a3a38] to-slate-950">
      {/* Hero banner skeleton */}
      <div className="relative w-full min-h-[50vh] bg-slate-900 animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="h-4 w-24 bg-white/[0.06] rounded mb-6" />
            <div className="h-10 w-3/4 max-w-2xl bg-white/[0.08] rounded-xl mb-4" />
            <div className="h-6 w-1/2 max-w-xl bg-white/[0.05] rounded-lg mb-4" />
            <div className="flex gap-3">
              <div className="h-8 w-20 bg-white/[0.06] rounded-full" />
              <div className="h-8 w-24 bg-white/[0.06] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="w-full px-4 py-12">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0 max-w-[900px] mx-auto space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-white/[0.04] rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-white/[0.04] rounded animate-pulse" />
              </div>
            ))}
          </div>
          {/* TOC skeleton */}
          <div className="hidden lg:block w-[280px] shrink-0 space-y-3">
            <div className="h-5 w-32 bg-white/[0.06] rounded animate-pulse mb-4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
