"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Tag, Factory } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta";

const cases = [
  {
    id: "automotive-bracket-stamp",
    title: "Штамп последовательного действия для кронштейнов подвески",
    client: "Крупный автопроизводитель",
    industry: "Автомобильная",
    type: "Последовательный штамп",
    description: "Разработка и изготовление 12-позиционного штампа для серийного производства кронштейнов подвески автомобиля.",
    results: [
      "Производительность: 60 ударов/мин",
      "Ресурс: 2 000 000 деталей",
      "Срок изготовления: 45 дней",
    ],
    specs: {
      material: "Сталь 08кп, толщина 2 мм",
      positions: "12 позиций",
      dimensions: "800×600×450 мм",
    },
  },
  {
    id: "electronics-housing-mold",
    title: "Пресс-форма для корпусов электронных приборов",
    client: "Производитель электроники",
    industry: "Электротехническая",
    type: "Пресс-форма",
    description: "Многоместная пресс-форма с горячеканальной системой для литья корпусов измерительных приборов.",
    results: [
      "4 гнезда",
      "Цикл литья: 25 секунд",
      "Ресурс: 500 000 циклов",
    ],
    specs: {
      material: "ABS-пластик",
      hotRunner: "YUDO",
      dimensions: "500×400×380 мм",
    },
  },
  {
    id: "electrical-contacts-stamps",
    title: "Комплект штампов для электрических контактов",
    client: "Электротехнический завод",
    industry: "Приборостроение",
    type: "Комплект штампов",
    description: "Серия из 8 штампов для вырубки и гибки электрических контактов различных типоразмеров.",
    results: [
      "8 типов деталей",
      "Точность: ±0.02 мм",
      "Производительность: 120 уд/мин",
    ],
    specs: {
      material: "Латунь Л63, толщина 0.5 мм",
      quantity: "8 штампов",
      accuracy: "IT9",
    },
  },
  {
    id: "appliance-panel-stamp",
    title: "Штамп для панелей бытовой техники",
    client: "Производитель бытовой техники",
    industry: "Бытовая техника",
    type: "Вытяжной штамп",
    description: "Штамп для вытяжки декоративных панелей стиральных машин с последующей вырубкой отверстий.",
    results: [
      "Глубина вытяжки: 45 мм",
      "Ресурс: 800 000 деталей",
      "Срок изготовления: 60 дней",
    ],
    specs: {
      material: "Сталь 08Ю, толщина 0.8 мм",
      operations: "Вытяжка + пробивка",
      dimensions: "1200×800×600 мм",
    },
  },
  {
    id: "aluminum-housing-mold",
    title: "Пресс-форма для литья алюминиевых корпусов",
    client: "Машиностроительный завод",
    industry: "Машиностроение",
    type: "Пресс-форма для МЛПД",
    description: "Пресс-форма для литья под давлением корпусов редукторов из алюминиевого сплава.",
    results: [
      "Масса отливки: 1.2 кг",
      "Ресурс: 80 000 циклов",
      "Цикл: 45 секунд",
    ],
    specs: {
      material: "АК12",
      cooling: "Конформное охлаждение",
      dimensions: "600×500×420 мм",
    },
  },
  {
    id: "progressive-die-fasteners",
    title: "Штамп-автомат для крепежных элементов",
    client: "Метизный завод",
    industry: "Металлоизделия",
    type: "Штамп-автомат",
    description: "Высокоскоростной штамп для производства пружинных шайб и крепежных элементов.",
    results: [
      "Скорость: 200 уд/мин",
      "Ресурс: 10 000 000 деталей",
      "Автовыгрузка",
    ],
    specs: {
      material: "Сталь 65Г, толщина 1.5 мм",
      automation: "Автоподача + автовыгрузка",
      dimensions: "400×350×300 мм",
    },
  },
];

const industries = ["Все", "Автомобильная", "Электротехническая", "Приборостроение", "Бытовая техника", "Машиностроение", "Металлоизделия"];

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState("Все");

  const filteredCases = activeFilter === "Все" 
    ? cases 
    : cases.filter(c => c.industry === activeFilter);

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Hero section */}
        <section className="relative pb-16">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Портфолио
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Реализованные
                <br />
                <span className="text-primary">проекты</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Примеры выполненных работ для предприятий различных отраслей. 
                Каждый проект — это индивидуальное решение под задачи клиента.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
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
              <div className="text-center py-16">
                <Factory className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Нет проектов в этой категории</h3>
                <p className="text-muted-foreground">Попробуйте выбрать другую отрасль</p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-2">
                {filteredCases.map((caseItem) => (
                  <Link
                    key={caseItem.id}
                    href={`/cases/${caseItem.id}`}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <div className="absolute inset-0 industrial-grid opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                          <Factory className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <Tag className="h-3 w-3" />
                          {caseItem.industry}
                        </span>
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                          {caseItem.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {caseItem.title}
                      </h2>

                      {/* Description */}
                      <p className="mb-4 text-muted-foreground line-clamp-2">
                        {caseItem.description}
                      </p>

                      {/* Results */}
                      <div className="mb-4 space-y-1">
                        {caseItem.results.slice(0, 2).map((result) => (
                          <div key={result} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
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
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "500+", label: "Проектов выполнено" },
                { value: "150+", label: "Довольных клиентов" },
                { value: "6", label: "Отраслей" },
                { value: "99%", label: "Проектов в срок" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-2 text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
