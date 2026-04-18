"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { ArrowRight, Tag, Factory, Loader2 } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CTASection } from "@/components/sections/cta"

interface CaseItem {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  services: string[]
  description: string
  challenge: string
  solution: string
  results: string
  image_url: string
  status: string
  featured: boolean
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
}

const serviceLabels: Record<string, string> = {
  stamps: "Штампы",
  molds: "Пресс-формы",
  design: "Проектирование",
  repair: "Ремонт",
}

// Fallback static cases for demo
const staticCases = [
  {
    id: "automotive-bracket-stamp",
    slug: "automotive-bracket-stamp",
    title: "Штамп последовательного действия для кронштейнов подвески",
    client: "Крупный автопроизводитель",
    industry: "automotive",
    services: ["stamps", "design"],
    description: "Разработка и изготовление 12-позиционного штампа для серийного производства кронштейнов подвески автомобиля.",
    challenge: "",
    solution: "",
    results: "Производительность: 60 ударов/мин, Ресурс: 2 000 000 деталей",
    image_url: "",
    status: "published",
    featured: true,
  },
  {
    id: "electronics-housing-mold",
    slug: "electronics-housing-mold",
    title: "Пресс-форма для корпусов электронных приборов",
    client: "Производитель электроники",
    industry: "electronics",
    services: ["molds", "design"],
    description: "Многоместная пресс-форма с горячеканальной системой для литья корпусов измерительных приборов.",
    challenge: "",
    solution: "",
    results: "4 гнезда, Цикл литья: 25 секунд, Ресурс: 500 000 циклов",
    image_url: "",
    status: "published",
    featured: true,
  },
  {
    id: "appliance-panel-stamp",
    slug: "appliance-panel-stamp",
    title: "Штамп для панелей бытовой техники",
    client: "Производитель бытовой техники",
    industry: "appliances",
    services: ["stamps"],
    description: "Штамп для вытяжки декоративных панелей стиральных машин с последующей вырубкой отверстий.",
    challenge: "",
    solution: "",
    results: "Глубина вытяжки: 45 мм, Ресурс: 800 000 деталей",
    image_url: "",
    status: "published",
    featured: false,
  },
]

const industries = ["Все", "Автомобильная", "Авиакосмос", "Электроника", "Бытовая техника", "Строительство", "Медицина", "Энергетика", "ОПК"]

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState("Все")
  const [cases, setCases] = useState<CaseItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCases = async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("status", "published")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })

      if (error || !data || data.length === 0) {
        // Use static cases as fallback
        setCases(staticCases)
      } else {
        setCases(data)
      }
      setIsLoading(false)
    }

    fetchCases()
  }, [supabase])

  const getIndustryLabel = (industry: string) => {
    return industryLabels[industry] || industry
  }

  const filteredCases = activeFilter === "Все" 
    ? cases 
    : cases.filter(c => getIndustryLabel(c.industry) === activeFilter)

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
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredCases.length === 0 ? (
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
                    href={`/cases/${caseItem.slug}`}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      {caseItem.image_url ? (
                        <img 
                          src={caseItem.image_url} 
                          alt={caseItem.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
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

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <Tag className="h-3 w-3" />
                          {getIndustryLabel(caseItem.industry)}
                        </span>
                        {caseItem.services?.map((service) => (
                          <span key={service} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                            {serviceLabels[service] || service}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {caseItem.title}
                      </h2>

                      {/* Description */}
                      <p className="mb-4 text-muted-foreground line-clamp-2">
                        {caseItem.description}
                      </p>

                      {/* Client */}
                      {caseItem.client && (
                        <div className="mb-4 text-sm text-muted-foreground">
                          Клиент: {caseItem.client}
                        </div>
                      )}

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
                { value: "8", label: "Отраслей" },
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
  )
}
