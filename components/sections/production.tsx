import Link from "next/link";
import { ArrowRight, Cpu, Zap, Settings, Ruler, Flame, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: Cpu,
    title: "Фрезерная обработка",
    description: "5-осевые станки с ЧПУ",
    specs: ["До 1000×500×500 мм", "Точность 0.005 мм", "DMG MORI, Mazak"],
  },
  {
    icon: Settings,
    title: "Токарная обработка",
    description: "Токарные центры с ЧПУ",
    specs: ["Диаметр до 350 мм", "Длина до 600 мм", "Doosan, Mazak"],
  },
  {
    icon: Zap,
    title: "Электроэрозия",
    description: "Проволочная и прошивная",
    specs: ["Точность 0.002 мм", "Твёрдые сплавы", "Sodick, Mitsubishi"],
  },
  {
    icon: Ruler,
    title: "Шлифование",
    description: "Плоское и координатное",
    specs: ["Ra до 0.1 мкм", "Точность 0.001 мм", "Okamoto, Studer"],
  },
  {
    icon: Flame,
    title: "Термообработка",
    description: "Закалка и азотирование",
    specs: ["До 62 HRC", "Вакуумные печи", "SECO/WARWICK"],
  },
  {
    icon: Wrench,
    title: "Сборка и доводка",
    description: "Слесарный участок",
    specs: ["Полировка Ra 0.05", "Подгонка", "Испытания"],
  },
];

export function ProductionSection() {
  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="absolute inset-0 industrial-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Производство
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Производственные возможности
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Полный цикл изготовления на собственных мощностях с парком 
              современного оборудования ведущих мировых производителей
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/equipment">
              Всё оборудование
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Capabilities grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <capability.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {capability.description}
                  </p>
                </div>
              </div>

              {/* Specs */}
              <ul className="space-y-2">
                {capability.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-8 rounded-2xl border border-border bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "50+", label: "Единиц оборудования" },
            { value: "2000 м²", label: "Производственная площадь" },
            { value: "24/7", label: "Режим работы" },
            { value: "ISO 9001", label: "Сертификация" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
