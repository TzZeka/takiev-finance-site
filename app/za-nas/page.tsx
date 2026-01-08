import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "За нас - Takiev Finance",
  description:
    "Такиев Финанс предлага професионални счетоводни услуги и данъчни консултации. Опитен екип с богата практика в различни бизнес сектори.",
};

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

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
            За нас
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Такиев Финанс предлага професионални счетоводни услуги и данъчни
            консултации за различни бизнеси и физически лица.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Company Description */}
          <section className="prose prose-lg max-w-none">
            <p className="text-lg text-dark/90 leading-relaxed">
              В нашата практика обслужваме широка гама от клиенти, които успешно
              изграждат своя бизнес в различни сектори на икономиката - услуги,
              търговия и производство.
            </p>
          </section>

          {/* Business Sectors */}
          <section className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
              Екипът ни разполага с богат практически опит в счетоводните услуги
              и данъчните консултации за следните бизнес сектори:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessSectors.map((sector, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-dark/90">{sector}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Partnerships */}
          <section>
            <p className="text-lg text-dark/90 leading-relaxed mb-6">
              Компанията работи в партньорски взаимоотношения с високо
              квалифицирани юристи в областта на гражданското, търговското и
              трудовото право.
            </p>
          </section>

          {/* About Nikolay Takiev */}
          <section className="bg-gradient-to-br from-primary/5 to-background rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
              Николай Такиев
            </h2>
            <div className="space-y-4 text-dark/90 leading-relaxed">
              <p>
                Собственик и управител на компанията е Николай Такиев - магистър
                по счетоводство, финанси и бизнес анализ.
              </p>
              <p>
                Николай Такиев е с богат професионален опит в областта на
                данъчното консултиране и счетоводството. Той е автор на редица
                книги, статии и публикации, които подпомагат по-доброто
                познаване на данъчното законодателство от предприемачите.
              </p>
              <p>
                От началото на 2020 година успешно развива дейност като лектор
                на множество професионални обучения и семинари, а през 2021
                година става основател на цялостната професионална програма за
                обучение по данъци и счетоводство към счетоводната академия на
                Finance Academy.
              </p>
              <p>
                Николай е активен външен данъчен консултант на една от водещите
                одиторски компании в страната. Той е автор и на редица статии за
                данъци и счетоводство в професионалния блог на единствената
                платформа за онлайн счетоводен софтуер в България –{" "}
                <a
                  href="https://nula.bg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  NulaBG
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
