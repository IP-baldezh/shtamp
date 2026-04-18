import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function ArticlesPreviewSection() {
  noStore();
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, title, excerpt, category, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Блог
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Экспертные статьи</h2>
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
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  {article.category && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                  )}
                </div>

                <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {article.excerpt && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                )}

                {article.published_at && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.published_at).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
