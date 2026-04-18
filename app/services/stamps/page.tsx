import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Layers, Settings, Gauge, Shield, Clock } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Изготовление штампов холодной штамповки",
  description:
    "Производство штампов любой сложности: вырубные, гибочные, вытяжные, комбинированные. Собственное производство в Москве.",
  alternates: { canonical: "/services/stamps" },
  openGraph: {
    title: "Изготовление штампов холодной штамповки | ШТАМП",
    description:
      "Производство штампов любой сложности: вырубные, гибочные, вытяжные, комбинированные.",
    url: "/services/stamps",
    type: "website",
  },
};

const stampTypes = [
  {
    title: "Вырубные штампы",
    description: "Для вырубки плоских деталей из листового металла с высокой точностью контура.",
    features: ["Простые и сложные контуры", "Многорядная вырубка", "Точность до ±0.02 мм"],
  },
  {
    title: "Гибочные штампы",
    description: "Для формообразования деталей методом гибки с различными углами и радиусами.",
    features: ["V-образная гибка", "П-образная гибка", "Многопереходная гибка"],
  },
  {
    title: "Вытяжные штампы",
    description: "Для глубокой вытяжки объемных деталей из листового металла.",
    features: ["Цилиндрические детали", "Коробчатые формы", "Сложные профили"],
  },
  {
    title: "Комбинированные штампы",
    description: "Совмещение нескольких операций в одном штампе для повышения производительности.",
    features: ["Вырубка + гибка", "Вырубка + вытяжка", "Многооперационные"],
  },
  {
    title: "Последовательные штампы",
    description: "Многопозиционные штампы для изготовления сложных деталей за несколько переходов.",
    features: ["До 20 позиций", "Автоматическая подача", "Высокая производительность"],
  },
  {
    title: "Штампы-автоматы",
    description: "Для работы на автоматических прессах с высокой скоростью штамповки.",
    features: ["До 150 уд/мин", "Автовыгрузка деталей", "Минимум обслуживания"],
  },
];

const materials = [
  "Углеродистые стали (08кп, 10, 20)",
  "Легированные стали (09Г2С, 65Г)",
  "Нержавеющие стали (12Х18Н10Т)",
  "Алюминиевые сплавы (АМг2, АМг3, АД1)",
  "Медь и латунь (Л63, Л68)",
  "Бронза (БрКМц3-1)",
];

const advantages = [
  {
    icon: Settings,
    title: "Современное оборудование",
    description: "Станки с ЧПУ, электроэрозионная обработка, шлифовка",
  },
  {
    icon: Gauge,
    title: "Точность изготовления",
    description: "Допуски до ±0.005 мм на формообразующих поверхностях",
  },
  {
    icon: Shield,
    title: "Качественные материалы",
    description: "Инструментальные стали Х12МФ, Р6М5, твердые сплавы",
  },
  {
    icon: Clock,
    title: "Оптимальные сроки",
    description: "От 2 недель для простых штампов",
  },
];

export default function StampsServicePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs
              items={[{ name: "Услуги", href: "/services" }, { name: "Изготовление штампов" }]}
            />
          </div>
        </section>
        {/* Hero section */}
        <section className="relative pb-20">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Услуги
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Изготовление штампов
                <br />
                <span className="text-primary">холодной штамповки</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Проектируем и изготавливаем штампы любой сложности для серийного и массового
                производства деталей из листового металла.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Запросить расчет
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/cases">Примеры работ</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stamp types */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Виды штампов</h2>
              <p className="mt-4 text-muted-foreground">
                Изготавливаем все типы штампов холодной штамповки
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stampTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{type.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Наши преимущества</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv) => (
                <div key={adv.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <adv.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{adv.title}</h3>
                  <p className="text-sm text-muted-foreground">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Материалы для штамповки</h2>
                <p className="mt-4 text-muted-foreground">
                  Проектируем штампы для работы с различными материалами, учитывая их свойства и
                  особенности обработки.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {materials.map((material) => (
                    <li key={material} className="flex items-center gap-2 text-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">
                  Техническая информация
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Толщина материала</span>
                    <span className="font-medium text-foreground">0.1 - 6 мм</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Габариты деталей</span>
                    <span className="font-medium text-foreground">до 500×500 мм</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-4">
                    <span className="text-muted-foreground">Точность контура</span>
                    <span className="font-medium text-foreground">±0.02 мм</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ресурс штампа</span>
                    <span className="font-medium text-foreground">до 5 млн деталей</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Процесс изготовления</h2>
              <p className="mt-4 text-muted-foreground">
                От получения заявки до отгрузки готового штампа
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
              {[
                { step: "01", title: "Заявка", desc: "Получение ТЗ" },
                { step: "02", title: "Анализ", desc: "Оценка и расчет" },
                { step: "03", title: "Проект", desc: "3D-модель штампа" },
                { step: "04", title: "Производство", desc: "Изготовление" },
                { step: "05", title: "Контроль", desc: "Проверка КИМ" },
                { step: "06", title: "Отгрузка", desc: "Доставка" },
              ].map((item, index) => (
                <div key={item.step} className="relative text-center">
                  {index < 5 && (
                    <div className="absolute right-0 top-6 hidden h-px w-full bg-border md:block" />
                  )}
                  <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
