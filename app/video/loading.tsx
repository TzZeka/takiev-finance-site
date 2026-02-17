export default function VideoLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative bg-[#0a0f1a] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="h-8 w-40 bg-white/[0.06] rounded-full mx-auto mb-8 animate-pulse" />
            <div className="h-12 sm:h-14 w-[75%] bg-white/[0.06] rounded-2xl mx-auto mb-6 animate-pulse" />
            <div className="h-5 w-64 bg-white/[0.04] rounded-lg mx-auto mb-12 animate-pulse" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="h-14 w-56 bg-red-600/20 rounded-xl animate-pulse" />
              <div className="h-14 w-52 bg-white/[0.04] rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Videos skeleton */}
      <div className="bg-slate-950">
        <div className="container mx-auto px-4 py-16 md:py-20">
          {/* YouTube section */}
          <div className="mb-24">
            <div className="flex items-center justify-center gap-4 mb-14">
              <div className="h-px flex-1 max-w-40 bg-white/[0.06]" />
              <div className="h-14 w-44 bg-red-500/10 rounded-full animate-pulse" />
              <div className="h-px flex-1 max-w-40 bg-white/[0.06]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden ${
                    i === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="aspect-video bg-white/[0.04] animate-pulse" />
                  <div className="p-6 space-y-2">
                    <div className="h-5 w-3/4 bg-white/[0.06] rounded animate-pulse" />
                    <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
