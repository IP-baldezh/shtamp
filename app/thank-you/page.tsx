import Link from "next/link"
import { CheckCircle, Phone, Mail, ArrowRight, Clock, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Спасибо за обращение | СтампМастер",
  description: "Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
}

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center bg-background">
      <section className="w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent/20">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>

            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Спасибо за обращение!
            </h1>
            <p className="mb-8 text-lg text-muted">
              Ваша заявка успешно отправлена. Наши специалисты уже работают над ней и свяжутся с
              вами в ближайшее время.
            </p>

            {/* What happens next */}
            <div className="mb-10 rounded-2xl border border-border bg-surface p-8">
              <h2 className="mb-6 text-xl font-bold text-foreground">Что будет дальше?</h2>
              <div className="space-y-6 text-left">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    1
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Анализ заявки</h3>
                    <p className="text-sm text-muted">
                      Наши инженеры изучат вашу задачу и подготовят предварительную оценку
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    2
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Звонок менеджера</h3>
                    <p className="text-sm text-muted">
                      В течение 2 часов свяжемся для уточнения деталей и требований
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    3
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">Коммерческое предложение</h3>
                    <p className="text-sm text-muted">
                      Подготовим детальный расчёт с техническим описанием и сроками
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <Clock className="mx-auto mb-2 h-6 w-6 text-accent" />
                <div className="font-semibold text-foreground">2 часа</div>
                <div className="text-sm text-muted">Время ответа</div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <FileText className="mx-auto mb-2 h-6 w-6 text-accent" />
                <div className="font-semibold text-foreground">24 часа</div>
                <div className="text-sm text-muted">Расчёт стоимости</div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <Users className="mx-auto mb-2 h-6 w-6 text-accent" />
                <div className="font-semibold text-foreground">Персональный</div>
                <div className="text-sm text-muted">Менеджер проекта</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-accent text-white hover:bg-accent/90">
                <Link href="/">На главную</Link>
              </Button>
              <Button asChild variant="outline" className="border-border">
                <Link href="/cases">
                  Посмотреть кейсы
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl bg-surface-light p-6">
              <p className="mb-4 text-muted">Если у вас срочный вопрос, свяжитесь с нами напрямую:</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="tel:+74951234567"
                  className="flex items-center justify-center gap-2 text-accent hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +7 (495) 123-45-67
                </a>
                <a
                  href="mailto:info@stampmaster.ru"
                  className="flex items-center justify-center gap-2 text-accent hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  info@stampmaster.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
