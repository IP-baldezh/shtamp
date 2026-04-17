import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Award, Target, Heart, Lightbulb, Shield } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "О компании | ШТАМП",
  description: "Компания ШТАМП — более 18 лет на рынке производства штампов и пресс-форм. Собственное производство в Москве, команда опытных инженеров.",
};

const milestones = [
  { year: "2006", title: "Основание компании", description: "Начало работы с небольшой командой и базовым оборудованием" },
  { year: "2010", title: "Расширение производства", description: "Приобретение первых станков с ЧПУ, увеличение площадей" },
  { year: "2014", title: "Сертификация ISO", description: "Внедрение системы менеджмента качества ISO 9001" },
  { year: "2017", title: "Модернизация парка", description: "Закупка электроэрозионного и измерительного оборудования" },
  { year: "2020", title: "Новый цех", description: "Открытие нового производственного корпуса площадью 1000 м²" },
  { year: "2024", title: "Сегодня", description: "Более 500 реализованных проектов, 150+ постоянных клиентов" },
];

const values = [
  {
    icon: Target,
    title: "Качество",
    description: "Строгий контроль на каждом этапе. Готовая оснастка соответствует всем требованиям КД.",
  },
  {
    icon: Users,
    title: "Партнерство",
    description: "Долгосрочные отношения с клиентами. 80% заказов — от постоянных партнеров.",
  },
  {
    icon: Lightbulb,
    title: "Экспертиза",
    description: "Глубокое понимание технологий штамповки. Оптимальные решения для каждой задачи.",
  },
  {
    icon: Shield,
    title: "Надежность",
    description: "Соблюдение сроков и обязательств. Прозрачные условия сотрудничества.",
  },
];

const team = [
  { role: "Главный конструктор", experience: "25 лет опыта", count: 1 },
  { role: "Инженеры-конструкторы", experience: "10-20 лет опыта", count: 5 },
  { role: "Технологи", experience: "15+ лет опыта", count: 3 },
  { role: "Операторы станков ЧПУ", experience: "10+ лет опыта", count: 8 },
  { role: "Слесари-инструментальщики", experience: "15+ лет опыта", count: 6 },
  { role: "Контролеры ОТК", experience: "10+ лет опыта", count: 2 },
];

const stats = [
  { value: "18+", label: "Лет на рынке" },
  { value: "500+", label: "Проектов" },
  { value: "150+", label: "Клиентов" },
  { value: "30+", label: "Специалистов" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Hero section */}
        <section className="relative pb-20">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  О компании
                </div>
                <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                  Производим
                  <br />
                  <span className="text-primary">качественную оснастку</span>
                  <br />
                  с 2006 года
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Компания ШТАМП специализируется на проектировании и изготовлении 
                  штампов холодной штамповки и пресс-форм для литья. За годы работы 
                  мы стали надежным партнером для предприятий различных отраслей.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="glow-blue-subtle" asChild>
                    <Link href="/quote">
                      Обсудить проект
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/equipment">Наше производство</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="text-4xl font-bold text-primary">{stat.value}</div>
                    <div className="mt-2 text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground">Наша миссия</h2>
              <p className="mt-6 text-xl text-muted-foreground">
                Помогать производственным предприятиям выпускать качественную продукцию, 
                обеспечивая их надежной и эффективной технологической оснасткой.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Наши ценности</h2>
              <p className="mt-4 text-muted-foreground">
                Принципы, которыми мы руководствуемся в работе
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">История компании</h2>
              <p className="mt-4 text-muted-foreground">
                Ключевые этапы развития за 18 лет работы
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 hidden h-full w-px bg-border md:block" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative flex gap-8">
                    {/* Year marker */}
                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-sm font-bold text-primary-foreground">
                      {milestone.year}
                    </div>
                    {/* Content */}
                    <div className="flex-1 rounded-xl border border-border bg-secondary/30 p-6">
                      <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                      <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Наша команда</h2>
              <p className="mt-4 text-muted-foreground">
                Опытные специалисты — главный актив компании
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.role}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                      {member.count} чел.
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.experience}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Почему выбирают нас
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Сочетание опыта, современного оборудования и ответственного 
                  подхода к каждому проекту.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Собственное производство полного цикла в Москве",
                    "Современный парк оборудования мировых брендов",
                    "Команда инженеров с опытом 15+ лет",
                    "Сертифицированная система качества ISO 9001",
                    "Гибкие условия и индивидуальный подход",
                    "Техническая поддержка после поставки",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground">
                      <Award className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">
                  Отрасли, с которыми мы работаем
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Автомобильная",
                    "Электротехническая",
                    "Приборостроение",
                    "Бытовая техника",
                    "Машиностроение",
                    "Металлоизделия",
                  ].map((industry) => (
                    <div
                      key={industry}
                      className="rounded-lg border border-border bg-card/50 p-3 text-center text-sm font-medium text-foreground"
                    >
                      {industry}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/industries" className="text-sm text-primary hover:underline">
                    Подробнее об отраслях →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
