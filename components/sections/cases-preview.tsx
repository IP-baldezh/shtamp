import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
  {
    id: 1,
    title: "Штамп последовательного действия для автомобильных деталей",
    client: "Крупный автопроизводитель",
    industry: "Автомобильная",
    description: "Разработка и изготовление 12-позиционного штампа для производства кронштейнов подвески.",
    results: ["Производительность: 60 уд/мин", "Ресурс: 2 млн деталей", "Срок изготовления: 45 дней"],
    image: "/cases/case-1.jpg",
    href: "/cases/automotive-bracket-stamp",
  },
  {
    id: 2,
    title: "Пресс-форма для литья корпусных деталей",
    client: "Производитель электроники",
    industry: "Электротехническая",
    description: "Многоместная пресс-форма с горячеканальной системой для литья корпусов приборов.",
    results: ["4 гнезда", "Цикл: 25 секунд", "Ресурс: 500 000 циклов"],
    image: "/cases/case-2.jpg",
    href: "/cases/electronics-housing-mold",
  },
  {
    id: 3,
    title: "Комплект штампов для производства контактов",
    client: "Электротехнический завод",
    industry: "Приборостроение",
    description: "Серия штампов для вырубки и гибки электрических контактов различных типоразмеров.",
    results: ["8 типов деталей", "Точность: ±0.02 мм", "Производительность: 120 уд/мин"],
    image: "/cases/case-3.jpg",
    href: "/cases/electrical-contacts-stamps",
  },
];

export function CasesPreviewSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Наши работы
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Реализованные проекты
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Примеры выполненных работ для различных отраслей промышленности
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/cases">
              Все кейсы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cases grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={caseItem.href}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl card-hover"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <div className="absolute inset-0 industrial-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-primary">КЕЙС #{caseItem.id}</span>
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Tag className="h-3 w-3" />
                    {caseItem.industry}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {caseItem.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {caseItem.description}
                </p>

                {/* Results */}
                <div className="mb-4 space-y-1">
                  {caseItem.results.slice(0, 2).map((result) => (
                    <div key={result} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {result}
                    </div>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  Подробнее о проекте
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
