import { 
  PlusCircle, 
  Wrench, 
  Rotate3D, 
  Zap, 
  RefreshCw, 
  Settings, 
  TrendingUp, 
  HeadphonesIcon 
} from "lucide-react";

const tasks = [
  {
    icon: PlusCircle,
    title: "Изготовление нового штампа",
    description: "Разработка и производство штамповой оснастки с нуля по вашим чертежам или образцу детали.",
  },
  {
    icon: Wrench,
    title: "Ремонт изношенной оснастки",
    description: "Восстановление работоспособности штампов и пресс-форм, замена изношенных элементов.",
  },
  {
    icon: Rotate3D,
    title: "Реверс-инжиниринг по образцу",
    description: "Создание 3D-модели и чертежей по готовой детали для последующего изготовления оснастки.",
  },
  {
    icon: Zap,
    title: "Срочная доработка",
    description: "Оперативная модификация оснастки при изменении конструкции изделия или устранении дефектов.",
  },
  {
    icon: RefreshCw,
    title: "Импортозамещение",
    description: "Замена зарубежных штампов и пресс-форм отечественными аналогами без потери качества.",
  },
  {
    icon: Settings,
    title: "Нестандартный проект",
    description: "Решение сложных инженерных задач, разработка уникальной технологической оснастки.",
  },
  {
    icon: TrendingUp,
    title: "Повышение ресурса",
    description: "Модернизация оснастки для увеличения срока службы и снижения затрат на обслуживание.",
  },
  {
    icon: HeadphonesIcon,
    title: "Сопровождение запуска",
    description: "Техническая поддержка при внедрении оснастки в производство, обучение персонала.",
  },
];

export function TasksSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Решаем задачи
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Какие задачи мы решаем
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            От типовых проектов до сложных инженерных решений — 
            подберём оптимальный вариант под ваши требования
          </p>
        </div>

        {/* Tasks grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <task.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
