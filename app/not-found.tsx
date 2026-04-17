import Link from "next/link"
import { Home, ArrowLeft, Search, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Visual */}
        <div className="relative mb-8">
          <div className="text-[12rem] font-bold leading-none text-surface-light lg:text-[16rem]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-accent/10 p-6">
              <Search className="h-16 w-16 text-accent lg:h-20 lg:w-20" />
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Страница не найдена</h1>
        <p className="mb-8 text-lg text-muted">
          К сожалению, запрашиваемая страница не существует или была перемещена. Возможно, вы
          перешли по устаревшей ссылке или допустили опечатку в адресе.
        </p>

        {/* Actions */}
        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild className="bg-accent text-white hover:bg-accent/90">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border">
            <Link href="/contact">
              <Phone className="mr-2 h-4 w-4" />
              Связаться с нами
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-semibold text-foreground">Возможно, вы искали:</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/services/stamps", label: "Изготовление штампов" },
              { href: "/services/design", label: "Проектирование оснастки" },
              { href: "/cases", label: "Реализованные проекты" },
              { href: "/quote", label: "Запросить расчёт" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg bg-background p-3 text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
