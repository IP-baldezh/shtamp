import { describe, it, expect } from "vitest";
import { contactFormSchema, quoteFormSchema, callbackSchema } from "@/lib/validation/schemas";

// ─── contactFormSchema ────────────────────────────────────────────────────────

describe("contactFormSchema", () => {
  const valid = {
    name: "Иван Петров",
    phone: "+7 (495) 123-45-67",
    message: "Нужна консультация по изготовлению штампов",
  };

  it("accepts valid data", () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts with optional email and company", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      email: "ivan@example.ru",
      company: "ООО Ромашка",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 chars", () => {
    const result = contactFormSchema.safeParse({ ...valid, name: "И" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("name");
  });

  it("rejects name with invalid characters", () => {
    const result = contactFormSchema.safeParse({ ...valid, name: "Иван123" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone", () => {
    const result = contactFormSchema.safeParse({ ...valid, phone: "abc" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("phone");
  });

  it("rejects phone that is too short", () => {
    const result = contactFormSchema.safeParse({ ...valid, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const result = contactFormSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("email");
  });

  it("accepts empty email (optional)", () => {
    const result = contactFormSchema.safeParse({ ...valid, email: "" });
    expect(result.success).toBe(true);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactFormSchema.safeParse({ ...valid, message: "Кратко" });
    expect(result.success).toBe(false);
  });

  it("rejects message longer than 2000 chars", () => {
    const result = contactFormSchema.safeParse({ ...valid, message: "а".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("rejects when honeypot is filled", () => {
    const result = contactFormSchema.safeParse({ ...valid, _hp: "bot value" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain("_hp");
  });

  it("accepts when honeypot is empty string", () => {
    const result = contactFormSchema.safeParse({ ...valid, _hp: "" });
    expect(result.success).toBe(true);
  });
});

// ─── quoteFormSchema ──────────────────────────────────────────────────────────

describe("quoteFormSchema", () => {
  const valid = {
    services: ["stamps"] as const,
    urgency: "standard" as const,
    description: "Нужны штампы для серийного производства деталей",
    contact_person: "Александр Сидоров",
    company: "ЗАО Производство",
    phone: "+7 (800) 555-35-35",
  };

  it("accepts valid data", () => {
    expect(quoteFormSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty services array", () => {
    const result = quoteFormSchema.safeParse({ ...valid, services: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid service category", () => {
    const result = quoteFormSchema.safeParse({
      ...valid,
      services: ["unknown_service"],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid urgency", () => {
    const result = quoteFormSchema.safeParse({ ...valid, urgency: "super_urgent" });
    expect(result.success).toBe(false);
  });

  it("accepts all valid urgency values", () => {
    const urgencies = ["standard", "urgent", "express"] as const;
    for (const urgency of urgencies) {
      expect(quoteFormSchema.safeParse({ ...valid, urgency }).success).toBe(true);
    }
  });

  it("rejects short description", () => {
    const result = quoteFormSchema.safeParse({ ...valid, description: "Нужно" });
    expect(result.success).toBe(false);
  });

  it("rejects missing company", () => {
    const result = quoteFormSchema.safeParse({ ...valid, company: "" });
    expect(result.success).toBe(false);
  });
});

// ─── callbackSchema ───────────────────────────────────────────────────────────

describe("callbackSchema", () => {
  it("accepts valid name and phone", () => {
    const result = callbackSchema.safeParse({ name: "Мария", phone: "8 800 555 35 35" });
    expect(result.success).toBe(true);
  });

  it("rejects missing phone", () => {
    const result = callbackSchema.safeParse({ name: "Мария", phone: "" });
    expect(result.success).toBe(false);
  });
});
