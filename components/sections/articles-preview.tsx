import Link from "next/link";
import { ArrowRight, Calendar, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    slug: "how-to-choose-stamp-manufacturer",
    title: "Как выбрать производителя штампов: 7 ключевых критериев",
    excerpt: "Практическое руководство по выбору надёжного подрядчика для изготовления штамповой оснастки. Рассматриваем производственные мощности, опыт и гарантии.",
    category: "Руководства",
    readTime: "8 мин",
    date: "15 марта 2024",
  },
  {
    slug: "repair-vs-new-stamp",
    title: "Когда ремонт штампа выгоднее изготовления нового",
    excerpt: "Анализ экономической целесообразности ремонта vs замены оснастки. Критерии принятия решения и расчёт рентабельности.",
    category: "Аналитика",
    readTime: "6 мин",
    date: "10 марта 2024",
  },
  {
    slug: "stamp-resource-increase",
    title: "5 способов увеличить ресурс штамповой оснастки",
    excerpt: "Проверенные методы продления срока службы штампов: выбор материалов, покрытия, режимы эксплуатации и профилактическое обслуживание.",
    category: "Технологии",
    readTime: "10 мин",
    date: "5 марта 2024",
  },
];

export function ArticlesPreviewSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Блог
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Экспертные статьи
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Делимся опытом и знаниями в области штамповки и инструментального производства
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/articles">
              Все статьи
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Articles grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl"
            >
              {/* Image placeholder */}
              <div className="relative aspect-video bg-secondary">
                <div className="absolute inset-0 industrial-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl border border-border bg-card/80 p-3 backdrop-blur-sm">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Date */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
