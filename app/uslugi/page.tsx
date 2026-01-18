"use client";

import { useState, Suspense } from "react";
import { ServiceTabs } from "@/components/services/ServiceTabs";
import { AccountingServicesTab } from "@/components/services/tabs/AccountingServicesTab";
import { TaxConsultationTab } from "@/components/services/tabs/TaxConsultationTab";
import { LegalServicesTab } from "@/components/services/tabs/LegalServicesTab";
import { CompanyRegistrationTab } from "@/components/services/tabs/CompanyRegistrationTab";
import { ContactModal } from "@/components/shared/ContactModal";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");

  const handleContact = (packageName?: string) => {
    if (packageName) {
      setContactSubject(`Заявка за пакет „${packageName}"`);
    } else {
      setContactSubject("");
    }
    setContactModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-24 pb-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Нашите услуги
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Професионални счетоводни и данъчни решения за вашия бизнес
            </p>
          </div>
        </motion.div>

        {/* Service Tabs */}
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center text-white/50">Зареждане...</div>}>
          <ServiceTabs>
            <AccountingServicesTab onContact={handleContact} />
            <TaxConsultationTab onContact={handleContact} />
            <LegalServicesTab onContact={handleContact} />
            <CompanyRegistrationTab onContact={handleContact} />
          </ServiceTabs>
        </Suspense>
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
