import type { Metadata } from "next";
import { getAllServices } from "@/lib/sanity/queries";
import { ServiceCard } from "@/components/services/ServiceCard";

export const metadata: Metadata = {
  title: "Услуги - Takiev Finance",
  description:
    "Професионални счетоводни услуги, данъчни консултации, правни услуги и регистрация на фирми. Цялостни решения за Вашия бизнес.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  // Group services by category
  const categories = [
    { key: "Счетоводни", title: "Счетоводни услуги" },
    { key: "Данъчни", title: "Данъчни консултации" },
    { key: "Правни", title: "Правни услуги" },
    { key: "Регистрация", title: "Регистрация на фирми" },
  ] as const;

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Нашите услуги
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Предлагаме цялостни решения за управление на счетоводството, данъците
            и правните аспекти на Вашия бизнес
          </p>
        </div>

        {/* Services by Category */}
        <div className="space-y-16">
          {categories.map((category) => {
            const categoryServices = services.filter(
              (s) => s.category === category.key
            );

            if (categoryServices.length === 0) return null;

            return (
              <section key={category.key}>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Услугите ще бъдат добавени скоро.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
