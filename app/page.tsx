import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { MessagesSection } from "@/components/home/MessagesSection";
import { CompanyPresentation } from "@/components/home/CompanyPresentation";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ContactFormSection } from "@/components/home/ContactFormSection";
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
      <div className="space-y-3 md:space-y-4 px-2 md:px-5 lg:px-8 py-3 md:py-4">
        <MessagesSection messages={messages} />
        <CompanyPresentation />
        <ServicesPreview services={services} />
        <BlogPreview posts={blogPosts} />
        <TestimonialsSection testimonials={testimonials} />
        <ClientsSection clients={clients} />
        <ContactFormSection ctaText={homeContent?.ctaText} />
      </div>
    </>
  );
}
