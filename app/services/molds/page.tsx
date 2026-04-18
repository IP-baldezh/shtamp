import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Box, Thermometer, Droplets } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Изготовление пресс-форм для литья",
  description:
    "Производство пресс-форм для литья пластмасс под давлением и литья металлов. Горячеканальные системы, многоместные формы.",
  alternates: { canonical: "/services/molds" },
  openGraph: {
    title: "Изготовление пресс-форм для литья | ШТАМП",
    description: "Производство пресс-форм для литья пластмасс под давлением и литья металлов.",
    url: "/services/molds",
    type: "website",
  },
};

const moldTypes = [
  {
    icon: Droplets,
    title: "Пресс-формы для литья пластмасс",
    description: "Формы для термопластавтоматов различной производительности.",
    features: [
      "Холодноканальные системы",
      "Горячеканальные системы",
      "Многоместные формы до 64 гнезд",
      "Формы с боковыми знаками",
    ],
  },
  {
    icon: Thermometer,
    title: "Пресс-формы для литья алюминия",
    description: "Формы для машин литья под давлением алюминиевых сплавов.",
    features: [
      "Формы для МЛПД",
      "Термостойкие материалы",
      "Система охлаждения",
      "Ресурс до 100 000 циклов",
    ],
  },
  {
    icon: Box,
    title: "Специальные формы",
    description: "Нестандартные конструкции под специфические требования.",
    features: [
      "Формы для MIM-технологии",
      "Формы для LSR силикона",
      "Двухкомпонентное литье",
      "Формы с закладными",
    ],
  },
];

const hotRunnerAdvantages = [
  "Отсутствие литника - экономия материала до 30%",
  "Сокращение цикла литья на 10-20%",
  "Улучшение качества поверхности изделий",
  "Снижение давления впрыска",
  "Возможность литья крупногабаритных деталей",
  "Автоматизация процесса без обрезки литника",
];

const specs = [
  { label: "Масса отливки", value: "до 5 кг" },
  { label: "Габариты изделия", value: "до 600×600 мм" },
  { label: "Количество гнезд", value: "до 64" },
  { label: "Точность размеров", value: "IT8-IT10" },
  { label: "Шероховатость", value: "Ra 0.4-1.6" },
  { label: "Ресурс формы", value: "до 1 млн циклов" },
];

export default function MoldsServicePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs items={[{ name: "Услуги", href: "/services" }, { name: "Пресс-формы" }]} />
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
                Пресс-формы
                <br />
                <span className="text-primary">для литья</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Проектируем и изготавливаем пресс-формы для литья пластмасс под давлением и литья
                алюминиевых сплавов. Современные горячеканальные системы.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Запросить расчет
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/cases">Примеры форм</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mold types */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Виды пресс-форм</h2>
              <p className="mt-4 text-muted-foreground">
                Изготавливаем формы для различных технологий литья
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {moldTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <type.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{type.title}</h3>
                  <p className="mb-6 text-muted-foreground">{type.description}</p>
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

        {/* Hot runner systems */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  Технологии
                </div>
                <h2 className="text-3xl font-bold text-foreground">Горячеканальные системы</h2>
                <p className="mt-4 text-muted-foreground">
                  Внедряем современные горячеканальные системы ведущих производителей для
                  максимальной эффективности литьевого производства.
                </p>
                <ul className="mt-8 space-y-3">
                  {hotRunnerAdvantages.map((advantage) => (
                    <li key={advantage} className="flex items-start gap-3 text-foreground">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">
                  Партнеры по горячеканальным системам
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["YUDO", "HASCO", "Mold-Masters", "INCOE", "Synventive", "Husky"].map(
                    (partner) => (
                      <div
                        key={partner}
                        className="rounded-lg border border-border bg-secondary/30 p-4 text-center font-medium text-foreground"
                      >
                        {partner}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Технические возможности</h2>
              <p className="mt-4 text-muted-foreground">Параметры изготавливаемых пресс-форм</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl border border-border bg-secondary/30 p-6 text-center"
                >
                  <div className="text-2xl font-bold text-primary">{spec.value}</div>
                  <div className="mt-2 text-muted-foreground">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Материалы для изготовления</h2>
                <p className="mt-4 text-muted-foreground">
                  Используем высококачественные инструментальные стали европейских и российских
                  производителей.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h4 className="font-semibold text-foreground">Формообразующие детали</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      1.2343 (4Х5МФС), 1.2344 (Х5МФ), 1.2767 - закалка до 52 HRC
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h4 className="font-semibold text-foreground">Плиты и обоймы</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      1.1730 (Ст45), 1.2312 (40Х) - предзакаленные до 30 HRC
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h4 className="font-semibold text-foreground">Направляющие</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Бронзовые втулки, закаленные колонки, шариковые направляющие
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">Процесс изготовления</h3>
                <div className="space-y-6">
                  {[
                    { step: "1", title: "Проектирование", desc: "3D-модель, анализ заполнения" },
                    { step: "2", title: "Изготовление плит", desc: "Обработка на станках с ЧПУ" },
                    {
                      step: "3",
                      title: "Формообразующие",
                      desc: "Электроэрозия, шлифовка, полировка",
                    },
                    { step: "4", title: "Сборка", desc: "Подгонка, настройка систем" },
                    { step: "5", title: "Испытания", desc: "Отладка на ТПА, отработка режимов" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
