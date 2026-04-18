import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Zap, Package, Home, Wrench, Settings, Cog, Factory } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Отрасли применения",
  description:
    "Производим штампы и пресс-формы для автомобильной, электротехнической, упаковочной промышленности и других отраслей.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Отрасли применения | ШТАМП",
    description:
      "Производим штампы и пресс-формы для автомобильной, электротехнической и других отраслей.",
    url: "/industries",
    type: "website",
  },
};

const industries = [
  {
    icon: Car,
    title: "Автомобильная промышленность",
    slug: "automotive",
    description:
      "Штампы для кузовных деталей, компонентов шасси и интерьерных элементов. Работаем с ведущими автопроизводителями и поставщиками первого уровня.",
    products: ["Кузовные панели", "Элементы шасси", "Детали интерьера", "Компоненты двигателя"],
    features: ["Высокая точность ±0.02 мм", "Ресурс до 2 млн циклов", "Быстрая смена моделей"],
  },
  {
    icon: Zap,
    title: "Электротехника и электроника",
    slug: "electronics",
    description:
      "Штампы для производства корпусов приборов, контактных групп, радиаторов и других электротехнических компонентов.",
    products: ["Корпуса приборов", "Контактные группы", "Радиаторы охлаждения", "Экраны и панели"],
    features: ["Микроточность", "Чистая обработка", "Антистатические решения"],
  },
  {
    icon: Package,
    title: "Упаковочная промышленность",
    slug: "packaging",
    description:
      "Пресс-формы и штампы для производства металлической тары, крышек, укупорочных изделий и промышленной упаковки.",
    products: [
      "Банки и контейнеры",
      "Крышки и укупорка",
      "Промышленная тара",
      "Аэрозольная упаковка",
    ],
    features: ["Высокая производительность", "Гигиенические стандарты", "Оптимизация материала"],
  },
  {
    icon: Home,
    title: "Бытовая техника",
    slug: "appliances",
    description:
      "Штамповая оснастка для производства корпусов и компонентов бытовой техники: холодильников, стиральных машин, кухонного оборудования.",
    products: [
      "Корпуса техники",
      "Панели управления",
      "Внутренние элементы",
      "Декоративные детали",
    ],
    features: ["Эстетичная поверхность", "Точная геометрия", "Долговечность"],
  },
  {
    icon: Wrench,
    title: "Сельхозмашиностроение",
    slug: "agriculture",
    description:
      "Оснастка для производства деталей сельскохозяйственной техники: тракторов, комбайнов, навесного оборудования.",
    products: ["Кузовные элементы", "Рабочие органы", "Защитные кожухи", "Крепёжные элементы"],
    features: ["Высокая прочность", "Коррозионная стойкость", "Работа с толстым металлом"],
  },
  {
    icon: Settings,
    title: "Машиностроение",
    slug: "machinery",
    description:
      "Штампы и пресс-формы для общего машиностроения: производственного оборудования, станков, промышленных механизмов.",
    products: ["Корпусные детали", "Кронштейны и опоры", "Крышки и кожухи", "Фланцы и пластины"],
    features: ["Любая сложность", "Серийное производство", "Гибкие сроки"],
  },
  {
    icon: Cog,
    title: "Приборостроение",
    slug: "instruments",
    description:
      "Прецизионная оснастка для производства корпусов измерительных приборов, медицинского оборудования и точной механики.",
    products: ["Корпуса приборов", "Шкалы и панели", "Миниатюрные детали", "Защитные элементы"],
    features: ["Микроточность", "Чистые помещения", "Специальные материалы"],
  },
  {
    icon: Factory,
    title: "Металлоизделия",
    slug: "metalware",
    description:
      "Штампы для производства метизов, крепежа, пружинных изделий и прочих металлических компонентов.",
    products: ["Метизы", "Крепёж", "Пружинные изделия", "Штампованные детали"],
    features: ["Высокоскоростная штамповка", "Автоматизация", "Большие тиражи"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-32">
        {/* Hero Section */}
        <section className="relative pb-16">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Breadcrumbs className="justify-center" items={[{ name: "Отрасли" }]} />
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Отрасли
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Отрасли применения
              </h1>
              <p className="text-lg text-muted-foreground">
                Более 18 лет мы производим штамповую оснастку для ведущих предприятий различных
                отраслей промышленности. Наш опыт — ваше конкурентное преимущество.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={index}
                    className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-foreground lg:text-2xl">
                      {industry.title}
                    </h2>
                    <p className="mb-6 text-muted-foreground">{industry.description}</p>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Продукция
                        </h3>
                        <ul className="space-y-1">
                          {industry.products.map((product, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                              <span className="h-1 w-1 rounded-full bg-primary" />
                              {product}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Особенности
                        </h3>
                        <ul className="space-y-1">
                          {industry.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                              <span className="h-1 w-1 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={`/cases?industry=${industry.slug}`}
                      className="inline-flex items-center gap-2 text-primary transition-colors hover:underline"
                    >
                      Смотреть кейсы отрасли
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "8+", label: "Отраслей" },
                { value: "150+", label: "Клиентов" },
                { value: "500+", label: "Проектов" },
                { value: "18", label: "Лет опыта" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-4xl font-bold text-primary lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 text-center lg:p-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
                Не нашли свою отрасль?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Мы работаем с широким спектром производств. Расскажите о вашей задаче — найдём
                оптимальное решение.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild className="glow-blue-subtle">
                  <Link href="/quote">Запросить консультацию</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Связаться с нами</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
