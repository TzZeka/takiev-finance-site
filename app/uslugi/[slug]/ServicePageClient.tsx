"use client";

import Image from "next/image";
import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactModal } from "@/components/shared/ContactModal";
import { ServiceNavigation } from "@/components/services/ServiceNavigation";
import { AccountingServicesTab } from "@/components/services/tabs/AccountingServicesTab";
import { TaxConsultationTab } from "@/components/services/tabs/TaxConsultationTab";
import { LegalServicesTab } from "@/components/services/tabs/LegalServicesTab";
import { CompanyRegistrationTab } from "@/components/services/tabs/CompanyRegistrationTab";
import { getServiceBySlug } from "@/lib/services-config";
import { faqData } from "@/lib/faq-data";
import { FAQAccordion } from "@/components/services/FAQAccordion";

const serviceBanners: Record<string, string> = {
  schetovodstvo: "/firm-logo/uslugi/счетоводни-услуги.png",
  danaci:        "/firm-logo/uslugi/данъчни-консултации.png",
  pravni:        "/firm-logo/uslugi/правни-услуги.png",
  registraciq:   "/firm-logo/uslugi/регистрация-на-фирми.png",
};

const serviceComponents: Record<
  string,
  React.ComponentType<{ onContact?: (packageName?: string) => void }>
> = {
  schetovodstvo: AccountingServicesTab,
  danaci:        TaxConsultationTab,
  pravni:        LegalServicesTab,
  registraciq:   CompanyRegistrationTab,
};

const CONTENT_TRANSITION = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

interface ServicePageClientProps {
  slug: string;
}

export function ServicePageClient({ slug }: ServicePageClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("");

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const ServiceComponent = serviceComponents[service.id];
  if (!ServiceComponent) notFound();

  const handleContact = (packageName?: string) => {
    setContactSubject(
      packageName
        ? `Заявка за пакет "${packageName}"`
        : `Запитване за ${service.title}`
    );
    setContactModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen pb-[120px] lg:pb-0" style={{ backgroundColor: "#0d1f1c" }}>

        {/* ── Hero banner — same sizing contract as За нас ── */}
        <section
          className="relative w-full overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]"
          style={{ aspectRatio: "6912 / 2801", minHeight: "360px", maxHeight: "88vh" }}
        >
          {/* Curtain reveal — wraps image + gradient only */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }}
          >
            <Image
              src={serviceBanners[service.id] || serviceBanners.schetovodstvo}
              alt={service.title}
              fill
              priority
              className="object-cover"
            />
            {/* Gradient overlay — same as За нас */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#06121c]/55 via-[#06121c]/20 to-[#06121c]/80 pointer-events-none" />
          </motion.div>

          {/* Breadcrumbs — top center, below header */}
          <div className="absolute top-0 inset-x-0 z-20 pt-32 md:pt-36 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Breadcrumbs />
            </motion.div>
          </div>

          {/* Glassmorphism card — bottom center, same as За нас */}
          <div className="absolute inset-x-0 bottom-0 px-4 z-10">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                className="bg-white/[0.015] backdrop-blur-2xl rounded-t-[1.5rem] md:rounded-t-[2.5rem] px-8 py-7 md:px-14 md:py-10 border border-white/[0.07]"
                style={{
                  boxShadow:
                    "0 16px 48px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              >
                <h1
                  className="text-white font-bold tracking-tight leading-[1.08]"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                >
                  {service.title}
                </h1>
                <p
                  className="font-body mt-3 max-w-xl mx-auto leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "clamp(0.88rem, 1.6vw, 1rem)",
                    fontWeight: 300,
                    fontStretch: "110%",
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Tab navigation ── */}
        <ServiceNavigation currentSlug={slug} />

        {/* ── Service content ── */}
        <motion.div
          className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={CONTENT_TRANSITION}
        >
          <ServiceComponent onContact={handleContact} />
          {(faqData[service.id]?.length ?? 0) > 0 && (
            <FAQAccordion items={faqData[service.id]} />
          )}
        </motion.div>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultSubject={contactSubject}
      />
    </>
  );
}
