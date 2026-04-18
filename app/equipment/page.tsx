import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Cpu, Ruler, Zap, Factory, Settings, Shield } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Оборудование производства | ШТАМП",
  description:
    "Парк современного оборудования: станки с ЧПУ, электроэрозионные станки, координатно-измерительные машины, термическое оборудование.",
};

const equipmentCategories = [
  {
    icon: Cpu,
    title: "Станки с ЧПУ",
    description: "Высокоточная механическая обработка формообразующих деталей",
    items: [
      { name: "Обрабатывающий центр DMG MORI NVX 5100", specs: "Рабочая зона 1050×510×510 мм" },
      { name: "Обрабатывающий центр Mazak VTC-300C", specs: "Точность позиционирования 0.003 мм" },
      { name: "Токарный центр Doosan Puma 2600", specs: "Диаметр обработки до 350 мм" },
      { name: "Фрезерный станок DMU 50 ecoline", specs: "5-осевая обработка" },
    ],
  },
  {
    icon: Zap,
    title: "Электроэрозионное оборудование",
    description: "Обработка твердых сплавов и сложных профилей",
    items: [
      { name: "Проволочный станок Sodick AQ537L", specs: "Точность ±0.002 мм" },
      { name: "Проволочный станок Mitsubishi FA20S", specs: "Наклон до 30°" },
      { name: "Прошивной станок Sodick AG60L", specs: "Глубина обработки до 400 мм" },
      { name: "Прошивной станок CHMER CM323C", specs: "3D-обработка" },
    ],
  },
  {
    icon: Ruler,
    title: "Измерительное оборудование",
    description: "Контроль качества на всех этапах производства",
    items: [
      { name: "КИМ Zeiss Contura G2", specs: "Точность 1.8+L/300 мкм" },
      { name: "КИМ Mitutoyo Crysta-Apex S", specs: "Рабочая зона 700×1000×600 мм" },
      { name: "Профилограф Mahr MarSurf PS10", specs: "Измерение шероховатости" },
      { name: "Видеоизмерительная система Keyence", specs: "Бесконтактные измерения" },
    ],
  },
  {
    icon: Factory,
    title: "Шлифовальное оборудование",
    description: "Финишная обработка с высокой точностью",
    items: [
      { name: "Плоскошлифовальный Okamoto ACC-63SA", specs: "Стол 600×300 мм" },
      { name: "Плоскошлифовальный ELB SWBE 010 NC", specs: "Точность 0.001 мм" },
      { name: "Координатно-шлифовальный Hauser S3", specs: "Для отверстий и контуров" },
      { name: "Круглошлифовальный Studer S21", specs: "ЧПУ управление" },
    ],
  },
  {
    icon: Settings,
    title: "Термическое оборудование",
    description: "Закалка и термообработка инструментальных сталей",
    items: [
      { name: "Вакуумная печь SECO/WARWICK", specs: "Закалка до 1300°C" },
      { name: "Камерная печь Nabertherm", specs: "Объем 200 литров" },
      { name: "Соляная ванна Durferrit", specs: "Азотирование" },
      { name: "Установка криогенной обработки", specs: "-196°C" },
    ],
  },
  {
    icon: Shield,
    title: "Слесарное и сборочное",
    description: "Оснащение для слесарной обработки и сборки",
    items: [
      { name: "Верстаки с гранитными плитами", specs: "Точность до 0.002 мм" },
      { name: "Пресс гидравлический 100 т", specs: "Для запрессовки" },
      { name: "Полировальное оборудование", specs: "Ra до 0.05 мкм" },
      { name: "Инструмент Mitutoyo, TESA", specs: "Мерительный инструмент" },
    ],
  },
];

const stats = [
  { value: "50+", label: "Единиц оборудования" },
  { value: "2000 м²", label: "Производственная площадь" },
  { value: "24/7", label: "Режим работы" },
  { value: "ISO 9001", label: "Сертификация" },
];

export default function EquipmentPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        {/* Hero section */}
        <section className="relative pb-20">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Производство
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Оборудование
                <br />
                <span className="text-primary">нашего производства</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Парк современного оборудования ведущих мировых производителей обеспечивает высокую
                точность и качество изготовления оснастки.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-2 text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment categories */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-16">
              {equipmentCategories.map((category, index) => (
                <div key={category.title}>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <category.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
                      >
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.specs}</p>
                      </div>
                    ))}
                  </div>
                  {index < equipmentCategories.length - 1 && (
                    <div className="mt-16 section-divider" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Технические возможности</h2>
              <p className="mt-4 text-muted-foreground">
                Что мы можем изготовить на нашем оборудовании
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Механическая обработка",
                  items: [
                    "Фрезерование до 1000×500 мм",
                    "Токарная обработка до Ø350 мм",
                    "5-осевая обработка",
                    "Точность до 0.005 мм",
                  ],
                },
                {
                  title: "Электроэрозия",
                  items: [
                    "Проволочная резка до 400 мм",
                    "Прошивка глубиной до 400 мм",
                    "Обработка твердых сплавов",
                    "Микроэрозия до 0.02 мм",
                  ],
                },
                {
                  title: "Шлифование",
                  items: [
                    "Плоское шлифование",
                    "Координатное шлифование",
                    "Профильное шлифование",
                    "Ra до 0.1 мкм",
                  ],
                },
                {
                  title: "Термообработка",
                  items: [
                    "Закалка до 62 HRC",
                    "Вакуумная закалка",
                    "Азотирование",
                    "Криогенная обработка",
                  ],
                },
                {
                  title: "Контроль качества",
                  items: [
                    "3D-измерения на КИМ",
                    "Контроль шероховатости",
                    "Твердость по Роквеллу",
                    "Протоколы измерений",
                  ],
                },
                {
                  title: "Слесарная обработка",
                  items: [
                    "Полировка до Ra 0.05",
                    "Подгонка сопряжений",
                    "Сборка штампов",
                    "Испытания",
                  ],
                },
              ].map((capability) => (
                <div
                  key={capability.title}
                  className="rounded-xl border border-border bg-secondary/30 p-6"
                >
                  <h3 className="mb-4 font-semibold text-foreground">{capability.title}</h3>
                  <ul className="space-y-2">
                    {capability.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Хотите увидеть производство?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Приглашаем на экскурсию по нашему производственному комплексу. Покажем оборудование
                и процессы изготовления.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/contact">
                    Записаться на экскурсию
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
