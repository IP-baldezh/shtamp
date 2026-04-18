import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Settings, Image as ImageIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "РћР±РѕСЂСѓРґРѕРІР°РЅРёРµ РїСЂРѕРёР·РІРѕРґСЃС‚РІР° | РЁРўРђРњРџ",
  description:
    "РџР°СЂРє СЃРѕРІСЂРµРјРµРЅРЅРѕРіРѕ РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ: СЃС‚Р°РЅРєРё СЃ Р§РџРЈ, СЌР»РµРєС‚СЂРѕСЌСЂРѕР·РёРѕРЅРЅС‹Рµ СЃС‚Р°РЅРєРё, РєРѕРѕСЂРґРёРЅР°С‚РЅРѕ-РёР·РјРµСЂРёС‚РµР»СЊРЅС‹Рµ РјР°С€РёРЅС‹, С‚РµСЂРјРёС‡РµСЃРєРѕРµ РѕР±РѕСЂСѓРґРѕРІР°РЅРёРµ.",
};

const stats = [
  { value: "50+", label: "Р•РґРёРЅРёС† РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ" },
  { value: "2000 РјВІ", label: "РџСЂРѕРёР·РІРѕРґСЃС‚РІРµРЅРЅР°СЏ РїР»РѕС‰Р°РґСЊ" },
  { value: "24/7", label: "Р РµР¶РёРј СЂР°Р±РѕС‚С‹" },
  { value: "ISO 9001", label: "РЎРµСЂС‚РёС„РёРєР°С†РёСЏ" },
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
        {/* Hero section */}
        <section className="relative pb-20">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                РџСЂРѕРёР·РІРѕРґСЃС‚РІРѕ
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                РћР±РѕСЂСѓРґРѕРІР°РЅРёРµ
                <br />
                <span className="text-primary">РЅР°С€РµРіРѕ РїСЂРѕРёР·РІРѕРґСЃС‚РІР°</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                РџР°СЂРє СЃРѕРІСЂРµРјРµРЅРЅРѕРіРѕ РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ РІРµРґСѓС‰РёС…
                РјРёСЂРѕРІС‹С… РїСЂРѕРёР·РІРѕРґРёС‚РµР»РµР№ РѕР±РµСЃРїРµС‡РёРІР°РµС‚ РІС‹СЃРѕРєСѓСЋ
                С‚РѕС‡РЅРѕСЃС‚СЊ Рё РєР°С‡РµСЃС‚РІРѕ РёР·РіРѕС‚РѕРІР»РµРЅРёСЏ РѕСЃРЅР°СЃС‚РєРё.
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
                <p>РћР±РѕСЂСѓРґРѕРІР°РЅРёРµ РЅРµ РґРѕР±Р°РІР»РµРЅРѕ</p>
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
                            <div className="aspect-video overflow-hidden bg-secondary">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                РҐРѕС‚РёС‚Рµ СѓРІРёРґРµС‚СЊ РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                РџСЂРёРіР»Р°С€Р°РµРј РЅР° СЌРєСЃРєСѓСЂСЃРёСЋ РїРѕ РЅР°С€РµРјСѓ
                РїСЂРѕРёР·РІРѕРґСЃС‚РІРµРЅРЅРѕРјСѓ РєРѕРјРїР»РµРєСЃСѓ. РџРѕРєР°Р¶РµРј
                РѕР±РѕСЂСѓРґРѕРІР°РЅРёРµ Рё РїСЂРѕС†РµСЃСЃС‹ РёР·РіРѕС‚РѕРІР»РµРЅРёСЏ.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/contact">
                    Р—Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° СЌРєСЃРєСѓСЂСЃРёСЋ
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
