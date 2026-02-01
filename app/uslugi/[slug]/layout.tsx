import type { Metadata } from "next";
import { servicesConfig, getServiceBySlug as getService } from "@/lib/services-config";

interface ServiceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesConfig.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Услуга не е намерена",
    };
  }

  const baseUrl = "https://takiev.bg";

  return {
    title: `${service.title} | Takiev Finance`,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `${baseUrl}/uslugi/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Takiev Finance`,
      description: service.description,
      url: `${baseUrl}/uslugi/${service.slug}`,
      type: "website",
      locale: "bg_BG",
      siteName: "Takiev Finance",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Takiev Finance`,
      description: service.description,
    },
  };
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return children;
}
