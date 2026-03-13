import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Общи условия | Takiev Finance",
  description: "Общи условия за ползване на услугите на Takiev Finance ЕООД.",
  alternates: { canonical: "https://takiev.bg/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-950 pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary/70 mb-3">
            Правна информация
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Общи условия
          </h1>
          <p className="mt-3 text-white/40 text-sm">
            Последна актуализация: януари 2025 г.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">1. Общи разпоредби</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Настоящите общи условия уреждат взаимоотношенията между <strong>Takiev Finance ЕООД</strong>,
            ЕИК 206666484, със седалище и адрес на управление: гр. София, бул. „Александър Стамболийски" 30Б
            (наричано по-долу „Дружеството"), и лицата, които използват уебсайта <strong>takiev.bg</strong>
            и/или ползват предоставяните от него услуги (наричани по-долу „Потребители").
          </p>
          <p className="text-slate-600 leading-relaxed text-sm mt-3">
            С използването на уебсайта Потребителят декларира, че е запознат с настоящите Общи условия
            и се задължава да ги спазва.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">2. Предмет на услугите</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Takiev Finance ЕООД предоставя професионални счетоводни услуги, данъчни консултации,
            правни услуги и услуги по регистрация на фирми. Информацията, публикувана на уебсайта,
            е с общ информационен характер и не представлява правна или данъчна консултация,
            освен ако не е договорено изрично между страните.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">3. Права и задължения на потребителите</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Потребителите имат право на достъп до публичното съдържание на уебсайта.</li>
            <li>Забранено е копирането, разпространението или използването на съдържанието без изрично писмено разрешение.</li>
            <li>Потребителите се задължават да не нарушават нормалното функциониране на уебсайта.</li>
            <li>При подаване на запитване Потребителят гарантира, че предоставените данни са верни и актуални.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">4. Интелектуална собственост</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Всички материали на уебсайта — текстове, изображения, графики, лога и дизайн — са
            собственост на Takiev Finance ЕООД или на трети лица, предоставили право за използването им.
            Всяко неразрешено използване представлява нарушение на авторски права.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">5. Ограничаване на отговорността</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Дружеството не носи отговорност за преки или косвени вреди, произтичащи от ползването или
            невъзможността за ползване на уебсайта. Информацията се предоставя „в настоящото й
            състояние" без гаранции за пълнота или точност.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">6. Приложимо право и спорове</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Настоящите Общи условия се уреждат от законодателството на Република България.
            Всички спорове се разрешават по взаимно съгласие, а при невъзможност — от компетентния
            български съд.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">7. Промени в условията</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Дружеството си запазва правото да актуализира настоящите Общи условия по всяко време.
            Промените влизат в сила от датата на публикуването им на уебсайта.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">8. Контакт</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            За въпроси, свързани с настоящите Общи условия, можете да се свържете с нас на:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>Имейл: <a href="mailto:office@takiev.bg" className="text-primary hover:underline">office@takiev.bg</a></li>
            <li>Телефон: <a href="tel:+359899080016" className="text-primary hover:underline">+359 89 908 0016</a></li>
          </ul>
        </section>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
          <Link href="/privacy" className="text-sm text-primary hover:underline">
            Политика за поверителност →
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
            Обратно към началото
          </Link>
        </div>
      </div>
    </main>
  );
}
