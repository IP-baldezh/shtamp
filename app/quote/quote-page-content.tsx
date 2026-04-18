"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Shield, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "./quote-form";

const trustItems = [
  { icon: Shield, text: "Гарантия качества" },
  { icon: Clock, text: "Ответ за 2 часа" },
  { icon: FileText, text: "Бесплатный расчёт" },
];

export function QuotePageContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Заявка успешно отправлена
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Спасибо за обращение! Наши специалисты изучат вашу заявку и свяжутся с вами в течение 2
            часов в рабочее время для уточнения деталей и расчёта стоимости.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="glow-blue-subtle">
              <Link href="/">На главную</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cases">Посмотреть кейсы</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pb-12">
        <div className="absolute inset-0 industrial-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-foreground">Запрос расчёта</span>
            </nav>
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Бесплатный расчёт
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Запросить расчёт стоимости
            </h1>
            <p className="text-lg text-muted-foreground">
              Заполните форму, и мы подготовим коммерческое предложение в течение 24 часов
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {trustItems.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progress indicator is inside QuoteForm */}
      {/* Steps + Form */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <QuoteForm onSuccess={() => setIsSubmitted(true)} />

          {/* Side info */}
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground">Что ускорит расчёт?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Чертёж детали в формате PDF, DWG или DXF",
                  "3D-модель в формате STEP, IGES или Parasolid",
                  "Указание материала и толщины заготовки",
                  "Планируемый объём производства",
                  "Желаемые сроки изготовления",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <FileText className="mt-0.5 h-4 w-4 text-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
