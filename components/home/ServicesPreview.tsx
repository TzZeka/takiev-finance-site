import Link from "next/link";
import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  // Group services by category
  const categories = [
    "Счетоводни",
    "Данъчни",
    "Правни",
    "Регистрация",
  ] as const;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Нашите услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Предлагаме цялостни решения за Вашия бизнес
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => {
            const categoryServices = services.filter(
              (s) => s.category === category
            );
            const firstService = categoryServices[0];

            if (!firstService) return null;

            const IconComponent =
              Icons[firstService.icon as keyof typeof Icons] ||
              Icons.Briefcase;

            return (
              <Card
                key={category}
                className="group hover:shadow-lg transition-all duration-300 hover:border-primary"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {/* @ts-ignore */}
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {categoryServices.length} пакет
                    {categoryServices.length > 1 ? "а" : ""}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="p-0 h-auto text-primary"
                  >
                    <Link href="/uslugi" className="flex items-center">
                      Разгледай
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/uslugi">
              Всички услуги
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
