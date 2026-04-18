import Link from "next/link";
import { Home, ArrowRight, Search, Phone } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen items-center justify-center bg-background px-6 pt-32">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="text-[12rem] font-bold leading-none text-secondary lg:text-[16rem]">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-primary/10 p-6">
                <Search className="h-16 w-16 text-primary lg:h-20 lg:w-20" />
              </div>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Страница не найдена
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            К сожалению, запрашиваемая страница не существует или была перемещена. Возможно, вы
            перешли по устаревшей ссылке или допустили опечатку в адресе.
          </p>

          {/* Actions */}
          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="glow-blue-subtle">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                На главную
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Связаться с нами
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="rounded-xl border border-border bg-card p-6">
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
                  className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
