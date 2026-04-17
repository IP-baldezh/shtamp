import Link from "next/link"
import { ArrowRight, Wrench, PenTool, Settings, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import CTA from "@/components/sections/cta"

const services = [
  {
    icon: Wrench,
    title: "Изготовление штампов",
    slug: "stamps",
    description:
      "Проектирование и производство штампов холодной листовой штамповки любой сложности. Вырубные, гибочные, вытяжные, комбинированные штампы.",
    features: [
      "Вырубные штампы",
      "Гибочные штампы",
      "Вытяжные штампы",
      "Комбинированные штампы",
      "Штампы последовательного действия",
      "Штампы совмещённого действия",
    ],
    stats: { value: "500+", label: "штампов в год" },
  },
  {
    icon: Package,
    title: "Пресс-формы",
    slug: "molds",
    description:
      "Разработка и изготовление пресс-форм для литья пластмасс, резинотехнических изделий и порошковой металлургии.",
    features: [
      "Пресс-формы для литья пластмасс",
      "Формы для РТИ",
      "Кокили для литья металла",
      "Формы для порошковой металлургии",
      "Многоместные пресс-формы",
      "Горячеканальные системы",
    ],
    stats: { value: "150+", label: "пресс-форм в год" },
  },
  {
    icon: PenTool,
    title: "Проектирование оснастки",
    slug: "design",
    description:
      "Полный цикл конструкторских работ: от анализа технического задания до выпуска комплекта рабочей документации.",
    features: [
      "3D-моделирование",
      "Инженерный анализ (CAE)",
      "Оптимизация технологии",
      "Конструкторская документация",
      "Сопровождение производства",
      "Авторский надзор",
    ],
    stats: { value: "30+", label: "инженеров-конструкторов" },
  },
  {
    icon: Settings,
    title: "Ремонт и модернизация",
    slug: "repair",
    description:
      "Восстановление работоспособности, модернизация и переналадка штамповой оснастки для продления срока службы.",
    features: [
      "Диагностика состояния",
      "Восстановительный ремонт",
      "Модернизация конструкции",
      "Переналадка под новую деталь",
      "Изготовление запасных частей",
      "Срочный ремонт",
    ],
    stats: { value: "48ч", label: "срочный ремонт" },
  },
]

export const metadata = {
  title: "Услуги | СтампМастер",
  description:
    "Изготовление штампов, пресс-форм, проектирование оснастки, ремонт и модернизация. Полный цикл производства штамповой оснастки.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-surface py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-accent transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-foreground">Услуги</span>
            </nav>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Наши услуги
            </h1>
            <p className="text-lg text-muted lg:text-xl">
              Полный цикл производства штамповой оснастки — от проектирования до серийного
              изготовления и сервисного обслуживания.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={service.slug}
                  className={`flex flex-col gap-8 rounded-2xl border border-border bg-surface p-8 lg:flex-row lg:items-center lg:gap-16 lg:p-12 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      <span className="text-4xl font-bold text-surface-light">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mb-6 text-lg text-muted">{service.description}</p>

                    <div className="mb-8 grid gap-2 sm:grid-cols-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Button asChild className="bg-accent text-white hover:bg-accent/90">
                        <Link href={`/services/${service.slug}`}>
                          Подробнее
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-border">
                        <Link href="/quote">Запросить расчёт</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Stats Card */}
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-accent/10 p-8 text-center lg:h-64 lg:w-64">
                    <div className="mb-2 text-5xl font-bold text-accent lg:text-6xl">
                      {service.stats.value}
                    </div>
                    <div className="text-muted">{service.stats.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="border-y border-border bg-surface py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold text-foreground lg:text-3xl">
            Почему выбирают нас
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "25+", label: "Лет на рынке", desc: "Опыт с 1998 года" },
              { value: "1500+", label: "Проектов", desc: "Реализовано успешно" },
              { value: "±0.01", label: "мм точность", desc: "Прецизионное оборудование" },
              { value: "100%", label: "Гарантия", desc: "На всю продукцию" },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background p-6 text-center"
              >
                <div className="mb-2 text-3xl font-bold text-accent">{item.value}</div>
                <div className="mb-1 font-semibold text-foreground">{item.label}</div>
                <div className="text-sm text-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
