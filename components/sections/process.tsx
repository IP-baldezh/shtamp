import { FileText, PenTool, Cog, CheckCircle, Truck, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Заявка и анализ",
    description: "Получаем ТЗ или чертежи детали. Анализируем техническую возможность, предлагаем оптимальные решения.",
    duration: "1-2 дня",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Проектирование",
    description: "Разрабатываем 3D-модель штампа, проводим симуляцию, согласовываем конструкцию с заказчиком.",
    duration: "5-10 дней",
  },
  {
    number: "03",
    icon: Cog,
    title: "Изготовление",
    description: "Производим детали штампа на станках с ЧПУ, выполняем термообработку и слесарную сборку.",
    duration: "15-30 дней",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Контроль качества",
    description: "Проверяем все размеры на КИМ, проводим испытания штампа, составляем протокол.",
    duration: "2-3 дня",
  },
  {
    number: "05",
    icon: Truck,
    title: "Отгрузка",
    description: "Упаковываем оснастку, оформляем документацию, организуем доставку до объекта заказчика.",
    duration: "1-2 дня",
  },
  {
    number: "06",
    icon: HeadphonesIcon,
    title: "Сопровождение",
    description: "Помогаем с внедрением, отвечаем на вопросы, при необходимости проводим корректировки.",
    duration: "Бессрочно",
  },
];

export function ProcessSection() {
  return (
    <section className="relative py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Как мы работаем
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Этапы работы над проектом
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Прозрачный процесс с контрольными точками на каждом этапе
          </p>
        </div>

        {/* Process steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" />
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col lg:flex-row lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                  <div className={`rounded-xl border border-border bg-secondary/30 p-6 ${index % 2 === 0 ? "lg:ml-auto" : ""} max-w-md`}>
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{step.duration}</div>
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Center number */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-lg font-bold text-primary-foreground shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Mobile number */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground lg:hidden">
                  {step.number}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
