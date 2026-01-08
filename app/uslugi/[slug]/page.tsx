import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getAllServices, getServiceBySlug } from "@/lib/sanity/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Услуга не е намерена - Takiev Finance",
    };
  }

  return {
    title: `${service.title} - Takiev Finance`,
    description: service.excerpt,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const IconComponent =
    Icons[service.icon as keyof typeof Icons] || Icons.Briefcase;

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/uslugi">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Към всички услуги
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center mr-6">
              {/* @ts-ignore */}
              <IconComponent className="h-10 w-10 text-primary" />
            </div>
            <div>
              <div className="text-sm text-primary font-semibold mb-2">
                {service.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark">
                {service.title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {service.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          {service.description && service.description.length > 0 && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={service.description} />
            </div>
          )}

          {/* Packages */}
          {service.packages && service.packages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-dark mb-8">
                Налични пакети
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.packages.map((pkg) => (
                  <Card key={pkg._key} className="border-2 hover:border-primary transition-colors">
                    <CardHeader>
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      {pkg.price && (
                        <p className="text-2xl font-bold text-primary">
                          {pkg.price}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {pkg.description && (
                        <p className="text-muted-foreground">{pkg.description}</p>
                      )}
                      {pkg.features && pkg.features.length > 0 && (
                        <ul className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-background rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-dark mb-4">
              Заинтересовани ли сте?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Свържете се с нас за безплатна консултация и оферта
            </p>
            <Button asChild size="lg">
              <Link href="/kontakti">Изпрати запитване</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
