"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Какие исходные данные нужны для расчёта стоимости штампа?",
    answer: "Для предварительного расчёта достаточно чертежа детали в формате PDF или DWG. Для точного расчёта потребуется 3D-модель (STEP, IGES), информация о материале и толщине заготовки, а также планируемый объём производства. Чем больше данных вы предоставите, тем точнее будет наше предложение.",
  },
  {
    question: "Какие сроки изготовления штампа?",
    answer: "Стандартный срок изготовления штампа — 4-8 недель в зависимости от сложности. Простые штампы изготавливаем за 3-4 недели, сложные многопозиционные — до 10-12 недель. При необходимости возможно ускоренное изготовление с доплатой 30-50%.",
  },
  {
    question: "Работаете ли вы по чертежам заказчика?",
    answer: "Да, мы работаем по готовым чертежам заказчика, а также можем разработать конструкторскую документацию с нуля. Если у вас есть только образец детали, мы выполним реверс-инжиниринг и создадим 3D-модель для последующего изготовления оснастки.",
  },
  {
    question: "Какие гарантии вы предоставляете?",
    answer: "Гарантируем соответствие изготовленной оснастки требованиям КД. Гарантийный срок — 12 месяцев или до заявленного ресурса. При выявлении производственных дефектов выполняем бесплатный ремонт или замену. Предоставляем полный комплект документации и протоколы измерений.",
  },
  {
    question: "Можно ли заказать только проектирование?",
    answer: "Да, мы предоставляем услуги проектирования штампов и пресс-форм отдельно от изготовления. Разрабатываем 3D-модели, выпускаем полный комплект КД по ЕСКД, проводим расчёт технологии штамповки и симуляцию процесса.",
  },
  {
    question: "Выполняете ли вы ремонт штампов сторонних производителей?",
    answer: "Да, ремонтируем штампы и пресс-формы любых производителей. Проводим диагностику, составляем дефектную ведомость и предлагаем оптимальный вариант восстановления. При необходимости выполняем модернизацию для повышения ресурса.",
  },
  {
    question: "Какие формы оплаты вы принимаете?",
    answer: "Работаем по безналичному расчёту с предприятиями. Стандартная схема: 50% предоплата, 50% по готовности. Для постоянных клиентов возможна отсрочка платежа. Предоставляем полный комплект бухгалтерских документов.",
  },
  {
    question: "Как организована доставка?",
    answer: "Доставляем готовую оснастку по всей России транспортными компаниями. Упаковка и консервация включены в стоимость. Возможен самовывоз с нашего производства в Москве. Также организуем шеф-монтаж и пусконаладку на вашем предприятии.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Частые вопросы
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Ответы на популярные вопросы о нашей работе
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="pr-4 font-medium text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180 text-primary"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200 ease-in-out",
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-border px-6 pb-6 pt-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            Не нашли ответ на свой вопрос?
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">
              <MessageCircle className="mr-2 h-4 w-4" />
              Задать вопрос
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
