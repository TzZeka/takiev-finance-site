import { ContactForm } from "@/components/shared/ContactForm";

interface ContactFormSectionProps {
  ctaText?: string;
}

export function ContactFormSection({ ctaText }: ContactFormSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              {ctaText || "Готови ли сте да започнете?"}
            </h2>
            <p className="text-lg text-muted-foreground">
              Свържете се с нас за безплатна консултация
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
