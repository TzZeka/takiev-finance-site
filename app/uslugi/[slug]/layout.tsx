import type { Metadata } from "next";
import { servicesConfig, getServiceBySlug as getService } from "@/lib/services-config";

interface ServiceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const serviceMetadata: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "schetovodni-uslugi": {
    title: "Счетоводни услуги в София - Месечно счетоводство и ТРЗ",
    description:
      "Професионално счетоводно обслужване в София – месечно счетоводство, годишно приключване, ТРЗ и осигуровки, финансови отчети за ЕООД, ООД и ЕТ.",
    keywords: [
      "счетоводни услуги София",
      "месечно счетоводство",
      "годишно приключване",
      "ТРЗ и осигуровки",
      "финансови отчети",
      "счетоводство ЕООД",
      "счетоводство ООД",
      "счетоводител София цена",
      "осчетоводяване на фактури",
    ],
  },
  "danachni-konsultacii": {
    title: "Данъчни консултации - ДДС регистрация и данъчно планиране",
    description:
      "Експертни данъчни консултации в София – ДДС регистрация, данъчно планиране, оптимизация на данъци, представителство пред НАП за фирми и физически лица.",
    keywords: [
      "данъчни консултации София",
      "ДДС регистрация",
      "данъчно планиране",
      "данъчна оптимизация",
      "представителство пред НАП",
      "данъчен консултант София",
      "данъчна декларация",
      "корпоративен данък",
      "данък върху доходите",
    ],
  },
  "pravni-uslugi": {
    title: "Правни услуги за бизнес - Договори и трудово право",
    description:
      "Правни услуги за бизнеса в София – изготвяне на договори, трудово и търговско право, правна защита и консултации за фирми.",
    keywords: [
      "правни услуги за фирми",
      "бизнес юрист София",
      "изготвяне на договори",
      "трудово право",
      "търговско право",
      "правен консултант София",
      "правна защита бизнес",
      "фирмен юрист",
    ],
  },
  "registraciq-na-firmi": {
    title: "Регистрация на фирма - ЕООД, ООД, ЕТ в София",
    description:
      "Бърза регистрация на ЕООД, ООД и ЕТ в София. Пълно съдействие при стартиране на бизнес – документи, Търговски регистър, избор на правна форма.",
    keywords: [
      "регистрация на фирма София",
      "регистрация ЕООД",
      "регистрация ООД",
      "регистрация ЕТ",
      "откриване на фирма",
      "стартиране на бизнес",
      "Търговски регистър",
      "регистрация на фирма цена",
      "как да регистрирам фирма",
    ],
  },
};

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
  const meta = serviceMetadata[slug];

  return {
    title: meta?.title ?? `${service.title} | Takiev Finance`,
    description: meta?.description ?? service.description,
    keywords: meta?.keywords ?? service.keywords,
    alternates: {
      canonical: `${baseUrl}/uslugi/${service.slug}`,
    },
    openGraph: {
      title: meta?.title ?? `${service.title} | Takiev Finance`,
      description: meta?.description ?? service.description,
      url: `${baseUrl}/uslugi/${service.slug}`,
      type: "website",
      locale: "bg_BG",
      siteName: "Takiev Finance",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${service.title} - Takiev Finance`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title ?? `${service.title} | Takiev Finance`,
      description: meta?.description ?? service.description,
      images: ["/opengraph-image"],
    },
  };
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return children;
}
