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
      <HeroSection motto={motto} videoUrl={homeContent?.heroVideoUrl} />
      <MessagesSection messages={messages} />
      <CompanyPresentation />
      <ServicesPreview services={services} />
      <BlogPreview posts={blogPosts} />
      <TestimonialsSection testimonials={testimonials} />
      <ClientsSection clients={clients} />
      <ContactFormSection ctaText={homeContent?.ctaText} />
    </>
  );
}
