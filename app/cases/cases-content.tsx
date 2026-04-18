"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Tag, Factory } from "lucide-react";

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string;
  image_url: string;
  status: string;
  featured: boolean;
}

const industryLabels: Record<string, string> = {
  automotive: "Автомобильная",
  aerospace: "Авиакосмос",
  electronics: "Электроника",
  appliances: "Бытовая техника",
  construction: "Строительство",
  medical: "Медицина",
  energy: "Энергетика",
  defense: "ОПК",
};

const serviceLabels: Record<string, string> = {
  stamps: "Штампы",
  molds: "Пресс-формы",
  design: "Проектирование",
  repair: "Ремонт",
};

const industries = [
  "Все",
  "Автомобильная",
  "Авиакосмос",
  "Электроника",
  "Бытовая техника",
  "Строительство",
  "Медицина",
  "Энергетика",
  "ОПК",
];

export function CasesContent({ cases }: { cases: CaseItem[] }) {
  const [activeFilter, setActiveFilter] = useState("Все");

  const getIndustryLabel = (industry: string) => industryLabels[industry] || industry;

  const filteredCases =
    activeFilter === "Все"
      ? cases
      : cases.filter((c) => getIndustryLabel(c.industry) === activeFilter);

  return (
    <>
      {/* Filters */}
      <section className="border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === industry
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {filteredCases.length === 0 ? (
            <div className="py-16 text-center">
              <Factory className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Нет проектов в этой категории
              </h3>
              <p className="text-muted-foreground">Попробуйте выбрать другую отрасль</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.slug}`}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    {caseItem.image_url ? (
                      <img
                        src={caseItem.image_url}
                        alt={caseItem.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 industrial-grid opacity-30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                            <Factory className="h-12 w-12 text-primary" />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Tag className="h-3 w-3" />
                        {getIndustryLabel(caseItem.industry)}
                      </span>
                      {caseItem.services?.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                        >
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {caseItem.title}
                    </h2>

                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {caseItem.description}
                    </p>

                    {caseItem.client && (
                      <div className="mb-4 text-sm text-muted-foreground">
                        Клиент: {caseItem.client}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Подробнее о проекте
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
