import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CTASection } from "@/components/sections/cta";
import { createClient } from "@/lib/supabase/server";
import { CasesContent } from "./cases-content";

export const metadata = {
  title: "Реализованные проекты | ШТАМП",
  description:
    "Примеры выполненных работ для предприятий различных отраслей. Каждый проект — индивидуальное решение под задачи клиента.",
};

export default async function CasesPage() {
  const supabase = await createClient();
  const { data: cases } = await supabase
    .from("cases")
    .select("*")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
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
                Примеры выполненных работ для предприятий различных отраслей. Каждый проект — это
                индивидуальное решение под задачи клиента.
              </p>
            </div>
          </div>
        </section>

        <CasesContent cases={cases ?? []} />

        <section className="bg-secondary/30 py-16">
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
      <SiteFooter />
    </>
  );
}
