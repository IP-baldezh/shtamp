# Штамп — сайт завода штампов и пресс-форм

Корпоративный сайт с публичной частью, блогом, портфолио и CMS-админкой на базе **Next.js 15 + Supabase**.

## Технологический стек

| Слой              | Технология                                        |
| ----------------- | ------------------------------------------------- |
| Фреймворк         | Next.js 15 (App Router, Turbopack)                |
| База данных       | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| UI                | Tailwind CSS v4 + shadcn/ui                       |
| Формы             | react-hook-form + Zod                             |
| Редактор          | Tiptap                                            |
| Графики           | Recharts                                          |
| Анимации          | Motion                                            |
| Тесты             | Vitest + Testing Library                          |
| Линтер / формат   | ESLint + Prettier                                 |
| Git-хуки          | Husky + lint-staged                               |
| Пакетный менеджер | pnpm                                              |

---

## Быстрый старт (с нуля)

### 1. Клонируй репозиторий

```bash
git clone https://github.com/IP-baldezh/shtamp.git
cd shtamp
```

### 2. Установи зависимости

```bash
pnpm install
```

> Если `pnpm` не установлен: `npm install -g pnpm`

### 3. Создай проект в Supabase

1. Открой [supabase.com](https://supabase.com) → **New project**
2. Запомни: **Project URL** и **anon key** (раздел Settings → API)
3. Также сохрани **service_role key** — нужен для seed-скрипта

### 4. Настрой переменные окружения

Создай файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

> **Никогда** не коммить `.env.local` — он уже добавлен в `.gitignore`.

### 5. Создай таблицы в базе данных

Открой **Supabase Dashboard → SQL Editor** и выполни скрипты **по порядку**:

```
scripts/001_create_tables.sql   — таблицы, типы, RLS-политики
scripts/002_seed_data.sql       — опционально: статичные справочные данные
scripts/003_storage_setup.sql   — бакет "media" для изображений
scripts/004_security_fixes.sql  — исправления Security Advisor
```

Скопируй содержимое каждого файла → вставь в SQL Editor → **Run**.

### 6. Заполни базу тестовыми данными

```bash
pnpm seed
```

Скрипт создаст:

- 4 кейса портфолио
- 3 статьи блога
- 4 записи оборудования
- 3 записи настроек сайта

Скрипт идемпотентен — повторный запуск не создаёт дубли.

### 7. Запусти проект

```bash
pnpm dev
```

Открой [http://localhost:3000](http://localhost:3000).

---

## Структура проекта

```
app/
  page.tsx                 — главная страница
  about/                   — о компании
  articles/                — блог
  cases/                   — портфолио
  contact/                 — форма обратной связи
  equipment/               — оборудование
  industries/              — отрасли
  quote/                   — запрос коммерческого предложения
  services/                — услуги
  admin/                   — CMS-панель (защищена авторизацией)
    articles/              — управление статьями
    cases/                 — управление кейсами
    equipment/             — управление оборудованием
    quotes/                — входящие запросы КП
    requests/              — заявки с форм
    settings/              — настройки сайта
components/
  admin/                   — компоненты CMS
  layout/                  — шапка и подвал
  sections/                — блоки главной страницы
  ui/                      — shadcn/ui + кастомные компоненты
lib/
  supabase/                — клиент Supabase (server / client)
  validation/              — Zod-схемы форм
  fraud-protection.ts      — защита от ботов (honeypot, rate limit, timing)
scripts/
  001_create_tables.sql    — DDL
  002_seed_data.sql        — справочные данные
  003_storage_setup.sql    — Storage bucket
  004_security_fixes.sql   — Security Advisor fixes
  seed.mjs                 — заполнение тестовыми данными
  setup.mjs                — полный setup через Management API
tests/
  unit/                    — unit-тесты (Zod, утилиты, fraud protection)
  components/              — RTL-тесты компонентов
```

---

## Авторизация в CMS

Для доступа к `/admin` нужна учётная запись Supabase Auth:

1. Открой **Supabase Dashboard → Authentication → Users**
2. Нажми **Add user** → укажи email и пароль
3. Открой [http://localhost:3000/admin/login](http://localhost:3000/admin/login) и войди

---

## Полезные команды

```bash
pnpm dev              # запуск сервера разработки
pnpm build            # production-сборка
pnpm start            # запуск production-сборки

pnpm lint             # проверка ESLint
pnpm lint:fix         # автоисправление ESLint
pnpm format           # форматирование Prettier
pnpm format:check     # проверка форматирования

pnpm test             # тесты в режиме watch
pnpm test:run         # однократный прогон тестов
pnpm test:coverage    # отчёт о покрытии

pnpm seed             # заполнить базу тестовыми данными
pnpm setup            # полный setup через Management API
```

---

## Git-хуки

Настроены автоматически через Husky:

- **pre-commit** — `lint-staged`: форматирует и линтует только изменённые файлы
- **pre-push** — `pnpm test:run`: полный прогон тестов перед отправкой

---

## Переменные окружения

| Переменная                      | Описание                                        | Обязательна |
| ------------------------------- | ----------------------------------------------- | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL Supabase-проекта                            | ✅          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Публичный anon-ключ                             | ✅          |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service role ключ (только для `pnpm seed`)      | для seed    |
| `SUPABASE_ACCESS_TOKEN`         | Personal access token (только для `pnpm setup`) | для setup   |
