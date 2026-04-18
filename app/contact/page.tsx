"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Phone, Mail, MapPin, Clock, Send, Building2, User, MessageSquare, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase.from("contact_requests").insert({
      name: formData.name,
      company: formData.company || null,
      phone: formData.phone,
      email: formData.email || null,
      message: formData.message,
      request_type: "contact_form",
    })

    setIsSubmitting(false)

    if (insertError) {
      setError("Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.")
      return
    }

    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32">
        {/* Hero Section */}
        <section className="relative pb-16">
          <div className="absolute inset-0 industrial-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  Главная
                </Link>
                <span>/</span>
                <span className="text-foreground">Контакты</span>
              </nav>
              <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Контакты
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Свяжитесь с нами
              </h1>
              <p className="text-lg text-muted-foreground">
                Готовы обсудить ваш проект. Оставьте заявку или позвоните нам — 
                ответим в течение 2 часов в рабочее время.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="mb-8 text-2xl font-bold text-foreground">Контактная информация</h2>

                <div className="space-y-6">
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Телефон</h3>
                      <a
                        href="tel:+74951234567"
                        className="text-lg font-medium text-primary hover:underline"
                      >
                        +7 (495) 123-45-67
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">Звоните в рабочее время</p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                      <a
                        href="mailto:info@stamp.ru"
                        className="text-lg font-medium text-primary hover:underline"
                      >
                        info@stamp.ru
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">Ответим в течение 2 часов</p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Адрес</h3>
                      <p className="text-foreground">г. Москва, ул. Промышленная, д. 15</p>
                      <p className="mt-1 text-sm text-muted-foreground">Производственный комплекс, корпус 2</p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">Режим работы</h3>
                      <p className="text-foreground">Пн-Пт: 9:00 — 18:00</p>
                      <p className="mt-1 text-sm text-muted-foreground">Сб-Вс: выходной</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex h-full items-center justify-center bg-secondary/30">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">Карта расположения</p>
                      <p className="text-sm text-muted-foreground">г. Москва, ул. Промышленная, д. 15</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Напишите нам</h2>
                  <p className="mb-8 text-muted-foreground">
                    Опишите вашу задачу, и мы свяжемся с вами для обсуждения деталей
                  </p>

                  {isSubmitted ? (
                    <div className="rounded-xl bg-primary/10 p-8 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">Сообщение отправлено</h3>
                      <p className="text-muted-foreground">
                        Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
                      </p>
                    </div>
                  ) : (
                    <>
                      {error && (
                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <User className="h-4 w-4 text-muted-foreground" />
                            Ваше имя *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Иван Петров"
                            className="border-border bg-secondary/50"
                          />
                        </div>
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            Компания
                          </label>
                          <Input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="ООО «Компания»"
                            className="border-border bg-secondary/50"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            Телефон *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+7 (___) ___-__-__"
                            className="border-border bg-secondary/50"
                          />
                        </div>
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            Email
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@company.ru"
                            className="border-border bg-secondary/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          Сообщение *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Опишите вашу задачу или вопрос..."
                          className="w-full rounded-md border border-border bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                          Нажимая кнопку, вы соглашаетесь с{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            политикой конфиденциальности
                          </Link>
                        </p>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="glow-blue-subtle"
                        >
                          {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          "Отправить сообщение"
                        )}
                        </Button>
                      </div>
                    </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground lg:text-3xl">
              Отделы компании
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Отдел продаж",
                  phone: "+7 (495) 123-45-67",
                  email: "sales@stamp.ru",
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
                <div key={index} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50">
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

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Готовы запросить расчёт?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Отправьте чертёж или ТЗ, и мы подготовим коммерческое предложение в течение 24 часов.
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
      <Footer />
    </>
  )
}
