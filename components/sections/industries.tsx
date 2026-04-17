import Link from "next/link";
import { ArrowRight, Car, Cpu, Gauge, Home, Factory, Wrench } from "lucide-react";

const industries = [
  {
    icon: Car,
    name: "Автомобильная",
    description: "Штампы для кузовных деталей, элементов подвески, крепежа",
    projects: "120+",
  },
  {
    icon: Cpu,
    name: "Электротехническая",
    description: "Оснастка для электрических контактов, клемм, разъемов",
    projects: "80+",
  },
  {
    icon: Gauge,
    name: "Приборостроение",
    description: "Штампы для корпусов приборов, панелей, экранов",
    projects: "60+",
  },
  {
    icon: Home,
    name: "Бытовая техника",
    description: "Производство деталей для бытовых приборов",
    projects: "50+",
  },
  {
    icon: Factory,
    name: "Машиностроение",
    description: "Штампы для деталей промышленного оборудования",
    projects: "90+",
  },
  {
    icon: Wrench,
    name: "Металлоизделия",
    description: "Общепромышленное производство штампованных деталей",
    projects: "100+",
  },
];

export function IndustriesSection() {
  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Отрасли
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Работаем с разными отраслями
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Опыт производства оснастки для ведущих предприятий различных секторов
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <industry.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground">
                  {industry.projects} проектов
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {industry.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {industry.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/industries" 
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Подробнее об отраслях
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
