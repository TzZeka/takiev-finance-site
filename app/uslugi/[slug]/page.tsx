"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { use, useState } from "react";
import { servicesConfig, getServiceBySlug } from "@/lib/services-config";
import { AccountingServicesTab } from "@/components/services/tabs/AccountingServicesTab";
import { TaxConsultationTab } from "@/components/services/tabs/TaxConsultationTab";
import { LegalServicesTab } from "@/components/services/tabs/LegalServicesTab";
import { CompanyRegistrationTab } from "@/components/services/tabs/CompanyRegistrationTab";
import { ContactModal } from "@/components/shared/ContactModal";
import { ServiceNavigation } from "@/components/services/ServiceNavigation";
import { motion } from "framer-motion";

const serviceBanners: Record<string, string> = {
  schetovodstvo: "/firm-logo/uslugi/счетоводни-услуги.png",
  danaci: "/firm-logo/uslugi/данъчни-консултации.png",
  pravni: "/firm-logo/uslugi/правни-услуги.png",
  registraciq: "/firm-logo/uslugi/регистрация-на-фирми.png",
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Map service IDs to their components
const serviceComponents: Record<string, React.ComponentType<{ onContact?: (packageName?: string) => void }>> = {
  schetovodstvo: AccountingServicesTab,
  danaci: TaxConsultationTab,
  pravni: LegalServicesTab,
  registraciq: CompanyRegistrationTab,
};

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = use(params);
  const service = getServiceBySlug(slug);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");

  if (!service) {
    notFound();
  }

  const ServiceComponent = serviceComponents[service.id];

  if (!ServiceComponent) {
    notFound();
  }

  const handleContact = (packageName?: string) => {
    if (packageName) {
      setContactSubject(`Заявка за пакет "${packageName}"`);
    } else {
      setContactSubject(`Запитване за ${service.title}`);
    }
    setContactModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Banner with Image */}
        <section className="relative h-[50vh] min-h-[350px] md:min-h-[420px] flex items-center justify-center text-white overflow-hidden">
          <Image
            src={serviceBanners[service.id] || serviceBanners.schetovodstvo}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-950" />
          {/* Top-left blur zone behind header, fading right and down */}
          <div className="absolute top-0 left-0 w-2/3 h-20 md:h-24 backdrop-blur-md bg-black/40" style={{
            maskImage: "linear-gradient(to bottom right, black 0%, black 20%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom right, black 0%, black 20%, transparent 70%)",
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto drop-shadow-md">
              {service.description}
            </p>
          </motion.div>
        </section>

        {/* Service Navigation - Sticky below header */}
        <ServiceNavigation currentSlug={slug} />

        {/* Service Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <ServiceComponent onContact={handleContact} />
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultSubject={contactSubject}
      />
    </>
  );
}
