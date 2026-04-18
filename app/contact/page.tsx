import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactForm } from "./contact-form";
import { SocialLinks } from "@/components/ui/social-links";
import { getCompanySettings, getSocialLinks } from "@/lib/settings.server";
import { phoneToTel } from "@/lib/settings";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [settings, socialLinks] = await Promise.all([getCompanySettings(), getSocialLinks()]);
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-32">
        <section className="relative pb-16">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ name: "Контакты" }]} />
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Контакты
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Свяжитесь с нами
              </h1>
              <p className="text-lg text-muted-foreground">
                Готовы обсудить ваш проект. Оставьте заявку или позвоните нам — ответим в течение 2
                часов в рабочее время.
              </p>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-8 text-2xl font-bold text-foreground">Контактная информация</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Телефон</h3>
                      <a
                        href={`tel:${phoneToTel(settings.phone)}`}
                        className="text-lg font-medium text-primary hover:underline"
                      >
                        {settings.phone}
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">Звоните в рабочее время</p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-lg font-medium text-primary hover:underline"
                      >
                        {settings.email}
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Ответим в течение 2 часов
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Адрес</h3>
                      <p className="text-foreground">{settings.address}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Производственный комплекс, корпус 2
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Режим работы</h3>
                      <p className="text-foreground">{settings.hours}</p>
                      <p className="mt-1 text-sm text-muted-foreground">Сб-Вс: выходной</p>
                    </div>
                  </div>
                </div>
                {socialLinks.length > 0 && (
                  <div className="mt-6 rounded-xl border border-border bg-card p-6">
                    <h3 className="mb-4 font-semibold text-foreground">Мы в соцсетях</h3>
                    <SocialLinks links={socialLinks} showLabel />
                  </div>
                )}
                <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex h-full items-center justify-center bg-secondary/30 text-center">
                    <div>
                      <MapPin className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">{settings.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Напишите нам</h2>
                  <p className="mb-8 text-muted-foreground">
                    Опишите вашу задачу, и мы свяжемся с вами для обсуждения деталей
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground lg:text-3xl">
              Отделы компании
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Отдел продаж",
                  phone: settings.phone,
                  email: settings.email,
                  description: "Консультации, расчёт стоимости, оформление заказов",
                },
                {
                  title: "Техническая поддержка",
                  phone: "+7 (495) 123-45-68",
                  email: "support@stamp.ru",
                  description: "Техническое сопровождение, гарантийное обслуживание",
                },
                {
                  title: "Конструкторский отдел",
                  phone: "+7 (495) 123-45-69",
                  email: "design@stamp.ru",
                  description: "Проектирование, разработка КД, 3D-моделирование",
                },
              ].map((dept, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{dept.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{dept.description}</p>
                  <div className="space-y-2">
                    <a
                      href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {dept.phone}
                    </a>
                    <a
                      href={`mailto:${dept.email}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {dept.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">Готовы запросить расчёт?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Отправьте чертёж или ТЗ, и мы подготовим коммерческое предложение в течение 24
                часов.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Запросить КП
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
