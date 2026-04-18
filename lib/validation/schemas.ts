import { z } from "zod";

// ─── Shared primitives ────────────────────────────────────────────────────────

/**
 * Russian/international phone: accepts +7XXXXXXXXXX, 8XXXXXXXXXX, or +X(XXX)XXX-XX-XX formats.
 * Strips all non-digit chars, then validates length.
 */
const phoneRegex = /^[+]?[0-9\s\-().]{7,20}$/;

export const phoneSchema = z
  .string()
  .min(1, "Укажите номер телефона")
  .regex(phoneRegex, "Введите корректный номер телефона");

export const emailSchema = z
  .string()
  .email("Введите корректный email-адрес")
  .max(254, "Email слишком длинный")
  .optional()
  .or(z.literal(""));

export const nameSchema = z
  .string()
  .min(2, "Имя должно содержать не менее 2 символов")
  .max(100, "Имя слишком длинное")
  .regex(/^[а-яёА-ЯЁa-zA-Z\s\-'.]+$/, "Имя содержит недопустимые символы");

export const companySchema = z
  .string()
  .max(200, "Название компании слишком длинное")
  .optional()
  .or(z.literal(""));

// ─── Contact form ─────────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: nameSchema,
  company: companySchema,
  phone: phoneSchema,
  email: emailSchema,
  message: z
    .string()
    .min(10, "Сообщение слишком короткое (минимум 10 символов)")
    .max(2000, "Сообщение слишком длинное (максимум 2000 символов)"),
  // Honeypot — must be empty, hidden from real users
  _hp: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// ─── Quote form ───────────────────────────────────────────────────────────────

const serviceCategories = ["stamps", "molds", "design", "repair"] as const;
const urgencyOptions = ["standard", "urgent", "express"] as const;

export const quoteFormSchema = z.object({
  // Step 1 — service details
  services: z.array(z.enum(serviceCategories)).min(1, "Выберите хотя бы одну услугу"),
  urgency: z.enum(urgencyOptions, {
    errorMap: () => ({ message: "Выберите срочность выполнения" }),
  }),
  description: z
    .string()
    .min(20, "Опишите задачу подробнее (минимум 20 символов)")
    .max(5000, "Описание слишком длинное"),
  quantity: z.string().max(100, "Значение слишком длинное").optional().or(z.literal("")),
  deadline: z.string().max(100, "Значение слишком длинное").optional().or(z.literal("")),

  // Step 3 — contact
  contact_person: nameSchema,
  company: z
    .string()
    .min(2, "Укажите название компании")
    .max(200, "Название компании слишком длинное"),
  phone: phoneSchema,
  email: emailSchema,

  // Honeypot
  _hp: z.string().max(0, "Bot detected").optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

// ─── Callback modal ───────────────────────────────────────────────────────────

export const callbackSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  _hp: z.string().max(0, "Bot detected").optional(),
});

export type CallbackValues = z.infer<typeof callbackSchema>;

// ─── Admin forms ──────────────────────────────────────────────────────────────

export const articleFormSchema = z.object({
  title: z.string().min(5, "Заголовок слишком короткий").max(200, "Заголовок слишком длинный"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug: только строчные буквы, цифры и дефисы")
    .max(200, "Slug слишком длинный"),
  excerpt: z.string().max(500, "Краткое описание слишком длинное").optional().or(z.literal("")),
  content: z.string().min(1, "Добавьте содержание статьи"),
  image_url: z.string().url("Некорректный URL изображения").optional().or(z.literal("")),
  category: z.string().min(1, "Выберите категорию"),
  author: z.string().min(1, "Укажите автора").max(100, "Имя автора слишком длинное"),
  status: z.enum(["draft", "published", "archived"]),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;
