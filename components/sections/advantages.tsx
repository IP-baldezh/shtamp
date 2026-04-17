import { Factory, Users, Zap, Shield, Clock, Award, Cog, HeadphonesIcon } from "lucide-react";

const advantages = [
  {
    icon: Factory,
    title: "Собственное производство",
    description: "Полный цикл изготовления на собственных мощностях в Москве. Контроль качества на каждом этапе.",
  },
  {
    icon: Users,
    title: "Опытная команда",
    description: "Инженеры и технологи с опытом 15+ лет. Экспертиза в сложных проектах для разных отраслей.",
  },
  {
    icon: Zap,
    title: "Современное оборудование",
    description: "Станки с ЧПУ, координатно-измерительные машины, электроэрозионная обработка.",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Сертификация ISO 9001:2015. Контроль качества по всем параметрам КД.",
  },
  {
    icon: Clock,
    title: "Соблюдение сроков",
    description: "Фиксированные сроки в договоре. Прозрачный график производства с отчетами.",
  },
  {
    icon: Award,
    title: "Техническая поддержка",
    description: "Сопровождение на этапе внедрения. Консультации и доработки при необходимости.",
  },
  {
    icon: Cog,
    title: "Гибкость производства",
    description: "Работаем с единичными заказами и серийным производством. Адаптируемся под задачи клиента.",
  },
  {
    icon: HeadphonesIcon,
    title: "Персональный менеджер",
    description: "Выделенный специалист на весь проект. Оперативная связь и решение вопросов.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="relative py-24 bg-secondary/30">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Почему мы
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Преимущества работы с нами
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Комплексный подход к производству оснастки с гарантией результата
          </p>
        </div>

        {/* Advantages grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg card-hover"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <advantage.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {advantage.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
