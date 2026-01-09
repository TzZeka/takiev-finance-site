import Image from "next/image";
import { getImageUrl } from "@/lib/sanity/client";
import type { Client } from "@/types";

interface ClientsSectionProps {
  clients: Client[];
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  if (clients.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Нашите клиенти и партньори
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Доверили са ни своя бизнес
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client) => (
            <div
              key={client._id}
              className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-primary transition-colors duration-300 hover:shadow-md group"
            >
              <div className="relative w-full h-16">
                <Image
                  src={getImageUrl(client.logo)}
                  alt={client.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
