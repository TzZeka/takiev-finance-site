# Takiev Finance Website

Професионален уебсайт за счетоводна компания "Такиев Финанс" с Next.js 15, TypeScript, Tailwind CSS и Sanity CMS.

## Технологичен стек

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **CMS**: Sanity (Headless CMS)
- **Email**: Resend API
- **Хостинг**: Vercel
- **Styling**: Tailwind CSS с custom brand цветове

## Характеристики

- ✅ SEO оптимизиран
- ✅ Responsive дизайн (mobile-first)
- ✅ Бърза производителност (Server Components)
- ✅ TypeScript за type safety
- ✅ Headless CMS управление на съдържание
- ✅ Контактна форма с email интеграция
- ✅ Блог със статии
- ✅ Видео интеграция (YouTube & TikTok)
- ✅ Динамични страници за услуги

## Структура на проекта

```
takiev-finance-site/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── za-nas/            # За нас
│   ├── uslugi/            # Услуги (overview + dynamic)
│   ├── blog/              # Блог (list + dynamic)
│   ├── video/             # Видео
│   ├── kontakti/          # Контакти
│   └── api/               # API Routes
├── components/            # React компоненти
│   ├── layout/           # Header, Footer, Navigation
│   ├── home/             # Homepage секции
│   ├── shared/           # Споделени компоненти
│   └── ui/               # shadcn/ui компоненти
├── lib/                  # Utilities
│   ├── sanity/          # Sanity клиент и queries
│   ├── utils.ts         # Helper функции
│   └── email.ts         # Resend конфигурация
├── sanity/              # Sanity Studio
│   └── schemas/         # Content schemas
├── types/               # TypeScript типове
└── public/              # Статични файлове
```

## Първоначален Setup

### 1. Клониране на проекта

```bash
git clone <repository-url>
cd takiev-finance-site
```

### 2. Инсталиране на dependencies

```bash
npm install
```

### 3. Конфигуриране на environment variables

Създайте `.env.local` файл в root директорията:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token

# Resend Email API
RESEND_API_KEY=your_resend_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://takiev.bg
CONTACT_EMAIL=office@takiev.bg
```

### 4. Setup Sanity CMS

#### Създаване на Sanity проект:

1. Отидете на [sanity.io](https://www.sanity.io/) и създайте акаунт
2. Създайте нов проект
3. Копирайте Project ID и добавете го в `.env.local`

#### Стартиране на Sanity Studio локално:

```bash
cd sanity
npm install
npm run dev
```

Sanity Studio ще бъде достъпно на: `http://localhost:3333`

#### Deploy на Sanity Studio:

```bash
cd sanity
npm run deploy
```

### 5. Setup Resend Email

1. Отидете на [resend.com](https://resend.com/) и създайте акаунт
2. Създайте API key
3. Добавете API key в `.env.local`

### 6. Добавяне на лого

Добавете логото на компанията в `public/firm-logo/logo.png`

## Development

### Стартиране на dev server:

```bash
npm run dev
```

Сайтът ще бъде достъпен на: `http://localhost:3000`

### Стартиране на Sanity Studio:

```bash
cd sanity
npm run dev
```

## Build и Deployment

### Build за production:

```bash
npm run build
npm start
```

### Deploy на Vercel:

1. Push кода в GitHub repository
2. Свържете repository с Vercel
3. Конфигурирайте environment variables във Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy автоматично ще се стартира

## Управление на съдържание

### Sanity Studio

Достъпете Sanity Studio на: `https://your-project.sanity.studio` или локално на `http://localhost:3333`

#### Налични Content Types:

1. **Услуги (Services)** - Управление на услуги и пакети
2. **Блог Статии (Blog Posts)** - Публикуване на статии
3. **Автори (Authors)** - Информация за автори
4. **Клиентски мнения (Testimonials)** - Отзиви от клиенти
5. **Клиенти и Партньори (Clients)** - Клиентски лога
6. **Видео (Videos)** - YouTube и TikTok видеа
7. **Начална Страница (Home Content)** - Съдържание за homepage

## Цветова схема

- **Primary (Тюркоазно)**: `#19BFB7`
- **Dark**: `#40514E`
- **White**: `#FFFFFF`

## Страници

- **Начало** (`/`) - Hero, послания, услуги, блог, testimonials, клиенти, форма
- **За нас** (`/za-nas`) - За компанията, екип, експертиза
- **Услуги** (`/uslugi`) - Преглед на всички услуги по категории
- **Услуга детайли** (`/uslugi/[slug]`) - Детайлна информация за услуга
- **Блог** (`/blog`) - Списък със статии
- **Блог статия** (`/blog/[slug]`) - Пълна статия
- **Видео** (`/video`) - YouTube и TikTok видеа
- **Контакти** (`/kontakti`) - Контактна информация и форма

## Следващи стъпки

1. ✅ Добавете реално съдържание в Sanity Studio
2. ✅ Качете логото на компанията
3. ✅ Конфигурирайте Resend за email
4. ✅ Deploy на Vercel
5. ✅ Свържете custom домейн
6. ✅ Setup Google Analytics (опционално)
7. ✅ Setup Google Search Console

## Support

За въпроси и поддръжка, моля свържете се с development екипа.

---

Създадено с Next.js 15, TypeScript и Sanity CMS
