export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero skeleton */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-7">
          <div className="h-14 sm:h-16 md:h-20 w-[80%] bg-white/[0.06] rounded-2xl animate-pulse" />
          <div className="h-5 sm:h-6 w-[60%] bg-white/[0.04] rounded-lg animate-pulse" />
          <div className="flex gap-4 pt-8">
            <div className="h-12 w-48 bg-white/[0.06] rounded-xl animate-pulse" />
            <div className="h-12 w-44 bg-white/[0.04] rounded-xl animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
