export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero skeleton */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 sm:h-14 w-64 bg-white/[0.06] rounded-2xl mx-auto mb-6 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-white/[0.04] rounded-lg mx-auto animate-pulse" />
        </div>
      </section>

      {/* Service cards skeleton */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24 space-y-12 md:space-y-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 bg-white/[0.03] border border-white/[0.06] rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <div className={`h-64 md:h-80 lg:h-96 bg-white/[0.04] animate-pulse ${i % 2 !== 0 ? "md:order-2" : ""}`} />
            <div className={`p-6 md:p-8 lg:p-12 space-y-4 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-white/[0.06] rounded-xl animate-pulse" />
                <div className="h-8 w-48 bg-white/[0.06] rounded-lg animate-pulse" />
              </div>
              <div className="h-4 w-full bg-white/[0.04] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-white/[0.04] rounded animate-pulse" />
              <div className="space-y-2.5 pt-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-4 w-2/3 bg-white/[0.04] rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
