// @ts-check
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    }),
);

const url = env["NEXT_PUBLIC_SUPABASE_URL"];
// Use service role key to bypass RLS
const key = env["SUPABASE_SERVICE_ROLE_KEY"] || env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

if (!url || !key) {
  console.error(
    "❌  Не найдены NEXT_PUBLIC_SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY в .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── CASES ──────────────────────────────────────────────────────────────────

const cases = [
  {
    title: "Штампы для автомобильных панелей",
    slug: "automotive-body-panels",
    description:
      "Разработка и производство комплекта штампов для штамповки кузовных панелей легковых автомобилей",
    client: "АвтоВАЗ",
    industry: "automotive",
    services: ["stamps", "design"],
    challenge:
      "Необходимо было создать штампы для серийного производства с точностью до 0.02 мм и ресурсом более 1 млн циклов",
    solution:
      "Применили современные методы 3D-моделирования и использовали инструментальную сталь с термообработкой",
    results:
      "Достигнута точность 0.015 мм, ресурс превысил 1.5 млн циклов, запуск производства в срок",
    status: "published",
    featured: true,
  },
  {
    title: "Пресс-формы для электронных корпусов",
    slug: "electronics-housings",
    description: "Изготовление многоместных пресс-форм для корпусов электронных устройств",
    client: "Ростелеком",
    industry: "electronics",
    services: ["molds", "design"],
    challenge: "Требовалась высокая детализация поверхности и минимальный облой при литье пластика",
    solution: "Разработали пресс-форму с горячеканальной системой и оптимизированным охлаждением",
    results: "Снижение брака на 40%, увеличение производительности на 25%",
    status: "published",
    featured: true,
  },
  {
    title: "Штамповая оснастка для бытовой техники",
    slug: "appliances-tooling",
    description:
      "Комплексная разработка штамповой оснастки для производства деталей стиральных машин",
    client: "Haier",
    industry: "appliances",
    services: ["stamps", "molds", "design"],
    challenge: "Необходимо было обеспечить взаимозаменяемость с европейскими аналогами",
    solution:
      "Провели реверс-инжиниринг и создали модернизированную оснастку с улучшенными характеристиками",
    results: "Полная совместимость достигнута, стоимость ниже импортных аналогов на 35%",
    status: "published",
    featured: false,
  },
  {
    title: "Ремонт штампов для аэрокосмической отрасли",
    slug: "aerospace-repair",
    description:
      "Восстановление и модернизация штамповой оснастки для производства авиационных компонентов",
    client: "ОАК",
    industry: "aerospace",
    services: ["repair", "design"],
    challenge: "Критически важные штампы требовали срочного ремонта без остановки производства",
    solution: "Организовали работу в две смены, применили технологию лазерной наплавки",
    results: "Ремонт завершён за 5 дней вместо планируемых 14, ресурс восстановлен на 100%",
    status: "published",
    featured: true,
  },
];

// ─── ARTICLES ────────────────────────────────────────────────────────────────

const articles = [
  {
    title: "Современные материалы для штамповой оснастки",
    slug: "modern-tooling-materials",
    excerpt:
      "Обзор инновационных материалов, применяемых в производстве штампов и пресс-форм в 2024 году",
    content: "<p>Полный текст статьи о современных материалах для штамповой оснастки...</p>",
    category: "Технологии",
    status: "published",
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    author: "Редакция",
  },
  {
    title: "Как выбрать подрядчика для изготовления штампов",
    slug: "how-to-choose-tooling-contractor",
    excerpt:
      "Практическое руководство по выбору надёжного партнёра для производства штамповой оснастки",
    content: "<p>Полный текст статьи о выборе подрядчика...</p>",
    category: "Руководства",
    status: "published",
    published_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    author: "Редакция",
  },
  {
    title: "Тренды в автоматизации штамповочного производства",
    slug: "automation-trends-2024",
    excerpt: "Анализ ключевых направлений автоматизации и цифровизации в штамповочной отрасли",
    content: "<p>Полный текст статьи о трендах автоматизации...</p>",
    category: "Аналитика",
    status: "published",
    published_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    author: "Редакция",
  },
];

// ─── EQUIPMENT ───────────────────────────────────────────────────────────────

const equipment = [
  {
    name: "Координатно-измерительная машина Zeiss",
    category: "Измерительное оборудование",
    description: "Высокоточная КИМ для контроля геометрии деталей",
    specifications: {
      accuracy: "0.001 мм",
      range: "1200x1000x800 мм",
      year: 2023,
    },
    sort_order: 1,
  },
  {
    name: "Электроэрозионный станок Sodick",
    category: "Обрабатывающие центры",
    description: "Проволочно-вырезной станок для изготовления сложных профилей",
    specifications: {
      accuracy: "0.002 мм",
      wire_diameter: "0.1-0.3 мм",
      year: 2022,
    },
    sort_order: 2,
  },
  {
    name: "Фрезерный центр DMG Mori",
    category: "Обрабатывающие центры",
    description: "5-осевой обрабатывающий центр для изготовления матриц и пуансонов",
    specifications: {
      spindle_speed: "20000 об/мин",
      accuracy: "0.003 мм",
      year: 2023,
    },
    sort_order: 3,
  },
  {
    name: "Гидравлический пресс 400 тонн",
    category: "Прессовое оборудование",
    description: "Пресс для испытания и отладки штамповой оснастки",
    specifications: {
      force: "400 тонн",
      table_size: "2000x1500 мм",
      year: 2021,
    },
    sort_order: 4,
  },
];

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

const siteSettings = [
  {
    key: "company_info",
    value: {
      name: "ШтампИндустрия",
      tagline: "Изготовление штампов и пресс-форм",
      phone: "+7 (495) 123-45-67",
      email: "info@stampindustry.ru",
      address: "г. Москва, ул. Промышленная, д. 15",
    },
  },
  {
    key: "social_links",
    value: {
      telegram: "https://t.me/stampindustry",
      vk: "https://vk.com/stampindustry",
      youtube: "https://youtube.com/@stampindustry",
    },
  },
  {
    key: "hero_stats",
    value: {
      years: "15+",
      projects: "800+",
      clients: "200+",
      equipment: "50+",
    },
  },
];

// ─── SEED ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Начало заполнения базы данных...\n");

  const { error: casesError } = await supabase.from("cases").upsert(cases, { onConflict: "slug" });
  if (casesError) {
    console.error("❌ Ошибка при вставке кейсов:", casesError.message);
  } else {
    console.log(`✅ Кейсы: ${cases.length} записей`);
  }

  const { error: articlesError } = await supabase
    .from("articles")
    .upsert(articles, { onConflict: "slug" });
  if (articlesError) {
    console.error("❌ Ошибка при вставке статей:", articlesError.message);
  } else {
    console.log(`✅ Статьи: ${articles.length} записей`);
  }

  const { error: equipmentError } = await supabase
    .from("equipment")
    .upsert(equipment, { onConflict: "name" });
  if (equipmentError) {
    console.error("❌ Ошибка при вставке оборудования:", equipmentError.message);
  } else {
    console.log(`✅ Оборудование: ${equipment.length} записей`);
  }

  const { error: settingsError } = await supabase
    .from("site_settings")
    .upsert(siteSettings, { onConflict: "key" });
  if (settingsError) {
    console.error("❌ Ошибка при вставке настроек:", settingsError.message);
  } else {
    console.log(`✅ Настройки сайта: ${siteSettings.length} записей`);
  }

  console.log("\n✨ Готово!");
}

seed().catch(console.error);
