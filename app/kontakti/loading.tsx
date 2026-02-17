export default function ContactLoading() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Hero skeleton */}
      <section className="pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-24 md:pb-32 text-center">
        <div className="container mx-auto px-4">
          <div className="h-4 w-40 bg-white/[0.06] rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 sm:h-14 w-48 bg-white/[0.06] rounded-2xl mx-auto mb-6 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-white/[0.04] rounded-lg mx-auto animate-pulse" />
        </div>
      </section>

      {/* Contact cards skeleton */}
      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
            >
              <div className="w-10 h-10 bg-white/[0.06] rounded-xl mb-4 animate-pulse" />
              <div className="h-4 w-16 bg-white/[0.06] rounded mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-white/[0.04] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Map + Form skeleton */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px] lg:h-[420px] bg-white/[0.03] border border-white/[0.06] rounded-2xl animate-pulse" />
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-4">
            <div className="h-8 w-56 bg-white/[0.06] rounded-lg animate-pulse" />
            <div className="h-4 w-72 bg-white/[0.04] rounded animate-pulse" />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-white/[0.04] rounded-lg animate-pulse" />
              ))}
              <div className="h-32 bg-white/[0.04] rounded-lg animate-pulse" />
              <div className="h-12 w-40 bg-white/[0.06] rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
