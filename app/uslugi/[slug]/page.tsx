import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-config";
import { faqData } from "@/lib/faq-data";
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

  const faqs = faqData[service.id] ?? [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageClient slug={slug} />
    </>
  );
}
