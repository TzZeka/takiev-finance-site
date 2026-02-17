export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Banner skeleton */}
      <div className="relative w-full aspect-[2/1] bg-white/[0.03] animate-pulse" />

      {/* Title skeleton */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="h-8 w-32 bg-white/[0.06] rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-12 sm:h-14 w-[70%] bg-white/[0.06] rounded-2xl mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-[85%] bg-white/[0.04] rounded-lg mx-auto animate-pulse" />
          <div className="h-5 w-[60%] bg-white/[0.04] rounded-lg mx-auto mt-2 animate-pulse" />
        </div>
      </div>

      {/* Values skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="h-10 w-48 bg-white/[0.06] rounded-xl mx-auto mb-12 animate-pulse" />
        <div className="max-w-6xl mx-auto rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
            <div className="h-[250px] lg:h-auto bg-white/[0.04] animate-pulse" />
            <div className="p-8 space-y-6">
              <div className="h-16 w-20 bg-white/[0.06] rounded-xl animate-pulse" />
              <div className="h-10 w-48 bg-white/[0.06] rounded-xl animate-pulse" />
              <div className="h-5 w-full bg-white/[0.04] rounded-lg animate-pulse" />
              <div className="h-5 w-3/4 bg-white/[0.04] rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
