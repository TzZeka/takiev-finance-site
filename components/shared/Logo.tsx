import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <Image
          src="/firm-logo/logo.png"
          alt="Takiev Finance Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold text-dark">
        Takiev <span className="text-primary">Finance</span>
      </span>
    </Link>
  );
}
