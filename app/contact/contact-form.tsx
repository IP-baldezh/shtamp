"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/schemas";
import { runFraudChecks, getFormTimestamp } from "@/lib/fraud-protection";
import { Phone, Mail, User, Building2, MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mountedAtRef = useRef<number>(0);
  const supabase = createClient();

  useEffect(() => {
    mountedAtRef.current = getFormTimestamp();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    const fraud = runFraudChecks({
      honeypot: data._hp,
      mountedAt: mountedAtRef.current,
      rateLimitKey: "contact_form",
      rateLimitMax: 3,
    });

    if (fraud.blocked) {
      setError("root", { message: fraud.message });
      return;
    }

    const { error: insertError } = await supabase.from("contact_requests").insert({
      name: data.name,
      company: data.company || null,
      phone: data.phone,
      email: data.email || null,
      message: data.message,
      request_type: "contact_form",
    });

    if (insertError) {
      setError("root", {
        message: "Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.",
      });
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-primary/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Send className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">Сообщение отправлено</h3>
        <p className="text-muted-foreground">
          Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <>
      {errors.root && (
        <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          {errors.root.message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Honeypot — скрыто от людей, заполняется только ботами */}
        <input
          {...register("_hp")}
          type="text"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="h-4 w-4 text-muted-foreground" />
              Ваше имя *
            </label>
            <Input
              {...register("name")}
              type="text"
              placeholder="Иван Петров"
              className="border-border bg-secondary/50"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Компания
            </label>
            <Input
              {...register("company")}
              type="text"
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
              {...register("phone")}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className="border-border bg-secondary/50"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="email@company.ru"
              className="border-border bg-secondary/50"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            Сообщение *
          </label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Опишите вашу задачу или вопрос..."
            className="w-full rounded-md border border-border bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              политикой конфиденциальности
            </Link>
          </p>
          <Button type="submit" disabled={isSubmitting} className="glow-blue-subtle">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              "Отправить сообщение"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
