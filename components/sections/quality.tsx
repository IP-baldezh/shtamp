import Link from "next/link";
import { ArrowRight, Shield, Ruler, FileCheck, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const qualitySteps = [
  {
    icon: FileCheck,
    title: "Входной контроль",
    description: "Проверка материалов и комплектующих перед запуском в производство",
    items: ["Проверка сертификатов", "Контроль размеров", "Анализ твёрдости"],
  },
  {
    icon: Ruler,
    title: "Операционный контроль",
    description: "Контроль геометрии и размеров на каждом этапе изготовления",
    items: ["Измерения на КИМ", "Контроль шероховатости", "Проверка допусков"],
  },
  {
    icon: Shield,
    title: "Финальный контроль",
    description: "Комплексная проверка готового изделия перед отгрузкой",
    items: ["Сборка и проверка", "Испытания штампа", "Протоколы измерений"],
  },
  {
    icon: Award,
    title: "Документация",
    description: "Полный комплект документов качества на каждый проект",
    items: ["Паспорт изделия", "Протоколы КИМ", "Акт испытаний"],
  },
];

const certifications = [
  "ISO 9001:2015",
  "ГОСТ Р ИСО 9001-2015",
  "Сертификат соответствия",
];

export function QualitySection() {
  return (
    <section className="relative py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Качество
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Контроль качества на каждом этапе
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Многоступенчатая система контроля гарантирует соответствие 
              готовой оснастки требованиям конструкторской документации.
            </p>

            {/* Certifications */}
            <div className="mt-8 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                >
                  <CheckCircle className="h-4 w-4" />
                  {cert}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button asChild>
                <Link href="/quality">
                  Подробнее о контроле качества
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quality steps */}
          <div className="grid gap-6 sm:grid-cols-2">
            {qualitySteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-border bg-secondary/30 p-6 transition-all hover:border-primary/50"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    Этап {index + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {step.description}
                </p>
                <ul className="space-y-1">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
