import Link from "next/link"
import { ArrowRight, Car, Plane, Zap, Package, Home, Wrench, Settings, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import CTA from "@/components/sections/cta"

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
    icon: Plane,
    title: "Авиационная промышленность",
    slug: "aerospace",
    description:
      "Оснастка для авиационных компонентов с соблюдением строжайших стандартов качества. Сертификация по международным стандартам.",
    products: ["Обшивка фюзеляжа", "Элементы крыла", "Детали шасси", "Интерьерные панели"],
    features: ["Сертификация AS9100", "Трехмерный контроль", "Полная прослеживаемость"],
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
    products: ["Банки и контейнеры", "Крышки и укупорка", "Промышленная тара", "Аэрозольная упаковка"],
    features: ["Высокая производительность", "Гигиенические стандарты", "Оптимизация материала"],
  },
  {
    icon: Home,
    title: "Бытовая техника",
    slug: "appliances",
    description:
      "Штамповая оснастка для производства корпусов и компонентов бытовой техники: холодильников, стиральных машин, кухонного оборудования.",
    products: ["Корпуса техники", "Панели управления", "Внутренние элементы", "Декоративные детали"],
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
]

export const metadata = {
  title: "Отрасли применения | СтампМастер",
  description:
    "Производим штампы и пресс-формы для автомобильной, авиационной, электротехнической, упаковочной промышленности и других отраслей",
}

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
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
              <span className="text-foreground">Отрасли</span>
            </nav>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Отрасли применения
            </h1>
            <p className="text-lg text-muted lg:text-xl">
              Более 25 лет мы производим штамповую оснастку для ведущих предприятий различных
              отраслей промышленности. Наш опыт — ваше конкурентное преимущество.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:border-accent/50 hover:shadow-lg"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mb-3 text-xl font-bold text-foreground lg:text-2xl">
                    {industry.title}
                  </h2>
                  <p className="mb-6 text-muted">{industry.description}</p>

                  <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                        Продукция
                      </h3>
                      <ul className="space-y-1">
                        {industry.products.map((product, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="h-1 w-1 rounded-full bg-accent" />
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                        Особенности
                      </h3>
                      <ul className="space-y-1">
                        {industry.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="h-1 w-1 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/cases?industry=${industry.slug}`}
                    className="inline-flex items-center gap-2 text-accent transition-colors hover:underline"
                  >
                    Смотреть кейсы отрасли
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-surface py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "8+", label: "Отраслей" },
              { value: "200+", label: "Клиентов" },
              { value: "1500+", label: "Проектов" },
              { value: "25", label: "Лет опыта" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent lg:text-5xl">{stat.value}</div>
                <div className="text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-accent/10 p-8 text-center lg:p-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
              Не нашли свою отрасль?
            </h2>
            <p className="mb-8 text-lg text-muted">
              Мы работаем с широким спектром производств. Расскажите о вашей задаче — найдём
              оптимальное решение.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-accent text-white hover:bg-accent/90">
                <Link href="/quote">Запросить консультацию</Link>
              </Button>
              <Button asChild variant="outline" className="border-border">
                <Link href="/contact">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
