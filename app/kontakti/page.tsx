import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Контакти - Takiev Finance",
  description:
    "Свържете се с нас за професионална консултация по счетоводство и данъци. Очакваме Вашето запитване.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "office@takiev.bg",
    link: "mailto:office@takiev.bg",
  },
  {
    icon: Phone,
    title: "Телефон",
    content: "+359 123 456 789",
    link: "tel:+359123456789",
  },
  {
    icon: MapPin,
    title: "Адрес",
    content: "София, България",
    link: null,
  },
  {
    icon: Clock,
    title: "Работно време",
    content: "Пон-Пет: 9:00 - 18:00",
    link: null,
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
            Контакти
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Свържете се с нас за професионална консултация. Очакваме Вашето
            запитване.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                Информация за контакт
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  const content = item.link ? (
                    <a
                      href={item.link}
                      className="text-dark hover:text-primary transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-dark">{item.content}</span>
                  );

                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-dark mb-1">
                              {item.title}
                            </h3>
                            {content}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-dark mb-3">
                  Защо да изберете нас?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Бърз отговор на запитвания</li>
                  <li>✓ Професионален екип от експерти</li>
                  <li>✓ Индивидуален подход към всеки клиент</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                Изпратете запитване
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
