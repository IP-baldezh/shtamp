import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  PenTool,
  Monitor,
  FileText,
  Calculator,
  Cog,
  Shield,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Проектирование штампов и пресс-форм | ШТАМП",
  description:
    "Полный цикл конструкторских работ: 3D-моделирование, расчет технологии, симуляция штамповки, выпуск КД по ЕСКД.",
};

const services = [
  {
    icon: Monitor,
    title: "3D-моделирование",
    description: "Создание точной 3D-модели штампа или пресс-формы в современных CAD-системах.",
    details: [
      "Solid modeling в NX, SolidWorks",
      "Параметрические модели",
      "Сборка с проверкой коллизий",
      "Визуализация для согласования",
    ],
  },
  {
    icon: Calculator,
    title: "Расчет технологии",
    description: "Технологические расчеты для обеспечения качественной штамповки.",
    details: [
      "Раскрой и развертка",
      "Усилия штамповки",
      "Пружинение и компенсация",
      "Выбор оборудования",
    ],
  },
  {
    icon: Cog,
    title: "Симуляция процесса",
    description: "Компьютерное моделирование процесса штамповки для оптимизации конструкции.",
    details: [
      "AutoForm, PAM-STAMP",
      "Анализ формообразования",
      "Прогноз дефектов",
      "Оптимизация параметров",
    ],
  },
  {
    icon: FileText,
    title: "Конструкторская документация",
    description: "Полный комплект чертежей и спецификаций по ЕСКД.",
    details: ["Сборочные чертежи", "Деталировка", "Спецификации", "Технические условия"],
  },
];

const software = [
  { name: "Siemens NX", category: "CAD/CAM" },
  { name: "SolidWorks", category: "CAD" },
  { name: "AutoForm", category: "Симуляция" },
  { name: "PAM-STAMP", category: "Симуляция" },
  { name: "КОМПАС-3D", category: "CAD" },
  { name: "AutoCAD", category: "2D-чертежи" },
];

const advantages = [
  {
    icon: PenTool,
    title: "Опытные конструкторы",
    description: "Команда инженеров с опытом 10+ лет в проектировании оснастки",
  },
  {
    icon: Monitor,
    title: "Современное ПО",
    description: "Лицензионные CAD/CAM/CAE системы мировых производителей",
  },
  {
    icon: Shield,
    title: "Проверенные решения",
    description: "База типовых конструкций на основе 500+ реализованных проектов",
  },
  {
    icon: Calculator,
    title: "Точные расчеты",
    description: "Симуляция процесса для минимизации доработок",
  },
];

export default function DesignServicePage() {
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
                Услуги
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Проектирование
                <br />
                <span className="text-primary">штампов и пресс-форм</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Полный цикл конструкторских работ: от анализа детали до выпуска рабочей
                документации. Современное ПО и симуляция процессов.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Заказать проект
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/cases">Примеры проектов</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Что мы делаем</h2>
              <p className="mt-4 text-muted-foreground">
                Комплекс услуг по проектированию технологической оснастки
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                    </div>
                  </div>
                  <p className="mb-6 text-muted-foreground">{service.description}</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {detail}
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
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Почему выбирают нас</h2>
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

        {/* Software */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Программное обеспечение</h2>
                <p className="mt-4 text-muted-foreground">
                  Используем лицензионное профессиональное ПО мировых лидеров для проектирования и
                  симуляции.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {software.map((sw) => (
                    <div
                      key={sw.name}
                      className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
                    >
                      <span className="font-medium text-foreground">{sw.name}</span>
                      <span className="text-sm text-muted-foreground">{sw.category}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">Этапы проектирования</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Анализ ТЗ",
                      desc: "Изучение чертежей детали, требований к качеству",
                    },
                    {
                      step: "2",
                      title: "Технология",
                      desc: "Разработка маршрута, расчет переходов",
                    },
                    {
                      step: "3",
                      title: "3D-модель",
                      desc: "Создание параметрической модели штампа",
                    },
                    {
                      step: "4",
                      title: "Симуляция",
                      desc: "Проверка формообразования, оптимизация",
                    },
                    { step: "5", title: "КД", desc: "Выпуск чертежей и спецификаций" },
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

        {/* Pricing info */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Стоимость проектирования</h2>
                  <p className="mt-4 text-muted-foreground">
                    Стоимость зависит от сложности детали, типа оснастки и требуемого состава работ.
                    Предоставляем детальную смету после анализа ТЗ.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-foreground">
                      <Check className="h-5 w-5 text-primary" />
                      Бесплатная предварительная оценка
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <Check className="h-5 w-5 text-primary" />
                      Фиксированная стоимость в договоре
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <Check className="h-5 w-5 text-primary" />
                      Поэтапная оплата
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-4 lg:items-end">
                  <Button size="lg" className="glow-blue-subtle" asChild>
                    <Link href="/quote">
                      Запросить расчет
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">Ответим в течение 1 рабочего дня</p>
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
