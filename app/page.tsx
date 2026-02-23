import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { MessagesSection } from "@/components/home/MessagesSection";
import { CompanyPresentation, CompanyHistory, CompanyValues } from "@/components/home/CompanyPresentation";
import { ServicesPreview } from "@/components/home/ServicesPreview";

const BlogPreview = dynamic(() =>
  import("@/components/home/BlogPreview").then((m) => ({ default: m.BlogPreview }))
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection }))
);
const ClientsSection = dynamic(() =>
  import("@/components/home/ClientsSection").then((m) => ({ default: m.ClientsSection }))
);
const ContactFormSection = dynamic(() =>
  import("@/components/home/ContactFormSection").then((m) => ({ default: m.ContactFormSection }))
);
import {
  getHomeContent,
  getAllServices,
  getFeaturedBlogPosts,
  getFeaturedTestimonials,
  getAllClients,
} from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Takiev Finance - Счетоводна Кантора | Такиев Финанс",
  description:
    "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес. Счетоводни услуги, данъчни консултации, регистрация на фирми в София.",
  alternates: {
    canonical: "https://takiev.bg",
  },
  openGraph: {
    title: "Takiev Finance - Счетоводна Кантора",
    description:
      "Избери своя доверен бизнес партньор. Експертно счетоводно обслужване, данъчни консултации и регистрация на фирми.",
    url: "https://takiev.bg",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Takiev Finance - Счетоводна Кантора",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takiev Finance - Счетоводна Кантора",
    description:
      "Избери своя доверен бизнес партньор. Експертно счетоводно обслужване, данъчни консултации и регистрация на фирми.",
    images: ["/opengraph-image"],
  },
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all data in parallel
  const [homeContent, services, blogPosts, testimonials, clients] =
    await Promise.all([
      getHomeContent(),
      getAllServices(),
      getFeaturedBlogPosts(3),
      getFeaturedTestimonials(),
      getAllClients(),
    ]);

  const motto =
    homeContent?.motto ||
    "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес. Нашият екип ще осигури сигурност, защита и експертно счетоводно обслужване на Вашия бизнес.";

  const messages = homeContent?.messages || [
    {
      _key: "1",
      icon: "Users",
      title: "Индивидуален подход към всеки клиент",
      description: "Разбираме уникалните нужди на Вашия бизнес",
    },
    {
      _key: "2",
      icon: "Award",
      title: "Висока професионална експертиза",
      description: "Опитен екип с дългогодишна практика",
    },
    {
      _key: "3",
      icon: "Laptop",
      title: "Дигитализиране на Вашето счетоводство",
      description: "Край на хартиените документи",
    },
  ];

  return (
    <>
      <HeroSection motto={motto} />
      <div className="pb-3 md:pb-4">
        <div className="-mt-24 md:-mt-36 relative" style={{ zIndex: 1 }}>
          <MessagesSection messages={messages} />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 2 }}>
          <CompanyPresentation />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 3 }}>
          <CompanyHistory />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 4 }}>
          <CompanyValues />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 5 }}>
          <ServicesPreview services={services} />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 6 }}>
          <BlogPreview posts={blogPosts} />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 7 }}>
          <TestimonialsSection testimonials={testimonials} />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 8 }}>
          <ClientsSection clients={clients} />
        </div>
        <div className="-mt-12 md:-mt-16 relative" style={{ zIndex: 9 }}>
          <ContactFormSection ctaText={homeContent?.ctaText} />
        </div>
      </div>
    </>
  );
}
