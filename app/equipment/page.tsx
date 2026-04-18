import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Settings, Image as ImageIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Оборудование производства",
  description:
    "Парк современного оборудования: станки с ЧПУ, электроэрозионные станки, координатно-измерительные машины, термическое оборудование.",
  alternates: { canonical: "/equipment" },
  openGraph: {
    title: "Оборудование производства | ШТАМП",
    description:
      "Парк современного оборудования: станки с ЧПУ, электроэрозионные станки, КИМ.",
    url: "/equipment",
    type: "website",
  },
};

const stats = [
  { value: "50+", label: "Единиц оборудования" },
  { value: "2000 м²", label: "Производственная площадь" },
  { value: "24/7", label: "Режим работы" },
  { value: "ISO 9001", label: "Сертификация" },
];

export default async function EquipmentPage() {
  const supabase = await createClient();
  const { data: equipment } = await supabase
    .from("equipment")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  // Group by category
  const grouped: Record<string, typeof equipment> = {};
  for (const item of equipment ?? []) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category]!.push(item);
  }
  const categories = Object.entries(grouped);

  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs items={[{ name: "Оборудование" }]} />
          </div>
        </section>
        {/* Hero section */}
        <section className="relative pb-20">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Производство
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Оборудование
                <br />
                <span className="text-primary">нашего производства</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Парк современного оборудования ведущих мировых производителей обеспечивает высокую
                точность и качество изготовления оснастки.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-2 text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment from Supabase */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            {categories.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <Settings className="mx-auto mb-4 h-12 w-12 opacity-30" />
                <p>Оборудование не добавлено</p>
              </div>
            ) : (
              <div className="space-y-16">
                {categories.map(([categoryName, items], index) => (
                  <div key={categoryName}>
                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <Settings className="h-7 w-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{categoryName}</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items!.map((item) => (
                        <div
                          key={item.id}
                          className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50"
                        >
                          {item.image_url ? (
                            <div className="relative aspect-video overflow-hidden bg-secondary">
                              <Image
                                src={item.image_url}
                                alt={item.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="flex aspect-video items-center justify-center bg-secondary/50">
                              <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="p-5">
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            {item.description && (
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                              </p>
                            )}
                            {item.specifications && Object.keys(item.specifications).length > 0 && (
                              <ul className="mt-3 space-y-1">
                                {Object.entries(item.specifications as Record<string, string>).map(
                                  ([k, v]) => (
                                    <li
                                      key={k}
                                      className="flex items-center gap-2 text-xs text-muted-foreground"
                                    >
                                      <Check className="h-3 w-3 shrink-0 text-primary" />
                                      <span className="font-medium">{k}:</span> {v}
                                    </li>
                                  ),
                                )}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {index < categories.length - 1 && <div className="mt-16 section-divider" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Хотите увидеть производство?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Приглашаем на экскурсию по нашему производственному комплексу. Покажем оборудование
                и процессы изготовления.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/contact">
                    Записаться на экскурсию
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
