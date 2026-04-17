const stats = [
  {
    value: "18+",
    label: "Лет на рынке",
    description: "Опыт с 2006 года",
  },
  {
    value: "500+",
    label: "Проектов",
    description: "Выполненных работ",
  },
  {
    value: "150+",
    label: "Клиентов",
    description: "Довольных партнеров",
  },
  {
    value: "99%",
    label: "Точность",
    description: "Соответствие КД",
  },
  {
    value: "30+",
    label: "Специалистов",
    description: "В штате компании",
  },
  {
    value: "2000м²",
    label: "Производство",
    description: "Площадь цехов",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Цифры и факты
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Наши достижения в цифрах
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative text-center"
            >
              {/* Decorative line */}
              <div className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="pt-8">
                <div className="text-5xl font-bold text-foreground md:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
