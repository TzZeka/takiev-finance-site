"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import { servicesConfig, getServiceBySlug } from "@/lib/services-config";
import { AccountingServicesTab } from "@/components/services/tabs/AccountingServicesTab";
import { TaxConsultationTab } from "@/components/services/tabs/TaxConsultationTab";
import { LegalServicesTab } from "@/components/services/tabs/LegalServicesTab";
import { CompanyRegistrationTab } from "@/components/services/tabs/CompanyRegistrationTab";
import { ContactModal } from "@/components/shared/ContactModal";
import { ServiceNavigation } from "@/components/services/ServiceNavigation";
import { motion } from "framer-motion";

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
        {/* Hero Section - Title of the current service */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 pb-6 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>
        </div>

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
