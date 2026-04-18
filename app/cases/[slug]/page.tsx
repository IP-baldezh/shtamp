import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Tag, Factory, Target } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const dynamic = "force-dynamic";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("cases")
    .select("title, description, image_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Кейс не найден" };

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/cases/${slug}` },
    openGraph: {
      title: `${data.title} | ШТАМП`,
      description: data.description ?? undefined,
      url: `/cases/${slug}`,
      type: "article",
      ...(data.image_url ? { images: [{ url: data.image_url }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | ШТАМП`,
      description: data.description ?? undefined,
      ...(data.image_url ? { images: [data.image_url] } : {}),
    },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: caseData } = await supabase
    .from("cases")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!caseData) {
    notFound();
  }

  // Results as list — split by newlines or commas
  const resultsList: string[] = caseData.results
    ? caseData.results
        .split(/\n|,/)
        .map((r: string) => r.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs items={[{ name: "Проекты", href: "/cases" }, { name: caseData.title }]} />
          </div>
        </section>

        {/* Hero */}
        <section className="relative pb-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {caseData.industry && (
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {industryLabels[caseData.industry] ?? caseData.industry}
                    </span>
                  )}
                  {caseData.services?.map((s: string) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                    >
                      {serviceLabels[s] ?? s}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl font-bold text-foreground md:text-4xl">{caseData.title}</h1>
                {caseData.description && (
                  <p className="mt-4 text-lg text-muted-foreground">{caseData.description}</p>
                )}

                {caseData.client && (
                  <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                    <Factory className="h-4 w-4" />
                    <span>Клиент: {caseData.client}</span>
                  </div>
                )}
              </div>

              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-secondary lg:aspect-square">
                {caseData.image_url ? (
                  <Image
                    src={caseData.image_url}
                    alt={caseData.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 industrial-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm text-center">
                        <Factory className="mx-auto h-16 w-16 text-primary" />
                        <p className="mt-2 text-muted-foreground">Фото проекта</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        {(caseData.challenge || caseData.solution) && (
          <section className="py-16 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid gap-8 lg:grid-cols-2">
                {caseData.challenge && (
                  <div className="rounded-xl border border-border bg-card p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                        <Target className="h-5 w-5 text-orange-500" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">Задача</h2>
                    </div>
                    <p className="text-muted-foreground">{caseData.challenge}</p>
                  </div>
                )}
                {caseData.solution && (
                  <div className="rounded-xl border border-border bg-card p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">Решение</h2>
                    </div>
                    <p className="text-muted-foreground">{caseData.solution}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {resultsList.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="mb-8 text-2xl font-bold text-foreground">Результаты</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resultsList.map((result, index) => (
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
        )}

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Нужен похожий проект?</h3>
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
      <SiteFooter />
    </>
  );
}
