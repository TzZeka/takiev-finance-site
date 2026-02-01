"use client";

import { motion } from "framer-motion";
import {
  Scale,
  FileCheck,
  AlertTriangle,
  Briefcase,
  Building2,
  Stamp,
  GitBranch,
  Users,
  Building,
  UserCheck,
  FileText,
  ScrollText,
  ArrowRightLeft,
  FileSignature,
  Trash2,
  PenTool,
  Handshake,
  ChevronRight,
} from "lucide-react";

interface LegalServicesTabProps {
  onContact?: (packageName?: string) => void;
}

export function LegalServicesTab({ onContact }: LegalServicesTabProps) {
  const registrations = [
    { icon: Building2, text: "Регистрация на търговски дружества" },
    { icon: Stamp, text: "Регистрация на търговски марки" },
    { icon: GitBranch, text: "Регистрация на клонове" },
    { icon: Users, text: "Регистрация на сдружения и фондации" },
    { icon: Building, text: "Регистрация на консорциуми" },
    { icon: UserCheck, text: "Регистрация на еднолични търговци" },
    { icon: FileText, text: "Регистрация на свободни професии" },
  ];

  const appeals = [
    { icon: FileCheck, text: "Обжалване на ревизионни актове" },
    { icon: AlertTriangle, text: "Обжалване на наказателни постановления" },
    { icon: Scale, text: "Обжалване на незаконосъобразни уволнения" },
  ];

  const commercialDeals = [
    { icon: Briefcase, text: "Продажба на търговско предприятие" },
    { icon: ArrowRightLeft, text: "Промяна на правната форма на търговско дружество" },
    { icon: ScrollText, text: "Покупко-продажба на дружествени дялове и акции" },
    { icon: FileSignature, text: "Изготвяне на различни видове договори" },
    { icon: Trash2, text: "Ликвидация на търговски дружества" },
    { icon: PenTool, text: "Изготвяне на нотариални актове, пълномощни, удостоверения, покани и съдействие пред нотариус" },
    { icon: Handshake, text: "Консултация при сключване на търговски сделки" },
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
              <Scale className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                Всеки един успешно развиващ се бизнес има нужда както от добър счетоводител, така и от добър юрист.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Такиев Финанс</strong> работи в партньорски взаимоотношения с висококвалифицирани юристи в областта на гражданското, търговското и трудово право.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Правните услуги, за които можем да съдействаме
        </h3>
      </motion.div>

      {/* Services Table - 3 Columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {/* Column 1: Registrations */}
        <div className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/30 rounded-lg">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-white">Регистрации</h4>
            </div>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {registrations.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
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
        </div>

        {/* Column 2: Appeals */}
        <div className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-500/10 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white">Обжалвания на актове</h4>
            </div>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {appeals.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-amber-500/20 transition-colors mt-0.5">
                    <item.icon className="w-4 h-4 text-amber-400/70 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: Commercial Deals */}
        <div className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/10 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/30 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white">Търговски сделки</h4>
            </div>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {commercialDeals.map((item, index) => (
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
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-2xl p-6 md:p-8 text-center"
      >
        <p className="text-white/80 max-w-2xl mx-auto">
          За повече информация относно правните услуги, които предлагаме, можете да се свържете с нас чрез <ContactLink>контактната форма</ContactLink> или на посочения телефон за връзка.
        </p>
      </motion.div>
    </div>
  );
}
