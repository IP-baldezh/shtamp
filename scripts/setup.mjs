// @ts-check
/**
 * Full setup: creates tables via Supabase Management API, then seeds data.
 * Requires SUPABASE_ACCESS_TOKEN in .env.local
 * Get one at: https://supabase.com/dashboard/account/tokens
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ─── Load .env.local ─────────────────────────────────────────────────────────
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

const supabaseUrl = env["NEXT_PUBLIC_SUPABASE_URL"];
const anonKey = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
const accessToken = env["SUPABASE_ACCESS_TOKEN"];

if (!supabaseUrl || !anonKey) {
  console.error("❌  Не найдены NEXT_PUBLIC_SUPABASE_URL или NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}
if (!accessToken) {
  console.error(
    "❌  Не найден SUPABASE_ACCESS_TOKEN в .env.local\n" +
      "    Создай токен на: https://supabase.com/dashboard/account/tokens\n" +
      "    Добавь в .env.local: SUPABASE_ACCESS_TOKEN=sbp_...",
  );
  process.exit(1);
}

// Extract project ref from URL: https://<ref>.supabase.co
const projectRef = supabaseUrl.replace("https://", "").split(".")[0];
const supabase = createClient(supabaseUrl, anonKey);

// ─── Management API helper ────────────────────────────────────────────────────
async function runSQL(sql, label) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${label}: HTTP ${res.status} — ${text}`);
  }
  return res.json();
}

// ─── DDL ─────────────────────────────────────────────────────────────────────
const DDL = `
-- Enum types (safe re-run)
DO $$ BEGIN CREATE TYPE service_category AS ENUM ('stamps','molds','design','repair'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE industry_type AS ENUM ('automotive','aerospace','electronics','appliances','construction','medical','energy','defense'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE case_status AS ENUM ('draft','published'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE article_status AS ENUM ('draft','published'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  client TEXT,
  industry industry_type,
  services service_category[],
  challenge TEXT,
  solution TEXT,
  results TEXT,
  image_url TEXT,
  gallery TEXT[],
  status case_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  author TEXT DEFAULT 'Редакция',
  status article_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  specifications JSONB,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company TEXT,
  message TEXT,
  request_type TEXT DEFAULT 'callback',
  is_urgent BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_type TEXT,
  material TEXT,
  quantity TEXT,
  deadline TEXT,
  has_drawings BOOLEAN DEFAULT false,
  additional_info TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies (idempotent via DROP IF EXISTS + CREATE)
DROP POLICY IF EXISTS "Public can read published cases" ON cases;
CREATE POLICY "Public can read published cases" ON cases FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can read published articles" ON articles;
CREATE POLICY "Public can read published articles" ON articles FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can read active equipment" ON equipment;
CREATE POLICY "Public can read active equipment" ON equipment FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert contact requests" ON contact_requests;
CREATE POLICY "Public can insert contact requests" ON contact_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert quote requests" ON quote_requests;
CREATE POLICY "Public can insert quote requests" ON quote_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;
CREATE POLICY "Authenticated users can manage cases" ON cases FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage articles" ON articles;
CREATE POLICY "Authenticated users can manage articles" ON articles FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage equipment" ON equipment;
CREATE POLICY "Authenticated users can manage equipment" ON equipment FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage contact requests" ON contact_requests;
CREATE POLICY "Authenticated users can manage contact requests" ON contact_requests FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage quote requests" ON quote_requests;
CREATE POLICY "Authenticated users can manage quote requests" ON quote_requests FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON site_settings;
CREATE POLICY "Authenticated users can manage site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_featured ON cases(featured);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_cases_updated_at ON cases;
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS update_equipment_updated_at ON equipment;
CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media','media',true,10485760,ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO UPDATE SET public=true, file_size_limit=10485760,
  allowed_mime_types=ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif'];

DROP POLICY IF EXISTS "Public can view media files" ON storage.objects;
CREATE POLICY "Public can view media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id='media' AND auth.role()='authenticated');
DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
CREATE POLICY "Authenticated users can update media" ON storage.objects FOR UPDATE USING (bucket_id='media' AND auth.role()='authenticated');
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;
CREATE POLICY "Authenticated users can delete media" ON storage.objects FOR DELETE USING (bucket_id='media' AND auth.role()='authenticated');
`;

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const cases = [
  {
    title: "Штампы для кузовных панелей автомобилей",
    slug: "automotive-body-panels",
    description:
      "Разработка и производство комплекта штампов для штамповки кузовных панелей легковых автомобилей.",
    client: "АвтоВАЗ",
    industry: "automotive",
    services: ["stamps", "design"],
    challenge: "Точность до 0.02 мм и ресурс более 1 млн циклов при серийном производстве.",
    solution: "Применили 3D-моделирование и инструментальную сталь с термообработкой Х12МФ.",
    results: "Точность 0.015 мм\nРесурс 1.5 млн циклов\nЗапуск производства в срок",
    status: "published",
    featured: true,
  },
  {
    title: "Пресс-формы для корпусов электроники",
    slug: "electronics-housings",
    description: "Изготовление многоместных пресс-форм для корпусов электронных устройств.",
    client: "Ростелеком",
    industry: "electronics",
    services: ["molds", "design"],
    challenge: "Высокая детализация поверхности и минимальный облой при литье пластика.",
    solution: "Горячеканальная система и оптимизированное охлаждение с расчётом через Moldflow.",
    results:
      "Брак снижен на 40%\nПроизводительность выросла на 25%\nСрок изготовления 18 рабочих дней",
    status: "published",
    featured: true,
  },
  {
    title: "Оснастка для деталей стиральных машин",
    slug: "appliances-tooling",
    description:
      "Комплексная разработка штамповой оснастки для производства деталей стиральных машин.",
    client: "Haier",
    industry: "appliances",
    services: ["stamps", "molds", "design"],
    challenge: "Полная взаимозаменяемость с европейскими аналогами.",
    solution: "Реверс-инжиниринг и модернизированная оснастка с улучшенными характеристиками.",
    results:
      "Совместимость с европейскими линиями\nСтоимость ниже импорта на 35%\nСрок поставки 25 дней",
    status: "published",
    featured: false,
  },
  {
    title: "Ремонт штампов авиационных компонентов",
    slug: "aerospace-repair",
    description: "Восстановление и модернизация штамповой оснастки для авиационных компонентов.",
    client: "ОАК",
    industry: "aerospace",
    services: ["repair", "design"],
    challenge: "Критически важные штампы требовали срочного ремонта без остановки производства.",
    solution: "Работа в две смены, лазерная наплавка и финишное шлифование на КИМ.",
    results:
      "Ремонт за 5 дней вместо 14\nРесурс восстановлен на 100%\nЦена ниже нового штампа в 3 раза",
    status: "published",
    featured: true,
  },
  {
    title: "Медицинские пресс-формы из нержавейки",
    slug: "medical-stainless-molds",
    description: "Изготовление пресс-форм для производства медицинских одноразовых изделий.",
    client: "МедТех",
    industry: "medical",
    services: ["molds", "design"],
    challenge: "Требования к чистоте поверхности Ra 0.2 и стерилизуемости материалов.",
    solution: "Применение нержавеющей стали 316L, полировка зеркальная до Ra 0.05.",
    results: "Сертификация ISO 13485\nЧистота поверхности Ra 0.04\nПартия 10 000 изделий без брака",
    status: "published",
    featured: false,
  },
  {
    title: "Приборостроительные штампы для Росатома",
    slug: "energy-instrumentation",
    description:
      "Производство высокоточных штампов для деталей контрольно-измерительной аппаратуры.",
    client: "Росатом",
    industry: "energy",
    services: ["stamps", "design"],
    challenge: "Допуски ±0.005 мм и специальные материалы с радиационной стойкостью.",
    solution: "EDM-обработка и 5-осевое фрезерование с контролем на КИМ Zeiss.",
    results:
      "Точность ±0.004 мм\nВсе детали приняты ОТК с первого предъявления\n12 штампов за 2 месяца",
    status: "published",
    featured: false,
  },
];

const articles = [
  {
    title: "Современные материалы для штамповой оснастки в 2025 году",
    slug: "modern-tooling-materials-2025",
    excerpt:
      "Обзор инновационных сталей, покрытий и композитных материалов, применяемых в производстве штампов.",
    content:
      "Выбор материала — один из ключевых факторов долговечности оснастки.\n\n## Порошковые стали PM\n\nСтали типа Uddeholm Vanadis 8 производятся методом порошковой металлургии. Они обеспечивают однородность карбидной структуры и ресурс до 3 млн циклов на холодной штамповке.\n\n## Покрытия PVD/CVD\n\nНанесение TiAlN или DLC снижает коэффициент трения и увеличивает ресурс в 1.5–4 раза. Толщина 2–4 мкм практически не влияет на размеры.\n\n## Аддитивные вставки\n\nВставки, напечатанные на 3D-принтере, позволяют создавать конформные каналы охлаждения в пресс-формах. Это сокращает цикл литья на 20–40%.\n\n## Вывод\n\nОптимальная стратегия — порошковая сталь с PVD-покрытием для рабочих поверхностей и стандартные стали для несущих конструкций.",
    category: "Технологии",
    author: "Сергей Волков",
    status: "published",
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    title: "Как выбрать подрядчика для изготовления штампов: 8 критериев",
    slug: "how-to-choose-tooling-contractor",
    excerpt:
      "Практическое руководство по выбору надёжного партнёра для производства штамповой оснастки.",
    content:
      "Ошибка при выборе подрядчика обходится дорого: потерянное время и срыв сроков запуска.\n\n## 1. Наличие собственного КБ\n\nПроизводитель, который сам проектирует оснастку, выявляет ошибки на этапе проектирования — это в разы дешевле, чем исправлять их после изготовления.\n\n## 2. Парк оборудования\n\nПроверьте наличие EDM-станков, 5-осевых ОЦ и координатно-измерительных машин. Без КИМ контроль качества невозможен.\n\n## 3. Ресурс в контракте\n\nНадёжный подрядчик фиксирует в договоре гарантированный ресурс штампа и предельные отклонения.\n\n## 4. Опыт в вашей отрасли\n\nШтамп для автомобильного кузова и штамп для медицинских изделий — принципиально разные задачи. Запросите портфолио именно в вашей отрасли.\n\n## 5. Гарантийные обязательства\n\nСтандарт отрасли — гарантия 12 месяцев или до выработки ресурса.",
    category: "Руководства",
    author: "Алексей Михайлов",
    status: "published",
    published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    title: "Тренды автоматизации штамповочного производства в 2025",
    slug: "automation-trends-2025",
    excerpt: "Анализ ключевых направлений автоматизации и цифровизации в штамповочной отрасли.",
    content:
      "Штамповочное производство переживает цифровую трансформацию.\n\n## Цифровые двойники оснастки\n\nВиртуальная модель штампа, обновляемая в реальном времени по данным датчиков, позволяет предсказывать износ и планировать обслуживание до возникновения брака.\n\n## Адаптивное управление прессом\n\nСистемы следящего управления корректируют усилие пресса в реальном времени. Это снижает брак по короблению на 30–50%.\n\n## Коллаборативные роботы\n\nКоботы берут на себя загрузку-выгрузку заготовок и инспекцию деталей. Окупаемость — 12–18 месяцев при двухсменной работе.\n\n## Предиктивное ТО\n\nML-модели предсказывают момент замены пуансонов с точностью 85–90%, сокращая внеплановые простои на 60%.",
    category: "Аналитика",
    author: "Дмитрий Соколов",
    status: "published",
    published_at: new Date(Date.now() - 21 * 86400000).toISOString(),
  },
  {
    title: "EDM-обработка в производстве пресс-форм: полное руководство",
    slug: "edm-in-mold-making",
    excerpt:
      "Всё о электроэрозионной обработке: когда применять, какие материалы подходят и как контролировать качество.",
    content:
      "EDM незаменима там, где механическое резание невозможно.\n\n## Проволочная EDM\n\nПроволока 0.1–0.3 мм вырезает контурные профили с точностью до 0.002 мм. Применяется для пуансонов сложного профиля и направляющих колонок.\n\n## Прошивная EDM\n\nФасонный электрод прожигает полость нужной формы. Точность Ra 0.2–0.8 мкм. Незаменима для глубоких карманов и поднутрений.\n\n## Материалы электродов\n\nГрафит — быстрый съём для черновой обработки. Медь — лучшая чистота поверхности. Вольфрам-медь — для микроотверстий.\n\n## Контроль качества\n\nОбязательна проверка на КИМ и контроль дефектного слоя (recast layer). При толщине свыше 20 мкм необходима финишная доводка.",
    category: "Технологии",
    author: "Сергей Волков",
    status: "published",
    published_at: new Date(Date.now() - 35 * 86400000).toISOString(),
  },
  {
    title: "Расчёт стоимости штамповой оснастки",
    slug: "tooling-cost-calculation",
    excerpt:
      "Из чего складывается цена штампа или пресс-формы и как оптимизировать бюджет без потери качества.",
    content:
      "Заказчики часто удивляются разбросу цен на оснастку.\n\n## Основные статьи затрат\n\n**Материалы (25–40%)** — инструментальная сталь, нормали. Цена стали Х12МФ от 800 р/кг, порошковых сталей от 5 000 р/кг.\n\n**Машинное время (30–45%)** — фрезерование, EDM, шлифование, полировка. Ставка на 5-осевом центре от 3 000 р/час.\n\n**Конструирование (10–20%)** — 3D-моделирование, расчёт, документация.\n\n## Почему нельзя брать самое дешёвое\n\nДешёвая оснастка из 40Х вместо Х12МФ выходит из строя в 5–10 раз быстрее. При объёме 200 000 деталей/год стоимость в пересчёте на деталь одинакова, но потери от простоев намного выше.",
    category: "Руководства",
    author: "Алексей Михайлов",
    status: "published",
    published_at: new Date(Date.now() - 50 * 86400000).toISOString(),
  },
  {
    title: "Контроль качества в штамповочном производстве",
    slug: "quality-control-stamping",
    excerpt:
      "Современные методы входного, межоперационного и финишного контроля в производстве оснастки.",
    content:
      "Качество штампа на 80% определяется контролем в процессе производства.\n\n## Входной контроль материалов\n\nКаждая партия стали проходит: спектральный анализ (PMI), контроль твёрдости после термообработки, УЗК для заготовок свыше 100 мм.\n\n## Межоперационный контроль\n\nПосле каждой ключевой операции — промер на КИМ. Карта измерений сопровождает деталь по цеху.\n\n## Финишный контроль на КИМ\n\nКИМ строит 3D-отчёт отклонений от номинала. Протокол передаётся заказчику вместе с оснасткой.\n\n## Пробная штамповка\n\nМинимум 50 деталей на отладку, затем 500 деталей для оценки стабильности. Cp и Cpk ≥ 1.33 — минимальный приемлемый уровень.",
    category: "Качество",
    author: "Ирина Петрова",
    status: "published",
    published_at: new Date(Date.now() - 65 * 86400000).toISOString(),
  },
];

const equipment = [
  {
    name: "КИМ Zeiss Contura",
    category: "Измерительное оборудование",
    description:
      "Координатно-измерительная машина для высокоточного контроля геометрии деталей и оснастки.",
    specifications: {
      accuracy: "0.001 мм",
      range: "1200×1000×800 мм",
      probes: "Renishaw REVO",
      year: 2023,
    },
    sort_order: 1,
    is_active: true,
  },
  {
    name: "Электроэрозионный станок Sodick AG600L",
    category: "EDM-обработка",
    description:
      "Проволочно-вырезной станок для изготовления сложных профилей из закалённых сталей.",
    specifications: {
      accuracy: "0.002 мм",
      wire_diameter: "0.1–0.3 мм",
      max_workpiece: "750×550×250 мм",
      year: 2022,
    },
    sort_order: 2,
    is_active: true,
  },
  {
    name: "5-осевой ОЦ DMG Mori DMU 85",
    category: "Обрабатывающие центры",
    description:
      "5-осевой обрабатывающий центр для изготовления матриц, пуансонов и корпусных деталей.",
    specifications: {
      spindle_speed: "20 000 об/мин",
      accuracy: "0.003 мм",
      table: "Ø 850 мм",
      year: 2023,
    },
    sort_order: 3,
    is_active: true,
  },
  {
    name: "Гидравлический пресс П-6330 (400 т)",
    category: "Прессовое оборудование",
    description: "Пресс для испытания, отладки штамповой оснастки и серийной штамповки деталей.",
    specifications: {
      force: "400 т",
      table_size: "2000×1500 мм",
      stroke: "500 мм",
      year: 2021,
    },
    sort_order: 4,
    is_active: true,
  },
  {
    name: "Плоскошлифовальный станок Okamoto ACC-1224 DX",
    category: "Шлифовальное оборудование",
    description:
      "Высокоточный плоскошлифовальный станок для финишной обработки рабочих поверхностей.",
    specifications: {
      accuracy: "0.001 мм",
      table_size: "600×300 мм",
      year: 2022,
    },
    sort_order: 5,
    is_active: true,
  },
  {
    name: "Прошивной EDM Agie Charmilles Form 20",
    category: "EDM-обработка",
    description: "Прошивной электроэрозионный станок для изготовления полостей и поднутрений.",
    specifications: {
      surface_finish: "Ra 0.1 мкм",
      electrode_weight: "до 100 кг",
      year: 2023,
    },
    sort_order: 6,
    is_active: true,
  },
  {
    name: "Токарный ОЦ Mazak QUICK TURN 350",
    category: "Обрабатывающие центры",
    description: "Токарный обрабатывающий центр для изготовления цилиндрических деталей оснастки.",
    specifications: {
      max_diameter: "Ø 560 мм",
      max_length: "1524 мм",
      year: 2021,
    },
    sort_order: 7,
    is_active: true,
  },
  {
    name: "3D-принтер SLM Solutions 280 HL",
    category: "Аддитивное производство",
    description:
      "Металлический 3D-принтер для изготовления вставок с конформными каналами охлаждения.",
    specifications: {
      materials: "сталь 316L, Inconel 625",
      layer: "20–75 мкм",
      build_volume: "280×280×365 мм",
      year: 2024,
    },
    sort_order: 8,
    is_active: true,
  },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
/** Escape string for SQL */
function sqlStr(v) {
  if (v === null || v === undefined) return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`;
}

async function main() {
  console.log(`🔗  Проект: ${projectRef}\n`);

  // 1. Create tables
  console.log("🏗️   Создание таблиц и политик...");
  try {
    await runSQL(DDL, "DDL");
    console.log("   ✅  Таблицы и политики созданы\n");
  } catch (e) {
    console.error("❌  Ошибка DDL:", e.message);
    process.exit(1);
  }

  // Reload PostgREST schema cache
  console.log("🔄  Перезагрузка schema cache...");
  try {
    await runSQL("SELECT pg_notify('pgrst', 'reload schema');", "reload");
    console.log("   ✅  Schema cache обновлён\n");
  } catch (_) {
    /* non-fatal */
  }

  // Wait for cache to propagate
  console.log("⏳  Ожидание 4 секунды...");
  await new Promise((r) => setTimeout(r, 4000));
  console.log("");

  // 2. Seed all via Management API (runs as postgres, bypasses RLS)
  console.log("🌱  Вставка данных через SQL...");

  // Ensure unique constraint on equipment.name exists
  await runSQL(
    `DO $$ BEGIN ALTER TABLE equipment ADD CONSTRAINT equipment_name_unique UNIQUE (name); EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL; END $$;`,
    "constraint",
  ).catch(() => {});

  const seedSQL = `
INSERT INTO cases (title, slug, description, client, industry, services, challenge, solution, results, status, featured) VALUES
${cases.map((c) => `(${sqlStr(c.title)},${sqlStr(c.slug)},${sqlStr(c.description)},${sqlStr(c.client)},${sqlStr(c.industry)}::industry_type,ARRAY[${c.services.map((s) => sqlStr(s)).join(",")}]::service_category[],${sqlStr(c.challenge)},${sqlStr(c.solution)},${sqlStr(c.results)},${sqlStr(c.status)}::case_status,${c.featured})`).join(",\n")}
ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,description=EXCLUDED.description,client=EXCLUDED.client,industry=EXCLUDED.industry,services=EXCLUDED.services,challenge=EXCLUDED.challenge,solution=EXCLUDED.solution,results=EXCLUDED.results,status=EXCLUDED.status,featured=EXCLUDED.featured;

INSERT INTO articles (title, slug, excerpt, content, category, author, status, published_at) VALUES
${articles.map((a) => `(${sqlStr(a.title)},${sqlStr(a.slug)},${sqlStr(a.excerpt)},${sqlStr(a.content)},${sqlStr(a.category)},${sqlStr(a.author)},${sqlStr(a.status)}::article_status,${sqlStr(a.published_at)}::timestamptz)`).join(",\n")}
ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,excerpt=EXCLUDED.excerpt,content=EXCLUDED.content,category=EXCLUDED.category,author=EXCLUDED.author,status=EXCLUDED.status,published_at=EXCLUDED.published_at;

INSERT INTO equipment (name, category, description, specifications, sort_order, is_active) VALUES
${equipment.map((e) => `(${sqlStr(e.name)},${sqlStr(e.category)},${sqlStr(e.description)},${sqlStr(JSON.stringify(e.specifications))}::jsonb,${e.sort_order},${e.is_active})`).join(",\n")}
ON CONFLICT (name) DO UPDATE SET category=EXCLUDED.category,description=EXCLUDED.description,specifications=EXCLUDED.specifications,sort_order=EXCLUDED.sort_order,is_active=EXCLUDED.is_active;

INSERT INTO site_settings (key, value) VALUES
('company','{"phone":"+7 (495) 123-45-67","email":"info@shtamp.ru","address":"г. Москва, ул. Промышленная, 15","hours":"Пн-Пт: 9:00 — 18:00"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value;
`;

  try {
    await runSQL(seedSQL, "seed");
    console.log(
      `   ✅  ${cases.length} кейсов, ${articles.length} статей, ${equipment.length} единиц оборудования, настройки сайта\n`,
    );
  } catch (e) {
    console.error("❌  Ошибка seed:", e.message);
    process.exit(1);
  }

  console.log("🎉  Готово! Запусти: npm run dev");
}

main();
