export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#2a3a38] to-slate-950 pt-2 md:pt-3">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 mx-4 md:mx-8 rounded-2xl md:rounded-3xl">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 w-48 bg-white/[0.06] rounded-xl mx-auto mb-5 animate-pulse" />
            <div className="h-6 w-96 max-w-full bg-white/[0.04] rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
            >
              <div className="h-48 bg-white/[0.04] animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-white/[0.06] rounded animate-pulse" />
                <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-white/[0.04] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
