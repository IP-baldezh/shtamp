import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuotePageContent } from "./quote-page-content";

export const metadata: Metadata = {
  title: "Запросить расчёт стоимости",
  description:
    "Отправьте техническое задание и получите коммерческое предложение на изготовление штампов или пресс-форм. Бесплатный расчёт в течение 1 рабочего дня.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Запросить расчёт стоимости | ШТАМП",
    description: "Отправьте техническое задание и получите бесплатное коммерческое предложение.",
    url: "/quote",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function QuotePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-32">
        <QuotePageContent />
      </main>
      <SiteFooter />
    </>
  );
}
