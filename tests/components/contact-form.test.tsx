import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/app/contact/contact-form";

// Mutable insert mock — override per test
const mockInsert = vi.fn().mockResolvedValue({ error: null });

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: () => ({ insert: mockInsert }),
  }),
}));

// Mock fraud protection so timing check doesn't block test submissions
vi.mock("@/lib/fraud-protection", () => ({
  getFormTimestamp: () => Date.now() - 10000,
  runFraudChecks: () => ({ blocked: false, message: "" }),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    mockInsert.mockResolvedValue({ error: null });
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText("Иван Петров")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+7 (___) ___-__-__")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Опишите вашу задачу или вопрос...")).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /отправить/i }));

    await waitFor(() => {
      // Name validation
      expect(screen.getByText(/не менее 2 символов/i)).toBeInTheDocument();
    });
  });

  it("shows phone validation error for invalid phone", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Иван Петров"), "Иван");
    await user.type(screen.getByPlaceholderText("+7 (___) ___-__-__"), "abc");
    await user.type(
      screen.getByPlaceholderText("Опишите вашу задачу или вопрос..."),
      "Нужна консультация по штампам",
    );

    await user.click(screen.getByRole("button", { name: /отправить/i }));

    await waitFor(() => {
      expect(screen.getByText(/корректный номер/i)).toBeInTheDocument();
    });
  });

  it("shows message length validation error", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Иван Петров"), "Иван Петров");
    await user.type(screen.getByPlaceholderText("+7 (___) ___-__-__"), "+79001234567");
    await user.type(screen.getByPlaceholderText("Опишите вашу задачу или вопрос..."), "Кратко");

    await user.click(screen.getByRole("button", { name: /отправить/i }));

    await waitFor(() => {
      expect(screen.getByText(/минимум 10 символов/i)).toBeInTheDocument();
    });
  });

  it("shows success state after valid submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Иван Петров"), "Иван Петров");
    await user.type(screen.getByPlaceholderText("+7 (___) ___-__-__"), "+7 (495) 123-45-67");
    await user.type(
      screen.getByPlaceholderText("Опишите вашу задачу или вопрос..."),
      "Нужна консультация по производству штампов",
    );

    await user.click(screen.getByRole("button", { name: /отправить/i }));

    await waitFor(() => {
      expect(screen.getByText(/сообщение отправлено/i)).toBeInTheDocument();
    });
  });

  it("shows error when supabase insert fails", async () => {
    mockInsert.mockResolvedValueOnce({ error: { message: "DB Error" } });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Иван Петров"), "Иван Петров");
    await user.type(screen.getByPlaceholderText("+7 (___) ___-__-__"), "+7 (495) 123-45-67");
    await user.type(
      screen.getByPlaceholderText("Опишите вашу задачу или вопрос..."),
      "Тестовое сообщение для проверки формы",
    );

    await user.click(screen.getByRole("button", { name: /отправить/i }));

    await waitFor(() => {
      expect(screen.getByText(/произошла ошибка/i)).toBeInTheDocument();
    });
  });
});
