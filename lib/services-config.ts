import { Calculator, Receipt, Scale, Building2 } from "lucide-react";

export interface ServiceConfig {
  id: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  icon: typeof Calculator;
  keywords: string[];
}

export const servicesConfig: ServiceConfig[] = [
  {
    id: "schetovodstvo",
    slug: "schetovodni-uslugi",
    label: "Счетоводни услуги",
    title: "Счетоводни услуги",
    description: "Професионално счетоводно обслужване за вашия бизнес. Месечно счетоводство, годишно приключване, ТРЗ услуги и консултации.",
    icon: Calculator,
    keywords: ["счетоводство", "счетоводни услуги", "счетоводител", "ТРЗ", "годишно приключване"]
  },
  {
    id: "danaci",
    slug: "danachni-konsultacii",
    label: "Данъчни консултации",
    title: "Данъчни консултации",
    description: "Експертни данъчни консултации и оптимизация. ДДС регистрация, данъчно планиране и представителство пред НАП.",
    icon: Receipt,
    keywords: ["данъчни консултации", "данъчен консултант", "ДДС", "НАП", "данъчно планиране"]
  },
  {
    id: "pravni",
    slug: "pravni-uslugi",
    label: "Правни услуги",
    title: "Правни услуги",
    description: "Правни консултации и услуги за бизнеса. Договори, трудово право, търговско право и правна защита.",
    icon: Scale,
    keywords: ["правни услуги", "правен консултант", "договори", "трудово право", "търговско право"]
  },
  {
    id: "registraciq",
    slug: "registraciq-na-firmi",
    label: "Регистрация на фирми",
    title: "Регистрация на фирми",
    description: "Бърза и лесна регистрация на ЕООД, ООД и ЕТ. Пълно съдействие при стартиране на бизнес.",
    icon: Building2,
    keywords: ["регистрация на фирма", "регистрация ЕООД", "регистрация ООД", "регистрация ЕТ", "стартиране на бизнес"]
  }
];

// Helper functions
export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return servicesConfig.find(s => s.slug === slug);
}

export function getServiceById(id: string): ServiceConfig | undefined {
  return servicesConfig.find(s => s.id === id);
}

export function getAllServiceSlugs(): string[] {
  return servicesConfig.map(s => s.slug);
}
