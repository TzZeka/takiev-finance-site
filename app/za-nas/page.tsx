"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Award, BookOpen, Users, Target, Briefcase } from "lucide-react";
import { ProfessionalJourney } from "@/components/about/ProfessionalJourney";

const businessSectors = [
  "Електронна търговия и дропшипинг бизнес",
  "Маркетингови и консултантски услуги",
  "Технологичен сектор (ИТ сектор)",
  "Строителство и инвестиции в недвижими имоти",
  "Фрийлансъри на свободна практика",
  "Краткосрочно отдаване под наем през Airbnb и Booking",
  "Лечебни заведения за извънболнична помощ",
  "Творчески индустрии",
  "Търговия с финансови инструменти – акции, облигации, криптовалути, деривати и други видове инвестиции",
];

const teamMembers = [
  {
    name: "Мария Петрова",
    role: "Старши счетоводител",
    education: "Бакалавър по счетоводство и контрол",
    image: null,
    bio: "Над 12 години опит в счетоводното обслужване на МСП. Специалист по оптимизация на данъчни задължения и финансово отчитане по МСФО.",
    specialties: ["Корпоративно счетоводство", "МСФО", "Данъчна оптимизация"],
  },
  {
    name: "Иван Георгиев",
    role: "Данъчен консултант",
    education: "Магистър по данъци и данъчна администрация",
    image: null,
    bio: "Специализиран в ДДС и корпоративно данъчно облагане. Консултант при сложни данъчни казуси и междуфирмени транзакции.",
    specialties: ["ДДС консултации", "Корпоративни данъци", "Трансферно ценообразуване"],
  },
  {
    name: "Елена Димитрова",
    role: "Мениджър Клиентски услуги",
    education: "Бакалавър по бизнес администрация",
    image: null,
    bio: "Отговаря за изграждането на дългосрочни партньорства с клиенти и координацията на счетоводните процеси за оптимална ефективност.",
    specialties: ["Клиентско обслужване", "Процесна оптимизация", "Управление на проекти"],
  },
];

const values = [
  {
    icon: Award,
    title: "Професионализъм",
    description: "Високи стандарти в счетоводното обслужване",
  },
  {
    icon: Users,
    title: "Партньорство",
    description: "Дългосрочни взаимоотношения с клиентите",
  },
  {
    icon: BookOpen,
    title: "Експертиза",
    description: "Дълбочинни познания и практически опит",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Header Section */}
      <section className="relative h-[250px] overflow-hidden bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/firm-logo/with-padding.png"
            alt="Takiev Finance"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              За нас
            </h1>
            <p className="text-xl text-foreground/80">
              Вашият доверен партньор в света на финансите от 2009 година
            </p>
          </motion.div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="h-2 bg-gradient-to-r from-primary via-primary/50 to-primary" />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Company Mission */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Мисия и визия
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Такиев Финанс предлага професионални счетоводни услуги и данъчни
            консултации за различни бизнеси и физически лица. В нашата практика
            обслужваме широка гама от клиенти, които успешно изграждат своя бизнес
            в различни сектори на икономиката.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Компанията работи в партньорски взаимоотношения с високо квалифицирани
            юристи в областта на гражданското, търговското и трудовото право.
          </p>
        </motion.section>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Нашите ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card rounded-xl p-6 text-center shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Founder Section - Nikolay Takiev */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-br from-card via-primary/5 to-card rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-32 -translate-x-32 blur-3xl" />

              {/* Content */}
              <div className="relative grid md:grid-cols-2 gap-12 p-8 md:p-12">
                {/* Left side - Image */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    {/* Rotating decorative border */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 -m-8"
                    >
                      <div className="w-full h-full rounded-full border-4 border-dashed border-primary/30" />
                    </motion.div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 blur-2xl" />

                    {/* Profile image */}
                    <div className="relative w-80 h-80 rounded-full overflow-hidden ring-8 ring-foreground shadow-2xl">
                      <Image
                        src="/firm-logo/nikolay-takiev.jpg"
                        alt="Николай Такиев"
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>

                    {/* Decorative accents */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full shadow-lg" />
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary/70 rounded-full shadow-lg" />
                    <div className="absolute top-1/2 -right-6 w-6 h-6 bg-primary/50 rounded-full" />
                  </div>
                </div>

                {/* Right side - Info */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                      <Award className="w-4 h-4" />
                      Основател и Собственик
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                      Николай Такиев
                    </h2>
                    <p className="text-xl text-primary font-semibold mb-6">
                      Магистър по счетоводство, финанси и бизнес анализ
                    </p>

                    <div className="space-y-4 text-foreground/80 leading-relaxed mb-6">
                      <p>
                        Експерт в данъчното консултиране със специализация в международно данъчно облагане и корпоративно счетоводство.
                      </p>
                      <p>
                        Автор на множество книги, статии и публикации, които подпомагат по-доброто познаване на данъчното законодателство от предприемачите.
                      </p>
                      <p>
                        От 2020 година успешно развива дейност като лектор на множество професионални обучения и семинари, а през 2021 година става основател на цялостната професионална програма за обучение по данъци и счетоводство към счетоводната академия на Finance Academy.
                      </p>
                      <p>
                        Активен външен данъчен консултант на една от водещите одиторски компании в страната и автор на редица статии в професионалния блог на{" "}
                        <a
                          href="https://nula.bg/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold"
                        >
                          NulaBG
                        </a>
                        .
                      </p>
                    </div>

                    {/* Expertise badges */}
                    <div className="flex flex-wrap gap-2">
                      {["Данъчни консултации", "Бизнес анализ", "Финансово планиране", "Обучения"].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 bg-card text-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-primary/20"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="h-3 bg-gradient-to-r from-primary via-primary/70 to-primary" />
            </div>
          </div>
        </motion.section>

        {/* Professional Journey - Scrollytelling Section */}
        <ProfessionalJourney />

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Нашият екип
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Професионалисти с богат опит и експертиза в счетоводството и данъчното консултиране
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl">
                  {/* Decorative corner ornaments */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary/20 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary/20 rounded-br-2xl" />

                  <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      {/* Profile Image with ornamental frame */}
                      <div className="relative mb-6">
                        {/* Outer decorative ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 -m-4"
                        >
                          <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30" />
                        </motion.div>

                        {/* Inner glow ring */}
                        <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-md" />

                        {/* Profile picture */}
                        <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-foreground shadow-xl">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="160px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                              <span className="text-5xl font-bold text-white">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Decorative dots */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full" />
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary/60 rounded-full" />
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-primary font-semibold mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground italic mb-4">
                        {member.education}
                      </p>
                    </div>

                    <p className="text-foreground/80 leading-relaxed mb-6 text-center">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          <Briefcase className="w-3 h-3" />
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-2 bg-gradient-to-r from-primary via-primary/50 to-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Business Sectors */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 rounded-2xl p-8 md:p-12 shadow-xl border-2 border-primary/10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Експертиза в разнообразни бизнес сектори
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Екипът ни разполага с богат практически опит в счетоводните услуги и данъчните консултации за следните области:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessSectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start space-x-3 bg-card p-4 rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{sector}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
