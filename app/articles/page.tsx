import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Статьи о штамповке и производстве оснастки | ШТАМП",
  description: "Полезные статьи о технологиях штамповки, проектировании штампов, материалах и оборудовании для металлообработки.",
};

const articles = [
  {
    id: "types-of-stamping-dies",
    title: "Виды штампов холодной штамповки: классификация и применение",
    excerpt: "Подробный обзор основных типов штампов: вырубные, гибочные, вытяжные, комбинированные. Области применения и особенности конструкции каждого типа.",
    category: "Технологии",
    date: "15 марта 2024",
    readTime: "8 мин",
    featured: true,
  },
  {
    id: "die-steel-selection",
    title: "Выбор инструментальной стали для штампов",
    excerpt: "Как правильно выбрать материал для формообразующих деталей штампа. Сравнение марок сталей, их свойства и рекомендации по применению.",
    category: "Материалы",
    date: "28 февраля 2024",
    readTime: "10 мин",
    featured: true,
  },
  {
    id: "die-maintenance-guide",
    title: "Руководство по обслуживанию штампов",
    excerpt: "Практические рекомендации по эксплуатации и обслуживанию штамповой оснастки. Как продлить ресурс штампа и снизить затраты на ремонт.",
    category: "Обслуживание",
    date: "10 февраля 2024",
    readTime: "6 мин",
    featured: false,
  },
  {
    id: "progressive-die-design",
    title: "Проектирование последовательных штампов",
    excerpt: "Принципы проектирования многопозиционных штампов. Оптимизация раскладки операций, расчет ленты, выбор конструктивных решений.",
    category: "Проектирование",
    date: "25 января 2024",
    readTime: "12 мин",
    featured: false,
  },
  {
    id: "stamping-defects",
    title: "Типичные дефекты штамповки и способы их устранения",
    excerpt: "Обзор распространенных дефектов при штамповке: задиры, трещины, коробление. Причины возникновения и методы решения проблем.",
    category: "Технологии",
    date: "12 января 2024",
    readTime: "9 мин",
    featured: false,
  },
  {
    id: "hot-runner-systems",
    title: "Горячеканальные системы в пресс-формах",
    excerpt: "Преимущества горячеканальных систем, критерии выбора, основные производители. Экономическое обоснование применения.",
    category: "Пресс-формы",
    date: "5 января 2024",
    readTime: "7 мин",
    featured: false,
  },
  {
    id: "cnc-machining-dies",
    title: "Обработка штампов на станках с ЧПУ",
    excerpt: "Современные технологии механической обработки формообразующих деталей. Стратегии обработки, инструмент, достижимая точность.",
    category: "Оборудование",
    date: "20 декабря 2023",
    readTime: "11 мин",
    featured: false,
  },
  {
    id: "die-simulation-software",
    title: "Программы для симуляции штамповки",
    excerpt: "Обзор CAE-систем для моделирования процессов штамповки: AutoForm, PAM-STAMP, DYNAFORM. Возможности и области применения.",
    category: "Софт",
    date: "8 декабря 2023",
    readTime: "8 мин",
    featured: false,
  },
];

const categories = ["Все", "Технологии", "Материалы", "Проектирование", "Обслуживание", "Пресс-формы", "Оборудование"];

export default function ArticlesPage() {
  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

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
                Блог
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Статьи о штамповке
                <br />
                <span className="text-primary">и производстве</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Полезные материалы о технологиях, материалах и оборудовании 
                для производства штампов и пресс-форм.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured articles */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Рекомендуемые статьи</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <div className="absolute inset-0 industrial-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary/20">СТАТЬЯ</span>
                    </div>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="p-6">
                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-primary">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Читать статью
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All articles */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Все статьи</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  {/* Meta */}
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="text-muted-foreground">{article.readTime}</span>
                  </div>

                  <h3 className="mb-3 font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Подпишитесь на рассылку
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Получайте новые статьи и полезные материалы о производстве оснастки
              </p>
              <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
