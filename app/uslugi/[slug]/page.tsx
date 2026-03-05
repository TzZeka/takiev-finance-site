import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-config";
import type { Metadata } from "next";
import { ServicePageClient } from "./ServicePageClient";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Услугата не е намерена - Takiev Finance",
    };
  }

  return {
    title: `${service.title} | Takiev Finance - Счетоводна Кантора`,
    description: service.description,
    alternates: {
      canonical: `https://takiev.bg/uslugi/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Takiev Finance`,
      description: service.description,
      url: `https://takiev.bg/uslugi/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient slug={slug} />;
}
