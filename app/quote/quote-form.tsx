"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Upload,
  CheckCircle,
  FileText,
  Building2,
  User,
  Wrench,
  Package,
  Calendar,
  X,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const serviceOptions = [
  { id: "stamps", label: "Изготовление штампов", icon: Wrench },
  { id: "molds", label: "Пресс-формы", icon: Package },
  { id: "design", label: "Проектирование оснастки", icon: FileText },
  { id: "repair", label: "Ремонт и модернизация", icon: Wrench },
];

const urgencyOptions = [
  {
    id: "standard",
    label: "Стандартный (4-6 недель)",
    description: "Оптимальный срок изготовления",
  },
  {
    id: "urgent",
    label: "Срочный (2-3 недели)",
    description: "+30% к стоимости",
  },
  {
    id: "express",
    label: "Экспресс (1 неделя)",
    description: "+50% к стоимости",
  },
];

export function QuoteForm({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedUrgency, setSelectedUrgency] = useState("standard");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    description: "",
    quantity: "",
    deadline: "",
  });

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("quote_requests").insert({
      company: formData.company,
      contact_person: formData.name,
      email: formData.email,
      phone: formData.phone,
      product_type: selectedServices
        .map((s) => serviceOptions.find((o) => o.id === s)?.label || s)
        .join(", "),
      material: formData.description,
      quantity: formData.quantity || null,
      deadline: formData.deadline || selectedUrgency,
      has_drawings: files.length > 0,
      additional_info: formData.description,
    });

    setIsSubmitting(false);
    if (insertError) {
      setError("Произошла ошибка при отправке. Попробуйте ещё раз.");
      return;
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      {/* Step 1: Services */}
      {step === 1 && (
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">Выберите услуги</h2>
          <p className="mb-8 text-muted-foreground">Какие работы вас интересуют?</p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {serviceOptions.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceToggle(service.id)}
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${isSelected ? "border-primary bg-primary/10" : "border-border bg-secondary/30 hover:border-primary/50"}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-foreground">{service.label}</span>
                  {isSelected && <CheckCircle className="ml-auto h-5 w-5 text-primary" />}
                </button>
              );
            })}
          </div>

          <h3 className="mb-4 text-lg font-semibold text-foreground">Сроки выполнения</h3>
          <div className="mb-8 space-y-3">
            {urgencyOptions.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all ${selectedUrgency === option.id ? "border-primary bg-primary/10" : "border-border bg-secondary/30 hover:border-primary/50"}`}
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
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedUrgency === option.id ? "border-primary bg-primary" : "border-muted-foreground"}`}
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
              onClick={() => setStep(2)}
              disabled={selectedServices.length === 0}
              className="glow-blue-subtle"
            >
              Далее <ArrowRight className="ml-2 h-4 w-4" />
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
                <FileText className="h-4 w-4 text-muted-foreground" /> Описание проекта *
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
                  <Package className="h-4 w-4 text-muted-foreground" /> Планируемый тираж
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
                  <Calendar className="h-4 w-4 text-muted-foreground" /> Желаемые сроки
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
                <Upload className="h-4 w-4 text-muted-foreground" /> Прикрепить файлы
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
                        onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
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
            <Button type="button" onClick={() => setStep(1)} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад
            </Button>
            <Button
              type="button"
              onClick={() => setStep(3)}
              disabled={!formData.description}
              className="glow-blue-subtle"
            >
              Далее <ArrowRight className="ml-2 h-4 w-4" />
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
                  <User className="h-4 w-4 text-muted-foreground" /> Ваше имя *
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
                  <Building2 className="h-4 w-4 text-muted-foreground" /> Компания *
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
                  <Phone className="h-4 w-4 text-muted-foreground" /> Телефон *
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
                  <Mail className="h-4 w-4 text-muted-foreground" /> Email *
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
            <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
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
            <Button type="button" onClick={() => setStep(2)} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.company ||
                !formData.phone ||
                !formData.email
              }
              className="glow-blue-subtle"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
  );
}
