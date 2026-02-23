"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#40514E] text-white gap-6 px-4">
      <p className="text-white/50 text-sm tracking-widest uppercase">Нещо се обърка</p>
      <h2
        className="text-3xl font-bold text-center"
      >
        Страницата не може да се зареди
      </h2>
      <button
        onClick={reset}
        className="px-6 py-3 bg-primary text-white text-sm tracking-wider uppercase hover:bg-primary/80 transition-colors"
      >
        Опитай отново
      </button>
    </div>
  );
}
