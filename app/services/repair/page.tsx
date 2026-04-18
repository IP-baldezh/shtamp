import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Wrench, RefreshCw, TrendingUp, Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Ремонт и модернизация штампов",
  description:
    "Восстановление работоспособности оснастки, увеличение ресурса, оптимизация конструкции штампов и пресс-форм.",
  alternates: { canonical: "/services/repair" },
  openGraph: {
    title: "Ремонт и модернизация штампов | ШТАМП",
    description: "Восстановление работоспособности оснастки, увеличение ресурса, оптимизация.",
    url: "/services/repair",
    type: "website",
  },
};

const services = [
  {
    icon: Search,
    title: "Диагностика и дефектация",
    description: "Комплексное обследование штампа для определения объема ремонта.",
    features: [
      "Визуальный осмотр",
      "Измерение износа на КИМ",
      "Анализ причин поломки",
      "Составление ведомости дефектов",
    ],
  },
  {
    icon: Wrench,
    title: "Текущий ремонт",
    description: "Восстановление работоспособности при незначительном износе.",
    features: [
      "Заточка режущих кромок",
      "Замена пружин и крепежа",
      "Регулировка зазоров",
      "Устранение мелких дефектов",
    ],
  },
  {
    icon: RefreshCw,
    title: "Капитальный ремонт",
    description: "Полное восстановление штампа с заменой изношенных частей.",
    features: [
      "Изготовление новых матриц/пуансонов",
      "Замена направляющих",
      "Восстановление плит",
      "Переборка механизмов",
    ],
  },
  {
    icon: TrendingUp,
    title: "Модернизация",
    description: "Улучшение конструкции для повышения производительности и ресурса.",
    features: [
      "Оптимизация конструкции",
      "Замена на износостойкие материалы",
      "Автоматизация операций",
      "Повышение производительности",
    ],
  },
];

const advantages = [
  {
    value: "50%",
    label: "Экономия",
    description: "По сравнению с изготовлением нового штампа",
  },
  {
    value: "5-15",
    label: "Дней",
    description: "Средний срок ремонта",
  },
  {
    value: "100%",
    label: "Гарантия",
    description: "На выполненные работы",
  },
  {
    value: "24ч",
    label: "Срочный ремонт",
    description: "При критических поломках",
  },
];

const repairTypes = [
  {
    type: "Текущий ремонт",
    timing: "3-5 дней",
    scope: "Заточка, регулировка, замена мелких деталей",
    cost: "от 15 000 ₽",
  },
  {
    type: "Средний ремонт",
    timing: "7-14 дней",
    scope: "Замена матриц/пуансонов, восстановление направляющих",
    cost: "от 50 000 ₽",
  },
  {
    type: "Капитальный ремонт",
    timing: "14-30 дней",
    scope: "Полная переборка, изготовление новых деталей",
    cost: "от 150 000 ₽",
  },
  {
    type: "Модернизация",
    timing: "по проекту",
    scope: "Изменение конструкции, повышение характеристик",
    cost: "по расчету",
  },
];

export default function RepairServicePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs
              items={[{ name: "Услуги", href: "/services" }, { name: "Ремонт и модернизация" }]}
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
                Ремонт и модернизация
                <br />
                <span className="text-primary">штампов и пресс-форм</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Восстанавливаем работоспособность оснастки, продлеваем ресурс, улучшаем конструкцию.
                Ремонт штампов любых производителей.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Заявка на ремонт
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+74951234567">Срочный вызов</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-1 font-semibold text-foreground">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Виды работ</h2>
              <p className="mt-4 text-muted-foreground">
                Выполняем все виды ремонтных работ для штампов и пресс-форм
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                  <p className="mb-6 text-muted-foreground">{service.description}</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.features.map((feature) => (
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

        {/* Pricing table */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Сроки и стоимость</h2>
              <p className="mt-4 text-muted-foreground">
                Ориентировочные сроки и цены на основные виды ремонта
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-semibold text-foreground">Вид ремонта</th>
                    <th className="p-4 text-left font-semibold text-foreground">Сроки</th>
                    <th className="p-4 text-left font-semibold text-foreground">Объем работ</th>
                    <th className="p-4 text-left font-semibold text-foreground">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {repairTypes.map((item) => (
                    <tr key={item.type} className="border-b border-border">
                      <td className="p-4 font-medium text-foreground">{item.type}</td>
                      <td className="p-4 text-muted-foreground">{item.timing}</td>
                      <td className="p-4 text-muted-foreground">{item.scope}</td>
                      <td className="p-4 text-primary font-medium">{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              * Точная стоимость определяется после диагностики штампа
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Как мы работаем</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Заявка",
                  desc: "Получаем информацию о проблеме, фото, историю эксплуатации",
                },
                {
                  step: "02",
                  title: "Диагностика",
                  desc: "Осматриваем штамп, измеряем износ, составляем дефектную ведомость",
                },
                {
                  step: "03",
                  title: "Согласование",
                  desc: "Предоставляем смету, согласовываем объем и сроки работ",
                },
                {
                  step: "04",
                  title: "Ремонт",
                  desc: "Выполняем работы, контролируем качество, проводим испытания",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency banner */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-primary/50 bg-gradient-to-r from-primary/10 to-transparent p-8 md:p-12">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Срочный ремонт</h3>
                  <p className="mt-2 text-muted-foreground">
                    При критических поломках выезжаем на объект в течение 24 часов
                  </p>
                </div>
                <Button size="lg" className="glow-blue" asChild>
                  <a href="tel:+74951234567">Позвонить сейчас</a>
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
