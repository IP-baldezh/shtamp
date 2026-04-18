import { Metadata } from "next";
import { Check, Shield, Ruler, FileCheck, Award, Eye, ClipboardCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Контроль качества | ШТАМП",
  description:
    "Система контроля качества по ISO 9001:2015. Входной, операционный и приемочный контроль. Современное измерительное оборудование.",
};

const controlStages = [
  {
    icon: FileCheck,
    title: "Входной контроль",
    description: "Проверка поступающих материалов и комплектующих",
    checks: [
      "Проверка сертификатов на материалы",
      "Контроль размеров заготовок",
      "Проверка твердости материала",
      "Визуальный осмотр на дефекты",
    ],
  },
  {
    icon: Eye,
    title: "Операционный контроль",
    description: "Контроль на всех этапах изготовления",
    checks: [
      "Контроль после каждой операции",
      "Проверка размеров по КД",
      "Контроль шероховатости",
      "Документирование результатов",
    ],
  },
  {
    icon: Ruler,
    title: "Приемочный контроль",
    description: "Финальная проверка готовой продукции",
    checks: [
      "3D-измерения на КИМ",
      "Проверка всех размеров по КД",
      "Контроль твердости",
      "Испытание штампа",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Документация",
    description: "Полный комплект документов качества",
    checks: ["Протоколы измерений", "Сертификаты на материалы", "Паспорт изделия", "Акт испытаний"],
  },
];

const certificates = [
  {
    title: "ISO 9001:2015",
    description: "Система менеджмента качества",
    validity: "Действителен до 2026",
  },
  {
    title: "ГОСТ Р ИСО 9001-2015",
    description: "Российский стандарт качества",
    validity: "Действителен до 2026",
  },
];

const equipment = [
  {
    name: "Zeiss Contura G2",
    type: "Координатно-измерительная машина",
    specs: "Точность 1.8+L/300 мкм, рабочая зона 900×1200×800 мм",
  },
  {
    name: "Mitutoyo Crysta-Apex S",
    type: "Координатно-измерительная машина",
    specs: "Рабочая зона 700×1000×600 мм, программное измерение",
  },
  {
    name: "Mahr MarSurf PS10",
    type: "Профилограф-профилометр",
    specs: "Измерение параметров Ra, Rz, Rmax",
  },
  {
    name: "Mitutoyo HR-530",
    type: "Твердомер",
    specs: "Шкалы HRC, HRB, HRA",
  },
  {
    name: "Keyence IM-7500",
    type: "Видеоизмерительная система",
    specs: "Бесконтактные измерения, автоматический режим",
  },
];

const tolerances = [
  { parameter: "Линейные размеры", standard: "±0.01 мм", achievable: "±0.005 мм" },
  { parameter: "Диаметры отверстий", standard: "H7", achievable: "H6" },
  { parameter: "Плоскостность", standard: "0.02 мм", achievable: "0.005 мм" },
  { parameter: "Шероховатость", standard: "Ra 0.8", achievable: "Ra 0.1" },
  { parameter: "Угловые размеры", standard: "±5'", achievable: "±2'" },
  { parameter: "Соосность", standard: "0.02 мм", achievable: "0.01 мм" },
];

export default function QualityPage() {
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
                Качество
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Контроль качества
                <br />
                <span className="text-primary">на каждом этапе</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Сертифицированная система менеджмента качества ISO 9001:2015. Современное
                измерительное оборудование и строгий контроль на всех этапах производства.
              </p>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="py-12 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-center gap-6 rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{cert.title}</h3>
                    <p className="text-muted-foreground">{cert.description}</p>
                    <p className="mt-1 text-sm text-primary">{cert.validity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Control stages */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Этапы контроля</h2>
              <p className="mt-4 text-muted-foreground">
                Многоступенчатая система контроля качества
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {controlStages.map((stage) => (
                <div
                  key={stage.title}
                  className="rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <stage.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {stage.checks.map((check) => (
                      <li key={check} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Measuring equipment */}
        <section className="py-20 bg-card">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground">Измерительное оборудование</h2>
              <p className="mt-4 text-muted-foreground">
                Современное оборудование для точных измерений
              </p>
            </div>
            <div className="space-y-4">
              {equipment.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-4 rounded-xl border border-border bg-secondary/30 p-6 md:grid-cols-3"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-primary">{item.type}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground">{item.specs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tolerances */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Достигаемые допуски</h2>
              <p className="mt-4 text-muted-foreground">
                Точность изготовления на нашем оборудовании
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-semibold text-foreground">Параметр</th>
                    <th className="p-4 text-left font-semibold text-foreground">Стандартно</th>
                    <th className="p-4 text-left font-semibold text-foreground">Достижимо</th>
                  </tr>
                </thead>
                <tbody>
                  {tolerances.map((row) => (
                    <tr key={row.parameter} className="border-b border-border">
                      <td className="p-4 text-foreground">{row.parameter}</td>
                      <td className="p-4 text-muted-foreground">{row.standard}</td>
                      <td className="p-4 font-medium text-primary">{row.achievable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Documentation */}
        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Документация качества</h2>
                <p className="mt-4 text-muted-foreground">
                  Вместе с готовой оснасткой вы получаете полный комплект документов, подтверждающих
                  качество изготовления.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Паспорт изделия с основными характеристиками",
                    "Протоколы измерений с КИМ",
                    "Сертификаты на материалы",
                    "Акт испытаний штампа",
                    "Ведомость комплектации",
                    "Руководство по эксплуатации",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Гарантия качества</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Предоставляем гарантию на изготовленную оснастку. При обнаружении дефектов по
                  нашей вине — бесплатное устранение.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Гарантийный срок</span>
                    <span className="font-medium text-foreground">12 месяцев</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Ресурс штампа</span>
                    <span className="font-medium text-foreground">по ТЗ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Техподдержка</span>
                    <span className="font-medium text-foreground">Бессрочно</span>
                  </div>
                </div>
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
