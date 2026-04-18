"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
  Phone,
  Mail,
  Upload,
  CheckCircle,
  FileText,
  Building2,
  User,
  Wrench,
  Package,
  Calendar,
  X,
  Shield,
  Clock,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const serviceOptions = [
  { id: "stamps", label: "Изготовление штампов", icon: Wrench },
  { id: "molds", label: "Пресс-формы", icon: Package },
  { id: "design", label: "Проектирование оснастки", icon: FileText },
  { id: "repair", label: "Ремонт и модернизация", icon: Wrench },
]

const urgencyOptions = [
  { id: "standard", label: "Стандартный (4-6 недель)", description: "Оптимальный срок изготовления" },
  { id: "urgent", label: "Срочный (2-3 недели)", description: "+30% к стоимости" },
  { id: "express", label: "Экспресс (1 неделя)", description: "+50% к стоимости" },
]

const trustItems = [
  { icon: Shield, text: "Гарантия качества" },
  { icon: Clock, text: "Ответ за 2 часа" },
  { icon: FileText, text: "Бесплатный расчёт" },
]

export default function QuotePage() {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedUrgency, setSelectedUrgency] = useState("standard")
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    description: "",
    quantity: "",
    deadline: "",
  })

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((s) => s !== serviceId) : [...prev, serviceId]
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase.from("quote_requests").insert({
      company: formData.company,
      contact_person: formData.name,
      email: formData.email,
      phone: formData.phone,
      product_type: selectedServices.map(s => {
        const service = serviceOptions.find(opt => opt.id === s)
        return service?.label || s
      }).join(", "),
      material: formData.description,
      quantity: formData.quantity || null,
      deadline: formData.deadline || selectedUrgency,
      has_drawings: files.length > 0,
      additional_info: formData.description,
    })

    setIsSubmitting(false)

    if (insertError) {
      setError("Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.")
      return
    }

    setIsSubmitted(true)
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-32">
          <section className="flex min-h-[60vh] items-center justify-center py-20">
            <div className="mx-auto max-w-2xl px-6 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                Заявка успешно отправлена
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Спасибо за обращение! Наши специалисты изучат вашу заявку и свяжутся с вами в
                течение 2 часов в рабочее время для уточнения деталей и расчёта стоимости.
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
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32">
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
              
              {/* Trust items */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {trustItems.map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="border-y border-border bg-secondary/30 py-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto flex max-w-2xl items-center justify-between">
              {[
                { num: 1, label: "Услуги" },
                { num: 2, label: "Детали проекта" },
                { num: 3, label: "Контакты" },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors ${
                        step >= s.num
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                    </div>
                    <span
                      className={`hidden font-medium sm:block ${
                        step >= s.num ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`mx-4 h-0.5 w-12 sm:w-20 lg:w-32 ${
                        step > s.num ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
              {/* Step 1: Services */}
              {step === 1 && (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Выберите услуги</h2>
                  <p className="mb-8 text-muted-foreground">Какие работы вас интересуют?</p>

                  <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    {serviceOptions.map((service) => {
                      const Icon = service.icon
                      const isSelected = selectedServices.includes(service.id)
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleServiceToggle(service.id)}
                          className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border bg-secondary/30 hover:border-primary/50"
                          }`}
                        >
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                              isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="font-medium text-foreground">{service.label}</span>
                          {isSelected && <CheckCircle className="ml-auto h-5 w-5 text-primary" />}
                        </button>
                      )
                    })}
                  </div>

                  <h3 className="mb-4 text-lg font-semibold text-foreground">Сроки выполнения</h3>
                  <div className="mb-8 space-y-3">
                    {urgencyOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all ${
                          selectedUrgency === option.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary/30 hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={option.id}
                          checked={selectedUrgency === option.id}
                          onChange={(e) => setSelectedUrgency(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            selectedUrgency === option.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {selectedUrgency === option.id && (
                            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{option.label}</span>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={selectedServices.length === 0}
                      className="glow-blue-subtle"
                    >
                      Далее
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Детали проекта</h2>
                  <p className="mb-8 text-muted-foreground">Расскажите подробнее о вашей задаче</p>

                  <div className="mb-6 space-y-6">
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        Описание проекта *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Опишите требуемую оснастку: тип изделия, материал, размеры, особенности..."
                        className="w-full rounded-md border border-border bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          Планируемый тираж
                        </label>
                        <Input
                          type="text"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="например, 10 000 шт/мес"
                          className="border-border bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Желаемые сроки
                        </label>
                        <Input
                          type="text"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          placeholder="например, до конца квартала"
                          className="border-border bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        Прикрепить файлы
                      </label>
                      <div className="rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 text-center transition-colors hover:border-primary/50">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.dwg,.dxf,.step,.stp,.iges,.igs,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                          <p className="font-medium text-foreground">
                            Перетащите файлы или нажмите для выбора
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            PDF, DOC, DWG, STEP, IGES, JPG, PNG до 50 МБ
                          </p>
                        </label>
                      </div>
                      {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <span className="text-sm text-foreground">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(file.size / 1024 / 1024).toFixed(2)} МБ)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" onClick={prevStep} variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Назад
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.description}
                      className="glow-blue-subtle"
                    >
                      Далее
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Контактные данные</h2>
                  <p className="mb-8 text-muted-foreground">Как с вами связаться для обсуждения проекта?</p>

                  <div className="mb-8 space-y-6">
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
                          Компания *
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
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
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="email@company.ru"
                          className="border-border bg-secondary/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-8 rounded-xl bg-secondary/50 p-6">
                    <h3 className="mb-4 font-semibold text-foreground">Ваша заявка</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Услуги:</span>
                        <span className="text-foreground">
                          {selectedServices
                            .map((id) => serviceOptions.find((s) => s.id === id)?.label)
                            .join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сроки:</span>
                        <span className="text-foreground">
                          {urgencyOptions.find((o) => o.id === selectedUrgency)?.label}
                        </span>
                      </div>
                      {files.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Файлы:</span>
                          <span className="text-foreground">{files.length} файл(ов)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="mb-6 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 h-4 w-4 rounded border-border accent-primary"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      Я согласен с{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        политикой конфиденциальности
                      </Link>{" "}
                      и даю согласие на обработку персональных данных
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" onClick={prevStep} variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Назад
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.company || !formData.phone || !formData.email}
                      className="glow-blue-subtle"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        "Отправить заявку"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {/* Side info */}
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Что ускорит расчёт?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    Чертёж детали в формате PDF, DWG или DXF
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    3D-модель в формате STEP, IGES или Parasolid
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    Указание материала и толщины заготовки
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    Планируемый объём производства
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                    Желаемые сроки изготовления
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
