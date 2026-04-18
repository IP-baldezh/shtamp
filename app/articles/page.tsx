import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, FileText } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CTASection } from "@/components/sections/cta";
import { createClient } from "@/lib/supabase/server";
import { ArticlesFilter } from "./articles-filter";

export const metadata: Metadata = {
  title: "Статьи о штамповке и производстве оснастки | ШТАМП",
  description:
    "Полезные статьи о технологиях штамповки, проектировании штампов, материалах и оборудовании для металлообработки.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const supabase = await createClient();

  // Fetch all published articles
  let query = supabase
    .from("articles")
    .select("slug, title, excerpt, category, published_at, author")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (category && category !== "Все") {
    query = query.eq("category", category);
  }

  const { data: articles } = await query;

  // Get unique categories from all published articles
  const { data: allArticles } = await supabase
    .from("articles")
    .select("category")
    .eq("status", "published")
    .not("category", "is", null);

  const categories = [
    "Все",
    ...Array.from(new Set(allArticles?.map((a) => a.category).filter(Boolean) ?? [])),
  ];

  return (
    <>
      <SiteHeader />
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
                Полезные материалы о технологиях, материалах и оборудовании для производства штампов
                и пресс-форм.
              </p>
            </div>
          </div>
        </section>

        {/* Category filter */}
        <ArticlesFilter categories={categories} activeCategory={category ?? "Все"} />

        {/* Articles grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            {articles && articles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl"
                  >
                    <div className="relative aspect-video bg-secondary">
                      <div className="absolute inset-0 industrial-grid opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-xl border border-border bg-card/80 p-3 backdrop-blur-sm">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                        {article.category && (
                          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <Tag className="h-3 w-3" />
                            {article.category}
                          </span>
                        )}
                      </div>

                      <h3 className="mb-3 font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {article.excerpt && (
                        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {article.published_at && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(article.published_at).toLocaleDateString("ru-RU")}
                          </span>
                        )}
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1 ml-auto" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {category && category !== "Все"
                    ? `Нет статей в категории "${category}"`
                    : "Статьи пока не добавлены"}
                </h3>
                <p className="text-muted-foreground">Загляните позже</p>
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
