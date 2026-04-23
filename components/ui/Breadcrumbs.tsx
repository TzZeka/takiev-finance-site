"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { servicesConfig } from "@/lib/services-config";

// Route translations
const routeNames: Record<string, string> = {
    uslugi: "Услуги",
    "za-nas": "За Нас",
    kontakti: "Контакти",
    blog: "Блог",
    video: "Видео",
    novini: "Новини",
};

// Build a dynamic lookup from servicesConfig
servicesConfig.forEach((service) => {
    routeNames[service.slug] = service.label; // Label is usually shorter, like "Счетоводни услуги"
});

export function Breadcrumbs({ className = "", overrides = {} }: { className?: string; overrides?: Record<string, string> }) {
    const pathname = usePathname();

    // Don't render on home page
    if (!pathname || pathname === "/") return null;

    const paths = pathname.split("/").filter(Boolean);

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex flex-wrap items-center gap-2 text-sm font-medium text-white/50 ${className}`}
        >
            <Link
                href="/"
                className="flex items-center hover:text-primary transition-colors duration-200"
                title="Начало"
            >
                <Home className="w-4 h-4 mb-[1px]" />
            </Link>

            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                // Reconstruct the href up to this point
                const href = "/" + paths.slice(0, index + 1).join("/");

                // Use dictionary or decode the URI.
                let name = overrides[path] ?? routeNames[path] ?? decodeURIComponent(path).replace(/-/g, " ");

                // Capitalize first letter if it's a fallback string
                if (!overrides[path] && !routeNames[path] && typeof name === "string") {
                    name = name.charAt(0).toUpperCase() + name.slice(1);
                }

                return (
                    <div key={path} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />
                        {isLast ? (
                            <span className="text-white/90 drop-shadow-sm cursor-default" aria-current="page">
                                {name}
                            </span>
                        ) : (
                            <Link href={href} className="hover:text-primary transition-colors duration-200">
                                {name}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
