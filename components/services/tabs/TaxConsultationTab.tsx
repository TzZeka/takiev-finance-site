"use client";

import { motion } from "framer-motion";
import {
  Receipt,
  Calculator,
  FileText,
  Building2,
  Globe,
  Search,
  FileCheck,
  AlertTriangle,
  Users,
  Calendar,
  Gift,
  Briefcase,
  UserCheck,
  UserPlus,
  TrendingUp,
  Scale,
  Heart,
  Stamp,
  FileSignature,
  ChevronRight,
} from "lucide-react";

interface TaxConsultationTabProps {
  onContact?: (packageName?: string) => void;
}

export function TaxConsultationTab({ onContact }: TaxConsultationTabProps) {
  const companyServices = [
    { icon: Receipt, text: "Данъчно облагане с ДДС (ЗДДС)" },
    { icon: Building2, text: "Корпоративно подоходно облагане (ЗКПО)" },
    { icon: Globe, text: "Данъчно облагане на международни сделки (СИДДО)" },
    { icon: Search, text: "Цялостен данъчен одит на Вашето дружество" },
    { icon: FileCheck, text: "Изготвяне на писмени данъчни становища" },
    { icon: AlertTriangle, text: "Обжалване на ревизионни актове и ревизионни доклади" },
  ];

  const individualServices = [
    { icon: FileText, text: "Данъчно облагане на различни видове доходи" },
    { icon: Calendar, text: "Годишна данъчна декларация за физически лица" },
    { icon: Gift, text: "Данъчни облекчения за физически лица" },
    { icon: Briefcase, text: "Данъчни консултации за фрийлансъри на свободна практика" },
    { icon: UserCheck, text: "Декларация за регистрация на самоосигуряващи се лица" },
    { icon: UserPlus, text: "Регистрация на свободна професия" },
    { icon: Receipt, text: "Регистрация по ЗДДС на физически лица" },
    { icon: TrendingUp, text: "Данъчно облагане на доходи от търговия с финансови инструменти" },
    { icon: Scale, text: "Трудови правоотношения" },
    { icon: Heart, text: "Социално и здравно осигуряване при физическите лица" },
    { icon: Stamp, text: "Данъчно облагане с патентен данък" },
    { icon: FileSignature, text: "Избягване на двойното данъчно облагане при физическите лица" },
  ];

  const ContactLink = ({ children }: { children: React.ReactNode }) => (
    <button
      onClick={() => onContact?.()}
      className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium"
    >
      {children}
    </button>
  );

  return (
    <div>
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 md:mb-16"
      >
        <div className="bg-gradient-to-br from-primary/10 via-white/5 to-primary/5 border-2 border-primary/20 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Calculator className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-white/90 text-lg leading-relaxed">
                Качеството на счетоводната услуга трябва да се развива постоянно. В днешно време ролята на счетоводителя в един бизнес е много повече от работа с документи и осчетоводяване на стопански операции.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Добрият счетоводител трябва да бъде отличен консултант.</strong> Това, което ни отличава от нашите конкуренти е изключителното ни умение да разговаряме и да информираме на разбираем и достъпен език всеки клиент по различни данъчни и счетоводни въпроси.
              </p>
              <p className="text-white/70 leading-relaxed">
                Ние вярваме, че <strong className="text-white">информацията е най-ценният ресурс</strong> в днешно време. Нашият екип се е специализирал в данъчните консултации и данъчното планиране. Данъчното планиране има висока добавена стойност както за физическите лица, така и за бизнесите, тъй като им позволява да оптимизират своите данъчни задължения към държавата.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Column 1: Company Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 md:p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/30 rounded-lg">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Данъчни консултации за търговски дружества
              </h3>
            </div>
          </div>
          <div className="p-4 md:p-6">
            <div className="mb-4 space-y-2">
              <p className="text-white/80 text-sm leading-relaxed">
                Данъчното облагане и данъчното планиране стоят в основата на оптимизирането на фирмените разходи.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Плащането на данъци често нарушава ритмичността на паричните потоци. Предварителното планиране на бъдещите данъчни задължения на фирмата е от изключително важно значение за управление на паричните потоци.
              </p>
            </div>
            <p className="text-white/50 text-xs mb-4 font-medium uppercase tracking-wide">
              Ние предлагаме:
            </p>
            <ul className="space-y-3">
              {companyServices.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors mt-0.5">
                    <item.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Column 2: Individual Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/10 p-4 md:p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Данъчни консултации за физически лица
              </h3>
            </div>
          </div>
          <div className="p-4 md:p-6">
            <div className="mb-4 space-y-2">
              <p className="text-white/80 text-sm leading-relaxed">
                Данъчните консултации за физическите лица имат най-вече информативна функция.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Най-често данъчните нарушения при физическите лица са поради липса на достатъчна информираност от тяхна страна по отношение задълженията им за деклариране на данъци или начина, по който се облага една или друга сделка.
              </p>
            </div>
            <p className="text-white/50 text-xs mb-4 font-medium uppercase tracking-wide">
              Ние предлагаме:
            </p>
            <ul className="space-y-3">
              {individualServices.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors mt-0.5">
                    <item.icon className="w-4 h-4 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-2xl p-6 md:p-8 text-center"
      >
        <p className="text-white/80 max-w-2xl mx-auto">
          За повече информация относно данъчните консултации, които предлагаме, можете да се свържете с нас чрез <ContactLink>контактната форма</ContactLink> или на посочения телефон за връзка.
        </p>
      </motion.div>
    </div>
  );
}
