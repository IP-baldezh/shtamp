import Link from "next/link";
import { ArrowRight, Layers, PenTool, Wrench, Box } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Layers,
    title: "Изготовление штампов",
    description: "Штампы холодной штамповки: вырубные, гибочные, вытяжные, комбинированные. Любая сложность и серийность.",
    features: ["Последовательные штампы", "Совмещенные штампы", "Штампы-автоматы", "Мелкосерийное производство"],
    href: "/services/stamps",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: PenTool,
    title: "Проектирование",
    description: "Полный цикл конструкторских работ: от анализа детали до выпуска рабочей документации.",
    features: ["3D-моделирование", "Расчет технологии", "КД по ЕСКД", "Симуляция штамповки"],
    href: "/services/design",
    accent: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Wrench,
    title: "Ремонт и модернизация",
    description: "Восстановление работоспособности оснастки, увеличение ресурса, оптимизация конструкции.",
    features: ["Диагностика износа", "Замена рабочих частей", "Модернизация", "Восстановление геометрии"],
    href: "/services/repair",
    accent: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Box,
    title: "Пресс-формы",
    description: "Формы для литья пластмасс под давлением и для литья металлов.",
    features: ["Литье пластмасс", "Литье алюминия", "Горячеканальные системы", "Многоместные формы"],
    href: "/services/molds",
    accent: "from-green-500/20 to-emerald-500/20",
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Наши услуги
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Полный цикл производства оснастки
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            От проектирования до запуска в производство — все этапы под ключ
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
              
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mb-6 text-muted-foreground">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mb-6 grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/quote">
              Обсудить проект
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
