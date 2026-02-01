"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Rocket,
  Building2,
  Users,
  UserCog,
  ClipboardList,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountingServicesTabProps {
  onContact?: (packageName?: string) => void;
}

export function AccountingServicesTab({ onContact }: AccountingServicesTabProps) {
  const packages = [
    {
      id: "startup",
      name: "Стартиране на бизнес",
      icon: Rocket,
      description: "Подробна счетоводна консултация при стартиране на собствен бизнес",
      price: "от 50",
      currency: "EUR",
      billingPeriod: "еднократно",
      color: "primary",
      features: [
        "Какъв е процесът за регистрация на дружество?",
        "Кое е по-изгодно – регистрация на дружество или дейност като фрийлансър?",
        "Дължите ли осигуровки при стартиране на бизнес?",
        "Трябва ли да регистрирате по ДДС/OSS?",
        "Как можете да финансирате Вашия бизнес?",
        "Какви доходи може да получавате от Вашия бизнес?",
        "Всякакви други важни въпроси, свързани със стартиране на собствен бизнес",
      ],
    },
    {
      id: "monthly",
      name: "Месечно счетоводно обслужване",
      icon: Building2,
      description: "Цялостно решение за управлението на счетоводството и данъците за Вашия бизнес",
      price: "от 200",
      currency: "EUR",
      billingPeriod: "месец",
      color: "primary",
      features: [
        "Цялостно счетоводно обслужване на дружеството",
        "Данъчни и счетоводни консултации за оптимизация на данъците",
        "Съдействие при проверки и ревизии от контролните органи",
        "Пълно дигитализиране на счетоводните документи и процеси",
        "Неограничен онлайн достъп на клиента до цялата му фирмена документация",
        "Изготвяне и подаване на месечни декларации по ДДС",
        "Изготвяне на ведомости и фишове за заплати на служители",
        "Изготвяне на документи за назначаване и освобождаване на служители",
        "Годишно счетоводно приключване",
        "Изготвяне на управленски отчети (по желание на клиента)",
      ],
    },
    {
      id: "individuals",
      name: "Счетоводство за физически лица",
      icon: Users,
      description: "Пакетът включва една или повече от следните услуги",
      price: "от 50-75",
      currency: "EUR",
      billingPeriod: "еднократно",
      color: "blue",
      features: [
        "Данъчни и счетоводни консултации за физически лица",
        "Изготвяне и подаване на годишна данъчна декларация за ФЛ",
        "Счетоводство на фрийлансъри",
      ],
    },
    {
      id: "chief-accountant",
      name: "Външен главен счетоводител",
      icon: UserCog,
      description: "За компании, които имат нужда от външен консултант, който да подпомага дейността на техния счетоводител",
      price: "от 200",
      currency: "EUR",
      billingPeriod: "месец",
      color: "amber",
      features: [
        "Данъчни и счетоводни консултации",
        "Писмени становища по данъчни и счетоводни казуси",
        "Съдействие при данъчни ревизии и проверки",
        "Корпоративни обучения",
        "Данъчен одит за спазване на приложимото законодателство",
        "Други дейности след предварителна уговорка",
      ],
    },
    {
      id: "hr-consultant",
      name: "Външен ТРЗ консултант",
      icon: ClipboardList,
      description: "За компании, които имат нужда от външен консултант за управление на човешките ресурси",
      price: "от 200",
      currency: "EUR",
      billingPeriod: "месец",
      color: "violet",
      features: [
        "Изготвяне на документи за назначаване и освобождаване на служители",
        "Администриране на граждански договори",
        "Изчисляване на заплати и осигуровки",
        "Изготвяне на ведомости и фишове за заплати",
        "Деклариране на данъци и осигуровки чрез Декларации обр. 1 и обр. 6",
        "Изготвяне на платежни нареждания за данъци и осигуровки",
        "Изготвяне на справки, удостоверения и служебни бележки",
        "Подаване на болнични листове в НОИ",
        "Трудово-правни и осигурителни консултации",
      ],
    },
  ];

  const colorClasses = {
    primary: {
      bg: "from-primary/20 to-primary/10",
      iconBg: "bg-primary/30",
      iconColor: "text-primary",
      border: "border-primary/30",
      checkBg: "bg-primary/20",
      checkColor: "text-primary",
      button: "bg-primary/90 hover:bg-primary",
    },
    blue: {
      bg: "from-blue-500/20 to-blue-500/10",
      iconBg: "bg-blue-500/30",
      iconColor: "text-blue-400",
      border: "border-blue-500/30",
      checkBg: "bg-blue-500/20",
      checkColor: "text-blue-400",
      button: "bg-blue-500/90 hover:bg-blue-500",
    },
    amber: {
      bg: "from-amber-500/20 to-amber-500/10",
      iconBg: "bg-amber-500/30",
      iconColor: "text-amber-400",
      border: "border-amber-500/30",
      checkBg: "bg-amber-500/20",
      checkColor: "text-amber-400",
      button: "bg-amber-500/90 hover:bg-amber-500",
    },
    violet: {
      bg: "from-violet-500/20 to-violet-500/10",
      iconBg: "bg-violet-500/30",
      iconColor: "text-violet-400",
      border: "border-violet-500/30",
      checkBg: "bg-violet-500/20",
      checkColor: "text-violet-400",
      button: "bg-violet-500/90 hover:bg-violet-500",
    },
  };

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
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-xl hidden sm:block">
              <Calculator className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-white/90 text-lg leading-relaxed">
                Стартирането на собствен бизнес е свързано с избор на квалифициран счетоводител. Това е важна стъпка за развитието на всеки успешен бизнес, а ролята на счетоводителя е ключова, за да бъде всичко в синхрон.
              </p>
              <p className="text-white/70 leading-relaxed">
                Счетоводителят консултира своите клиенти по редица въпроси, свързани с данъчното, счетоводното и трудовото законодателство като им дава надеждна и адекватна обратна връзка за развитието на техния бизнес.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Добрият счетоводител е отличен консултант.</strong> Това, което ни отличава от нашите конкуренти е умението ни да разговаряме с всеки наш клиент на разбираем и достъпен език.
              </p>
              <p className="text-white/70 leading-relaxed">
                Основната ни цел която си поставяме е да осигурим <strong className="text-white">качествена и навременна информация</strong> за нашите клиенти.
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
          Нашият екип предлага експертни счетоводни услуги в следните пакети:
        </h3>
      </motion.div>

      {/* Pricing Cards */}
      <div className="space-y-8 mb-12">
        {packages.map((pkg, index) => {
          const colors = colorClasses[pkg.color as keyof typeof colorClasses];
          const Icon = pkg.icon;

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="relative rounded-2xl border-2 overflow-hidden transition-all duration-300 border-white/10 bg-white/5 hover:border-white/20"
            >
              {/* Header */}
              <div className={cn("p-4 md:p-6 border-b border-white/10 bg-gradient-to-r", colors.bg)}>
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", colors.iconBg)}>
                    <Icon className={cn("w-6 h-6", colors.iconColor)} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl md:text-2xl font-bold text-white">
                      Пакет „{pkg.name}"
                    </h4>
                    <p className="text-white/60 text-sm mt-1">
                      {pkg.description}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="flex items-baseline gap-1">
                      <span className={cn("text-3xl md:text-4xl font-bold", colors.iconColor)}>
                        {pkg.price}
                      </span>
                      <span className="text-white/60 text-lg">{pkg.currency}</span>
                    </div>
                    <span className="text-white/50 text-sm">/ {pkg.billingPeriod}</span>
                  </div>
                </div>
                {/* Mobile price */}
                <div className="mt-4 sm:hidden">
                  <div className="flex items-baseline gap-1">
                    <span className={cn("text-2xl font-bold", colors.iconColor)}>
                      {pkg.price}
                    </span>
                    <span className="text-white/60">{pkg.currency}</span>
                    <span className="text-white/50 text-sm">/ {pkg.billingPeriod}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <p className="text-white/50 text-xs mb-4 font-medium uppercase tracking-wide">
                  Пакетът включва:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.03 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className={cn("flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5", colors.checkBg)}>
                        <Check className={cn("w-3 h-3", colors.checkColor)} />
                      </div>
                      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-white/50 text-sm">
                    Цена: <span className={cn("font-semibold", colors.iconColor)}>{pkg.price} {pkg.currency}</span> / {pkg.billingPeriod}
                  </div>
                  <button
                    onClick={() => onContact?.(pkg.name)}
                    className={cn(
                      "inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-300 group",
                      colors.button
                    )}
                  >
                    Заяви пакет
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 rounded-2xl p-6 md:p-8 text-center"
      >
        <p className="text-white/80 max-w-2xl mx-auto">
          За повече информация относно счетоводните услуги, които предлагаме, можете да се свържете с нас чрез <ContactLink>контактната форма</ContactLink> или на посочения телефон за връзка.
        </p>
      </motion.div>
    </div>
  );
}
