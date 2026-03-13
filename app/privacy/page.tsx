import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика за поверителност | Takiev Finance",
  description: "Политика за поверителност и защита на личните данни на Takiev Finance ЕООД.",
  alternates: { canonical: "https://takiev.bg/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-950 pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary/70 mb-3">
            Правна информация
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Политика за поверителност
          </h1>
          <p className="mt-3 text-white/40 text-sm">
            Последна актуализация: януари 2025 г.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">1. Администратор на лични данни</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            <strong>Takiev Finance ЕООД</strong>, ЕИК 206666484, гр. София,
            бул. „Александър Стамболийски" 30Б, е администратор на лични данни по смисъла на
            Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на личните данни.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>Имейл: <a href="mailto:office@takiev.bg" className="text-primary hover:underline">office@takiev.bg</a></li>
            <li>Телефон: <a href="tel:+359899080016" className="text-primary hover:underline">+359 89 908 0016</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">2. Какви данни събираме</h2>
          <p className="text-slate-600 leading-relaxed text-sm mb-3">
            При използване на контактната форма на уебсайта събираме следните данни:
          </p>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Три имена (задължително)</li>
            <li>Електронен адрес (задължително)</li>
            <li>Телефонен номер (по желание)</li>
            <li>Наименование на фирма (по желание)</li>
            <li>Тема и съдържание на запитването</li>
          </ul>
          <p className="text-slate-600 leading-relaxed text-sm mt-3">
            При посещение на уебсайта автоматично се събират технически данни — IP адрес, тип браузър,
            посетени страници — единствено с цел подобряване на функционалността.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">3. Цели на обработването</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Отговор на изпратени запитвания и предоставяне на информация за услугите ни.</li>
            <li>Сключване и изпълнение на договор за счетоводни и консултантски услуги.</li>
            <li>Спазване на законови задължения (данъчно и счетоводно законодателство).</li>
            <li>Подобряване на уебсайта и потребителското изживяване.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">4. Правно основание</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Обработваме Вашите данни въз основа на: (а) Вашето изрично съгласие при подаване на
            запитване; (б) изпълнение на договор, по който сте страна; (в) спазване на законово
            задължение; (г) легитимен интерес на Дружеството.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">5. Срок на съхранение</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Данните, свързани с договорни отношения, се съхраняват съгласно изискванията на
            счетоводното и данъчното законодателство (до 10 години). Данните от запитвания без
            последваща договорна връзка се изтриват в срок до 12 месеца.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">6. Споделяне с трети страни</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Не продаваме и не предоставяме личните Ви данни на трети страни за търговски цели.
            Данните могат да бъдат предоставени единствено на: доставчици на технически услуги
            (хостинг, имейл), когато това е необходимо за обработката, и на компетентни органи
            при законово задължение.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">7. Вашите права</h2>
          <p className="text-slate-600 leading-relaxed text-sm mb-3">
            Съгласно GDPR имате следните права:
          </p>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li><strong>Право на достъп</strong> — да получите копие от Вашите данни.</li>
            <li><strong>Право на коригиране</strong> — да поискате корекция на неточни данни.</li>
            <li><strong>Право на изтриване</strong> — „право да бъдете забравени".</li>
            <li><strong>Право на ограничаване</strong> — да ограничите обработването.</li>
            <li><strong>Право на преносимост</strong> — да получите данните в структуриран формат.</li>
            <li><strong>Право на възражение</strong> — срещу обработване въз основа на легитимен интерес.</li>
            <li><strong>Право на оттегляне на съгласие</strong> — по всяко време, без да засяга законосъобразността на предходното обработване.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed text-sm mt-3">
            За упражняване на правата си се свържете с нас на{" "}
            <a href="mailto:office@takiev.bg" className="text-primary hover:underline">office@takiev.bg</a>.
            Имате право и да подадете жалба до Комисията за защита на личните данни (КЗЛД) на адрес:
            гр. София, бул. „Проф. Цветан Лазаров" № 2.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">8. Бисквитки (Cookies)</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Уебсайтът използва технически необходими бисквитки за нормалното му функциониране и
            аналитични бисквитки (Vercel Analytics) за анонимна статистика за посещаемостта.
            Не се използват бисквитки за маркетингово профилиране.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">9. Промени в политиката</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            При промени в настоящата политика ще публикуваме актуализираната версия на тази страница
            с нова дата. Препоръчваме периодична проверка.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
          <Link href="/terms" className="text-sm text-primary hover:underline">
            Общи условия →
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
            Обратно към началото
          </Link>
        </div>
      </div>
    </main>
  );
}
