export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#2a3a38] to-slate-950">
      {/* Navigation skeleton */}
      <div className="sticky top-16 z-30 bg-slate-950/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="container mx-auto px-4 py-3 flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-36 bg-white/[0.06] rounded-lg animate-pulse shrink-0" />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="h-10 w-64 bg-white/[0.08] rounded-xl animate-pulse" />
          <div className="h-5 w-full max-w-lg bg-white/[0.04] rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-white/[0.03] border border-white/[0.06] rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
