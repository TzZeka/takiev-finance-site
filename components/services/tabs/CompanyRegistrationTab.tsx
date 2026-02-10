"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  User,
  ChevronRight,
  Scale,
  FileText,
  CreditCard,
  CheckCircle,
  AlertCircle,
  BookOpen,
  HelpCircle
} from "lucide-react";
import { ContentTableOfContents } from "../ContentTableOfContents";
import { cn } from "@/lib/utils";

interface CompanyRegistrationTabProps {
  onContact?: (packageName?: string) => void;
}

export function CompanyRegistrationTab({ onContact }: CompanyRegistrationTabProps) {
  const [tocCollapsed, setTocCollapsed] = useState(false);
  // Table of contents items - starts from business-forms, not introduction
  const tocItems = [
    { id: "business-forms", title: "Форми на търговска дейност", level: 1 },
    { id: "company-registration", title: "Регистрация на търговско дружество", level: 1 },
    { id: "company-types", title: "Видове търговски дружества", level: 2 },
    { id: "ood-eood-difference", title: "Разлика ООД и ЕООД", level: 2 },
    { id: "registration-steps", title: "Стъпки за регистрация", level: 2 },
    { id: "et-registration", title: "Регистрация на едноличен търговец", level: 1 },
    { id: "et-how-to-start", title: "Как да започна като ЕТ", level: 2 },
    { id: "et-accounting", title: "Счетоводство на ЕТ", level: 2 },
    { id: "et-without-registration", title: "Дейност без регистрация", level: 2 },
    { id: "et-service", title: "Услуга за регистрация на ЕТ", level: 2 },
  ];

  const companyTypes = [
    { abbr: "СД", name: "Събирателно дружество" },
    { abbr: "КД", name: "Командитно дружество" },
    { abbr: "ООД/ЕООД", name: "Дружество с ограничена отговорност", popular: true },
    { abbr: "АД", name: "Акционерно дружество" },
    { abbr: "КДА", name: "Командитно дружество с акции" },
  ];

  const registrationSteps = [
    {
      number: 1,
      title: "Избор на правна форма и име",
      description: "Избор на правна форма и име на търговското дружество",
    },
    {
      number: 2,
      title: "Определяне на капитал",
      description: "Избор на сума на първоначалния капитал",
    },
    {
      number: 3,
      title: "Предмет на дейност и адрес",
      description: "Определяне предмета на дейност и адреса на търговското дружество",
    },
    {
      number: 4,
      title: "Подготовка на документи",
      description: "Подготовка на всички необходими документи за регистрация",
    },
    {
      number: 5,
      title: "Нотариална заверка",
      description: "Заверка при нотариус на част от документите",
    },
    {
      number: 6,
      title: "Банкова сметка",
      description: "Откриване на банкова сметка на дружеството и внасяне на началния капитал",
    },
    {
      number: 7,
      title: "Държавна такса",
      description: "Плащане на държавна такса в размер на 55 лева към Търговския регистър",
    },
    {
      number: 8,
      title: "Входиране на документи",
      description: "Входиране на документите за регистрация в Търговския регистър",
    },
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
      {/* Introduction Section - Full Width (outside TOC layout) */}
      <section id="introduction" className="mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-white/5 to-primary/5 border-2 border-primary/20 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/20 rounded-xl">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Трудно ли е да регистрираш собствена фирма?
            </h3>
          </div>

          <div className="space-y-4 text-white/80 leading-relaxed md:text-justify break-words">
            <p>
              Стартирането на собствен бизнес, особено когато е за първи път, несъмнено е един вълнуващ и важен момент за Вас, който обаче доста често е свързан с много неизвестни.
            </p>
            <p>
              Много често хората смятат, че да си регистрираш собствена фирма е нещо трудно, сложно и скъпо и поради тази причина често се страхуват да направят тази така важна крачка в своето бизнес развитие.
            </p>
            <p className="text-white font-medium">
              Истината обаче е, че регистрацията на фирма нито е нещо трудно, нито е нещо сложно, когато ползваме услугите на професионалисти.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Two Column Layout: Content + TOC Sidebar */}
      <div className={cn(
        "lg:grid lg:gap-8 transition-all duration-500",
        tocCollapsed ? "lg:grid-cols-[1fr_56px]" : "lg:grid-cols-[1fr_280px]"
      )}>
        {/* Main Content - expands when TOC is collapsed */}
        <div className="min-w-0">
          <div className="space-y-16 md:space-y-20">
            {/* Section: Business Forms */}
            <section id="business-forms">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Под каква форма имам право да извършвам търговска дейност?
                  </h3>
                </div>

                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                  <p className="text-white/80 leading-relaxed md:text-justify break-words">
                    Вие можете да упражнявате търговска дейност по два начина – като <strong className="text-white">физическо лице</strong> или чрез <strong className="text-white">регистрация на търговско дружество</strong> (юридическо лице).
                  </p>
                  <p className="text-white/80 leading-relaxed md:text-justify break-words">
                    Нашият екип работи съвместно с високо квалифицирани юристи, които могат да Ви съдействат за регистрация на търговско дружество или регистрация на едноличен търговец.
                  </p>
                  <p className="text-white/80 leading-relaxed md:text-justify break-words">
                    За повече информация може да ни потърсите на посочения телефон за връзка или да ни пишете чрез <ContactLink>контактната форма</ContactLink> на нашия сайт.
                  </p>

                  {/* Two cards for the two options */}
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-white">Физическо лице</h4>
                      </div>
                      <p className="text-sm text-white/60">Едноличен търговец (ЕТ)</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Building className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-white">Юридическо лице</h4>
                      </div>
                      <p className="text-sm text-white/60">Търговско дружество (ООД, ЕООД, АД и др.)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section: Company Registration */}
            <section id="company-registration">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Регистрация на търговско дружество
                  </h3>
                </div>

                {/* Company Types */}
                <div id="company-types" className="mb-12">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">1.</span>
                    Какъв е видът на търговското дружество трябва да избера?
                  </h4>

                  <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8">
                    <p className="text-white/80 leading-relaxed md:text-justify break-words mb-6">
                      Според действащия у нас Търговски закон са възможни няколко правни форми на търговски дружества:
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {companyTypes.map((type) => (
                        <div
                          key={type.abbr}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            type.popular
                              ? "bg-primary/10 border-primary/30"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          {type.popular && (
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-white text-xs font-medium rounded-full">
                              Популярна
                            </span>
                          )}
                          <span className="text-lg font-bold text-white">{type.abbr}</span>
                          <p className="text-sm text-white/60 mt-1">{type.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 text-white/80 leading-relaxed md:text-justify break-words">
                      <p>
                        <strong className="text-white">Най-често използваната форма</strong> на търговско дружество е дружеството с ограничена отговорност – ООД/ЕООД.
                      </p>
                      <p>
                        Всяка от изброените правни форми има своите законови особености, с които е добре да бъдете запознати. Изборът на правната форма зависи от редица фактори, част от които са обема на планираната търговската дейност, организацията на взаимоотношенията между собствениците, началният капитал, който ще бъде инвестиран.
                      </p>
                    </div>
                  </div>
                </div>

                {/* OOD vs EOOD Difference */}
                <div id="ood-eood-difference" className="mb-12">
                  <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Разлика между ООД и ЕООД
                    </h4>
                    <p className="text-white/80 leading-relaxed md:text-justify break-words mb-4">
                      Разликата между ООД и ЕООД е единствено и само в броя на собствениците – при ООД са налице <strong className="text-white">двама или повече съдружници</strong>, докато при ЕООД е налице <strong className="text-white">един единствен собственик</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <div className="flex-1 bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-white">ООД/ЕООД</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">2 лв</p>
                        <p className="text-xs text-white/50">минимален капитал</p>
                      </div>
                      <div className="flex-1 bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-white">АД</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">50 000 лв</p>
                        <p className="text-xs text-white/50">минимален капитал</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Steps */}
                <div id="registration-steps">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">2.</span>
                    Какви са стъпките за регистрация на фирма?
                  </h4>

                  <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8">
                    <p className="text-white/80 leading-relaxed md:text-justify break-words mb-6">
                      Регистрацията на търговско дружество може да се извърши от управителя на дружеството или от лице, което е адвокат и е вписан в адвокатска колегия.
                    </p>

                    <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-8">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-200/90">
                        <strong>Важно:</strong> Счетоводителят не може да регистрира търговско дружество в Търговския регистър.
                      </p>
                    </div>

                    <p className="text-white/80 mb-6">Стъпките, през които трябва да преминете са следните:</p>

                    {/* Timeline Steps */}
                    <div className="relative">
                      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

                      <div className="space-y-4">
                        {registrationSteps.map((step, index) => (
                          <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="relative flex gap-4"
                          >
                            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                              <span className="text-white font-bold text-sm">{step.number}</span>
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-colors">
                                <h5 className="font-semibold text-white mb-1">{step.title}</h5>
                                <p className="text-sm text-white/60">{step.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Completion */}
                        <div className="relative flex items-center gap-4">
                          <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#1effff] flex items-center justify-center shadow-lg shadow-primary/50">
                            <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </div>
                          <span className="text-lg font-semibold text-primary">Готово!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service for Company Registration */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">3.</span>
                    Предлагате ли услуга за регистрация на физическо лице като едноличен търговец?
                  </h4>

                  <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8">
                    <p className="text-white/80 leading-relaxed md:text-justify break-words">
                      Нашият екип работи съвместно с висококвалифицирани юристи, които могат да Ви съдействат с всичко необходимо за регистрация на Вашия бизнес.
                    </p>
                    <p className="text-white/80 leading-relaxed md:text-justify break-words mt-4">
                      За повече информация можете да се свържете с нас на посочения телефон или чрез <ContactLink>контактната форма</ContactLink> на нашия сайт.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section: ET Registration */}
            <section id="et-registration">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Регистрация на едноличен търговец
                  </h3>
                </div>

                {/* How to start as ET */}
                <div id="et-how-to-start" className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">1.</span>
                    Как мога да упражнявам търговска дейност като физическо лице?
                  </h4>

                  <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                    <p className="text-white/80 leading-relaxed md:text-justify break-words">
                      За да упражнявате търговска дейност като физическо лице е необходимо да се регистрирате като едноличен търговец в Търговския регистър. По този начин вие ще придобиете търговско качество и ще можете законно да упражнявате своята дейност.
                    </p>
                    <p className="text-white/80 leading-relaxed md:text-justify break-words">
                      След като бъдете регистрирани като едноличен търговец (ЕТ), ще можете да издавате фактури към контрагенти, да бъдете работодател по трудови договори и др.
                    </p>
                    <p className="text-white/80 leading-relaxed md:text-justify break-words">
                      Упражняването на търговска дейност от едноличния търговец поражда задължение за социално и здравно осигуряване и поради тази причина следва да се регистрирате като самоосигуряващо се лице.
                    </p>

                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mt-4">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200/90">
                        <strong>Важно:</strong> Имуществото ви като физическо лице е част от имуществото на едноличния търговец. Това означава, че физическото лице отговаря неограничено с цялото си лично имущество за всички задължения, които едноличният търговец поема.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ET Accounting */}
                <div id="et-accounting" className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">2.</span>
                    Необходимо ли е да се води счетоводство на едноличен търговец?
                  </h4>

                  <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/20 rounded-xl">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-white/80 leading-relaxed md:text-justify break-words">
                        Едноличните търговци са <strong className="text-white">длъжни да водят счетоводна отчетност</strong> за своята дейност според Закона за счетоводството.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activity without registration */}
                <div id="et-without-registration" className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">3.</span>
                    Мога ли да извършвам търговска дейност като физическо лице без да съм официално регистриран като едноличен търговец?
                  </h4>

                  <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8">
                    <p className="text-white/80 leading-relaxed md:text-justify break-words mb-4">
                      Макар много често физическите лица да упражняват търговска дейност без да са регистрирани официално като еднолични търговци, трябва да знаете, че за данъчни цели тези лица се приравняват на еднолични търговци.
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-white font-medium">
                        Това означава, че те облагат своята печалба с <span className="text-primary text-xl font-bold">15%</span> данък.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ET Service */}
                <div id="et-service">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-primary">4.</span>
                    Предлагате ли услуга за регистрация на физическо лице като едноличен търговец?
                  </h4>

                  <div className="bg-gradient-to-br from-primary/10 via-white/5 to-primary/5 border-2 border-primary/20 rounded-2xl p-6 md:p-8">
                    <p className="text-white/80 leading-relaxed md:text-justify break-words mb-4">
                      Нашият екип работи съвместно с висококвалифицирани юристи, които могат да Ви съдействат с всичко необходимо за регистрация на едноличен търговец.
                    </p>
                    <p className="text-white/80 leading-relaxed md:text-justify break-words">
                      За повече информация можете да се свържете с нас на посочения телефон или чрез <ContactLink>контактната форма</ContactLink> на нашия сайт.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        {/* TOC Sidebar - visible on large screens */}
        <aside className="hidden lg:block">
          <div className="sticky top-[140px]">
            <ContentTableOfContents
              items={tocItems}
              onContact={onContact}
              isCollapsed={tocCollapsed}
              onToggleCollapse={() => setTocCollapsed(!tocCollapsed)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
