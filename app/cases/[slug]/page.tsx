import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Tag, Clock, Factory, Target, Ruler } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { notFound } from "next/navigation";

// Sample case data - in production this would come from a CMS or database
const casesData: Record<string, {
  title: string;
  client: string;
  industry: string;
  type: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  specs: Record<string, string>;
  timeline: string;
  gallery: string[];
}> = {
  "automotive-bracket-stamp": {
    title: "Штамп последовательного действия для кронштейнов подвески",
    client: "Крупный автопроизводитель",
    industry: "Автомобильная",
    type: "Последовательный штамп",
    description: "Разработка и изготовление 12-позиционного штампа для серийного производства кронштейнов подвески автомобиля.",
    challenge: "Заказчику требовался высокопроизводительный штамп для выпуска кронштейнов подвески с жесткими допусками. Деталь имеет сложную геометрию с множеством отверстий и гибов. Необходимо было обеспечить стабильное качество при массовом производстве и ресурс не менее 2 млн деталей.",
    solution: "Разработан 12-позиционный штамп последовательного действия с оптимальной раскладкой операций. Применены твердосплавные вставки на режущих элементах для увеличения ресурса. Предусмотрена система автоматического контроля подачи ленты и датчики положения детали.",
    results: [
      "Производительность: 60 ударов в минуту",
      "Ресурс штампа: 2 000 000 деталей до переточки",
      "Точность размеров: ±0.05 мм",
      "Срок изготовления: 45 рабочих дней",
      "Снижение брака на 40% по сравнению с предыдущей оснасткой",
    ],
    specs: {
      "Материал детали": "Сталь 08кп, толщина 2 мм",
      "Количество позиций": "12",
      "Габариты штампа": "800×600×450 мм",
      "Масса штампа": "850 кг",
      "Усилие пресса": "160 тонн",
      "Шаг подачи": "85 мм",
    },
    timeline: "45 дней",
    gallery: ["/cases/automotive-1.jpg", "/cases/automotive-2.jpg", "/cases/automotive-3.jpg"],
  },
  "electronics-housing-mold": {
    title: "Пресс-форма для корпусов электронных приборов",
    client: "Производитель электроники",
    industry: "Электротехническая",
    type: "Пресс-форма",
    description: "Многоместная пресс-форма с горячеканальной системой для литья корпусов измерительных приборов.",
    challenge: "Необходимо было разработать пресс-форму для производства корпусов с высокими требованиями к качеству поверхности и точности размеров. Корпус имеет тонкие стенки, защелки и посадочные места под электронику.",
    solution: "Спроектирована 4-гнездная пресс-форма с горячеканальной системой YUDO. Применена конформная система охлаждения для равномерного отвода тепла. Формообразующие изготовлены из стали 1.2343 с полировкой до Ra 0.2.",
    results: [
      "Цикл литья: 25 секунд",
      "Ресурс формы: 500 000 циклов",
      "Качество поверхности: класс А",
      "Точность размеров: ±0.1 мм",
      "Выход годных: 99.5%",
    ],
    specs: {
      "Материал изделия": "ABS-пластик",
      "Количество гнезд": "4",
      "Горячий канал": "YUDO, 4 точки впрыска",
      "Габариты формы": "500×400×380 мм",
      "Масса формы": "420 кг",
      "Усилие смыкания": "250 тонн",
    },
    timeline: "60 дней",
    gallery: ["/cases/electronics-1.jpg", "/cases/electronics-2.jpg"],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseData = casesData[slug];
  
  if (!caseData) {
    return { title: "Кейс не найден | ШТАМП" };
  }

  return {
    title: `${caseData.title} | ШТАМП`,
    description: caseData.description,
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseData = casesData[slug];

  if (!caseData) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Breadcrumb */}
        <section className="pb-8">
          <div className="mx-auto max-w-7xl px-6">
            <Link 
              href="/cases" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Все кейсы
            </Link>
          </div>
        </section>

        {/* Hero section */}
        <section className="relative pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Tag className="h-3 w-3" />
                    {caseData.industry}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                    {caseData.type}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                  {caseData.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  {caseData.description}
                </p>

                {/* Quick stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Срок</span>
                    </div>
                    <div className="mt-1 text-xl font-bold text-foreground">{caseData.timeline}</div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Factory className="h-4 w-4" />
                      <span className="text-sm">Отрасль</span>
                    </div>
                    <div className="mt-1 text-xl font-bold text-foreground">{caseData.industry}</div>
                  </div>
                </div>
              </div>

              {/* Image placeholder */}
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-secondary lg:aspect-square">
                <div className="absolute inset-0 industrial-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm text-center">
                    <Factory className="mx-auto h-16 w-16 text-primary" />
                    <p className="mt-2 text-muted-foreground">Фото проекта</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <Target className="h-5 w-5 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Задача</h2>
                </div>
                <p className="text-muted-foreground">{caseData.challenge}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Решение</h2>
                </div>
                <p className="text-muted-foreground">{caseData.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Результаты</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseData.results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center gap-3">
              <Ruler className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Технические характеристики</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(caseData.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-xl border border-border bg-secondary/30 p-4"
                >
                  <div className="text-sm text-muted-foreground">{key}</div>
                  <div className="mt-1 font-semibold text-foreground">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Нужен похожий проект?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Отправьте заявку и получите расчет стоимости в течение 1-2 дней
                  </p>
                </div>
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Запросить расчет
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
