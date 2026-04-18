"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, Phone, User, Building2, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUrgent?: boolean;
  phone?: string;
}

export function CallbackModal({
  isOpen,
  onClose,
  isUrgent = false,
  phone = "+7 (495) 123-45-67",
}: CallbackModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("contact_requests").insert({
      name: formData.name,
      company: formData.company || null,
      phone: formData.phone,
      message: formData.message || null,
      request_type: isUrgent ? "urgent_callback" : "callback",
      is_urgent: isUrgent,
    });

    setIsSubmitting(false);

    if (insertError) {
      setError("Произошла ошибка. Попробуйте позвонить нам напрямую.");
      return;
    }

    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setFormData({ name: "", company: "", phone: "", message: "" });
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              {isUrgent ? "Срочный запрос отправлен!" : "Заявка отправлена!"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isUrgent
                ? "Наш специалист перезвонит вам в течение 15 минут."
                : "Мы свяжемся с вами в ближайшее время."}
            </p>
            <Button onClick={handleClose} variant="outline">
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              {isUrgent && (
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-500">
                  <AlertTriangle className="h-4 w-4" />
                  Срочный вызов
                </div>
              )}
              <h2 className="text-xl font-bold text-foreground">
                {isUrgent ? "Заказать срочный звонок" : "Заказать звонок"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isUrgent
                  ? "Перезвоним в течение 15 минут в рабочее время"
                  : "Перезвоним в течение 2 часов в рабочее время"}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {isUrgent && (
                <div>
                  <label className="mb-2 text-sm font-medium text-foreground">
                    Кратко опишите задачу
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Что вас интересует?"
                    className="w-full rounded-md border border-border bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isUrgent ? "bg-orange-500 hover:bg-orange-600" : "glow-blue-subtle"}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : isUrgent ? (
                  "Срочно перезвоните"
                ) : (
                  "Заказать звонок"
                )}
              </Button>
            </form>

            {/* Direct call option */}
            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Или позвоните нам напрямую:</p>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
              >
                <Phone className="h-5 w-5" />
                {phone}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
