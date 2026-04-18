import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export async function CasesPreviewSection() {
  const supabase = await createClient();
  const { data: cases } = await supabase
    .from("cases")
    .select("slug, title, client, industry, description, results")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (!cases || cases.length === 0) return null;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Наши работы
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Реализованные проекты
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Примеры выполненных работ для различных отраслей промышленности
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/cases">
              Все кейсы
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cases grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <Link
              key={caseItem.slug}
              href={`/cases/${caseItem.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl card-hover"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <div className="absolute inset-0 industrial-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
                    <span className="text-lg font-bold text-primary">КЕЙС</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  {caseItem.industry && (
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <Tag className="h-3 w-3" />
                      {industryLabels[caseItem.industry] ?? caseItem.industry}
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {caseItem.title}
                </h3>

                {caseItem.description && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {caseItem.description}
                  </p>
                )}

                {caseItem.results && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {caseItem.results.slice(0, 80)}
                    </div>
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
      </div>
    </section>
  );
}
