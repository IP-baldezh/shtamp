import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CTASection } from "@/components/sections/cta";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) {
    return { title: "Статья не найдена | ШТАМП" };
  }

  return {
    title: `${article.title} | ШТАМП`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!article) {
    notFound();
  }

  // Related articles (same category, excluding current)
  const { data: related } = await supabase
    .from("articles")
    .select("slug, title, category")
    .eq("status", "published")
    .eq("category", article.category)
    .neq("slug", slug)
    .limit(3);

  const paragraphs = article.content
    ? article.content.split("\n").filter((p: string) => p.trim())
    : [];

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Все статьи
            </Link>
          </div>
        </section>

        <article className="pb-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              {article.category && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  <Tag className="h-3 w-3" />
                  {article.category}
                </span>
              )}
              {article.published_at && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.published_at).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>
            )}

            <div className="mt-6 flex items-center justify-between border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-bold text-primary">
                    {article.author?.[0]?.toUpperCase() ?? "А"}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{article.author ?? "Редакция"}</div>
                  <div className="text-sm text-muted-foreground">Эксперт по штамповке</div>
                </div>
              </div>
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {article.image_url && (
              <div className="mt-8 overflow-hidden rounded-2xl">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            <div className="mt-8 space-y-4">
              {paragraphs.map((paragraph: string, index: number) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="mt-8 mb-4 text-2xl font-bold text-foreground">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("# ")) {
                  return (
                    <h3 key={index} className="mt-6 mb-3 text-xl font-bold text-foreground">
                      {paragraph.replace("# ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        {related && related.length > 0 && (
          <section className="py-16 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-8 text-2xl font-bold text-foreground">Похожие статьи</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/articles/${rel.slug}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
                  >
                    {rel.category && (
                      <div className="mb-3 text-sm text-primary">{rel.category}</div>
                    )}
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
