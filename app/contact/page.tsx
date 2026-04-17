"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Send, Building2, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-surface py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-accent transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-foreground">Контакты</span>
            </nav>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Свяжитесь с нами
            </h1>
            <p className="text-lg text-muted lg:text-xl">
              Готовы обсудить ваш проект. Оставьте заявку или позвоните нам — 
              ответим в течение 2 часов в рабочее время.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-foreground">Контактная информация</h2>

              <div className="space-y-6">
                <div className="flex gap-4 rounded-xl border border-border bg-surface p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Телефон</h3>
                    <a
                      href="tel:+74951234567"
                      className="text-lg font-medium text-accent hover:underline"
                    >
                      +7 (495) 123-45-67
                    </a>
                    <p className="mt-1 text-sm text-muted">Звоните в рабочее время</p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-border bg-surface p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                    <a
                      href="mailto:info@stampmaster.ru"
                      className="text-lg font-medium text-accent hover:underline"
                    >
                      info@stampmaster.ru
                    </a>
                    <p className="mt-1 text-sm text-muted">Ответим в течение 2 часов</p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-border bg-surface p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Адрес</h3>
                    <p className="text-foreground">г. Москва, ул. Промышленная, д. 15</p>
                    <p className="mt-1 text-sm text-muted">Производственный комплекс, корпус 2</p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-border bg-surface p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Режим работы</h3>
                    <p className="text-foreground">Пн-Пт: 9:00 — 18:00</p>
                    <p className="mt-1 text-sm text-muted">Сб-Вс: выходной</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border bg-surface">
                <div className="flex h-full items-center justify-center bg-surface-light">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-12 w-12 text-muted" />
                    <p className="text-muted">Карта расположения</p>
                    <p className="text-sm text-muted">г. Москва, ул. Промышленная, д. 15</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Напишите нам</h2>
                <p className="mb-8 text-muted">
                  Опишите вашу задачу, и мы свяжемся с вами для обсуждения деталей
                </p>

                {isSubmitted ? (
                  <div className="rounded-xl bg-accent/10 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                      <Send className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">Сообщение отправлено</h3>
                    <p className="text-muted">
                      Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <User className="h-4 w-4 text-muted" />
                          Ваше имя *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Иван Петров"
                          className="border-border bg-background"
                        />
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <Building2 className="h-4 w-4 text-muted" />
                          Компания
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="ООО «Компания»"
                          className="border-border bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <Phone className="h-4 w-4 text-muted" />
                          Телефон *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="border-border bg-background"
                        />
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <Mail className="h-4 w-4 text-muted" />
                          Email
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@company.ru"
                          className="border-border bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <MessageSquare className="h-4 w-4 text-muted" />
                        Сообщение *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Опишите вашу задачу или вопрос..."
                        className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-muted">
                        Нажимая кнопку, вы соглашаетесь с{" "}
                        <Link href="/privacy" className="text-accent hover:underline">
                          политикой конфиденциальности
                        </Link>
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-accent text-white hover:bg-accent/90"
                      >
                        {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="border-t border-border bg-surface py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold text-foreground lg:text-3xl">
            Отделы компании
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Отдел продаж",
                phone: "+7 (495) 123-45-67",
                email: "sales@stampmaster.ru",
                description: "Консультации, расчёт стоимости, оформление заказов",
              },
              {
                title: "Техническая поддержка",
                phone: "+7 (495) 123-45-68",
                email: "support@stampmaster.ru",
                description: "Техническое сопровождение, гарантийное обслуживание",
              },
              {
                title: "Конструкторский отдел",
                phone: "+7 (495) 123-45-69",
                email: "design@stampmaster.ru",
                description: "Проектирование, разработка КД, 3D-моделирование",
              },
            ].map((dept, index) => (
              <div key={index} className="rounded-xl border border-border bg-background p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">{dept.title}</h3>
                <p className="mb-4 text-sm text-muted">{dept.description}</p>
                <div className="space-y-2">
                  <a
                    href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 text-accent hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {dept.phone}
                  </a>
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2 text-accent hover:underline"
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
    </main>
  )
}
