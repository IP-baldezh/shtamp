"use client"

import { useState } from "react"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export default function QuotePage() {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedUrgency, setSelectedUrgency] = useState("standard")
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    description: "",
    quantity: "",
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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <section className="flex min-h-[80vh] items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
              <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                Заявка успешно отправлена
              </h1>
              <p className="mb-8 text-lg text-muted">
                Спасибо за обращение! Наши специалисты изучат вашу заявку и свяжутся с вами в
                течение 2 часов в рабочее время для уточнения деталей и расчёта стоимости.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild className="bg-accent text-white hover:bg-accent/90">
                  <Link href="/">На главную</Link>
                </Button>
                <Button asChild variant="outline" className="border-border">
                  <Link href="/cases">Посмотреть кейсы</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-surface py-16 lg:py-20">
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
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-accent transition-colors">
                Главная
              </Link>
              <span>/</span>
              <span className="text-foreground">Запрос расчёта</span>
            </nav>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Запросить расчёт стоимости
            </h1>
            <p className="text-lg text-muted">
              Заполните форму, и мы подготовим коммерческое предложение в течение 24 часов
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="border-b border-border bg-surface py-6">
        <div className="container mx-auto px-4">
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
                        ? "bg-accent text-white"
                        : "bg-surface-light text-muted"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                  </div>
                  <span
                    className={`hidden font-medium sm:block ${
                      step >= s.num ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`mx-4 h-0.5 w-12 sm:w-20 lg:w-32 ${
                      step > s.num ? "bg-accent" : "bg-border"
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
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            {/* Step 1: Services */}
            {step === 1 && (
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Выберите услуги</h2>
                <p className="mb-8 text-muted">Какие работы вас интересуют?</p>

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
                            ? "border-accent bg-accent/10"
                            : "border-border bg-background hover:border-accent/50"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                            isSelected ? "bg-accent text-white" : "bg-surface-light text-muted"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-medium text-foreground">{service.label}</span>
                        {isSelected && <CheckCircle className="ml-auto h-5 w-5 text-accent" />}
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
                          ? "border-accent bg-accent/10"
                          : "border-border bg-background hover:border-accent/50"
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
                            ? "border-accent bg-accent"
                            : "border-muted"
                        }`}
                      >
                        {selectedUrgency === option.id && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{option.label}</span>
                        <p className="text-sm text-muted">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={selectedServices.length === 0}
                    className="bg-accent text-white hover:bg-accent/90"
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Детали проекта</h2>
                <p className="mb-8 text-muted">Расскажите подробнее о вашей задаче</p>

                <div className="mb-6 space-y-6">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <FileText className="h-4 w-4 text-muted" />
                      Описание проекта *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Опишите требуемую оснастку: тип изделия, материал, размеры, особенности..."
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Package className="h-4 w-4 text-muted" />
                        Планируемый тираж
                      </label>
                      <Input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="например, 10 000 шт/мес"
                        className="border-border bg-background"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar className="h-4 w-4 text-muted" />
                        Желаемые сроки
                      </label>
                      <Input
                        type="text"
                        placeholder="например, до конца квартала"
                        className="border-border bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Upload className="h-4 w-4 text-muted" />
                      Прикрепить файлы
                    </label>
                    <div className="rounded-xl border-2 border-dashed border-border bg-background p-8 text-center transition-colors hover:border-accent/50">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.dwg,.dxf,.step,.stp,.iges,.igs,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto mb-3 h-10 w-10 text-muted" />
                        <p className="font-medium text-foreground">
                          Перетащите файлы или нажмите для выбора
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          PDF, DOC, DWG, STEP, IGES, JPG, PNG до 50 МБ
                        </p>
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg bg-background p-3"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-accent" />
                              <span className="text-sm text-foreground">{file.name}</span>
                              <span className="text-xs text-muted">
                                ({(file.size / 1024 / 1024).toFixed(2)} МБ)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-muted hover:text-foreground"
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
                  <Button type="button" onClick={prevStep} variant="outline" className="border-border">
                    Назад
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.description}
                    className="bg-accent text-white hover:bg-accent/90"
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Контактные данные</h2>
                <p className="mb-8 text-muted">Как с вами связаться для обсуждения проекта?</p>

                <div className="mb-8 space-y-6">
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
                        Компания *
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
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
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@company.ru"
                        className="border-border bg-background"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8 rounded-xl bg-background p-6">
                  <h3 className="mb-4 font-semibold text-foreground">Ваша заявка</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Услуги:</span>
                      <span className="text-foreground">
                        {selectedServices
                          .map((s) => serviceOptions.find((o) => o.id === s)?.label)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Сроки:</span>
                      <span className="text-foreground">
                        {urgencyOptions.find((o) => o.id === selectedUrgency)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Файлов прикреплено:</span>
                      <span className="text-foreground">{files.length}</span>
                    </div>
                  </div>
                </div>

                <p className="mb-6 text-sm text-muted">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    политикой конфиденциальности
                  </Link>
                </p>

                <div className="flex justify-between">
                  <Button type="button" onClick={prevStep} variant="outline" className="border-border">
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.email}
                    className="bg-accent text-white hover:bg-accent/90"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Quick Info */}
      <section className="border-t border-border bg-surface py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-muted">Предпочитаете позвонить?</p>
              <a
                href="tel:+74951234567"
                className="text-xl font-semibold text-accent hover:underline"
              >
                +7 (495) 123-45-67
              </a>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-muted">Или напишите на почту</p>
              <a
                href="mailto:quote@stampmaster.ru"
                className="text-xl font-semibold text-accent hover:underline"
              >
                quote@stampmaster.ru
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
