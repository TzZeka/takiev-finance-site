import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Страницата не е намерена",
  description: "Страницата, която търсите, не съществува или е била преместена.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#2a3a38] to-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Страницата не е намерена
        </h2>
        <p className="text-stone-400 text-lg mb-8 leading-relaxed">
          Страницата, която търсите, не съществува или е била преместена.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Начална страница
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white/[0.06] text-white font-semibold rounded-xl border border-white/[0.1] hover:bg-white/[0.1] transition-colors"
          >
            Блог
          </Link>
        </div>
      </div>
    </div>
  );
}
