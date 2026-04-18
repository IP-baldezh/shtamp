"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = {
  services: {
    label: "Услуги",
    items: [
      { name: "Изготовление штампов", href: "/services/stamps", description: "Штампы холодной штамповки любой сложности" },
      { name: "Проектирование", href: "/services/design", description: "3D-моделирование и конструкторская документация" },
      { name: "Ремонт и модернизация", href: "/services/repair", description: "Восстановление и улучшение оснастки" },
      { name: "Пресс-формы", href: "/services/molds", description: "Формы для литья пластмасс и металлов" },
    ],
  },
  company: {
    label: "Компания",
    items: [
      { name: "О компании", href: "/about" },
      { name: "Оборудование", href: "/equipment" },
      { name: "Контроль качества", href: "/quality" },
      { name: "Отрасли", href: "/industries" },
    ],
  },
  links: [
    { name: "Кейсы", href: "/cases" },
    { name: "Статьи", href: "/articles" },
    { name: "Контакты", href: "/contact" },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      {/* Top bar */}
      <div className="hidden border-b border-border bg-secondary/50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <div className="flex items-center gap-6 text-muted-foreground">
            <span>Пн-Пт: 9:00 - 18:00</span>
            <span>г. Москва, ул. Промышленная, 15</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+74951234567" className="flex items-center gap-2 text-foreground transition-colors hover:text-primary">
              <Phone className="h-4 w-4" />
              +7 (495) 123-45-67
            </a>
            <a href="mailto:info@stamp.ru" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <Mail className="h-4 w-4" />
              info@stamp.ru
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">Ш</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">ШТАМП</span>
            <span className="text-xs text-muted-foreground">Производство оснастки</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Services dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary">
              {navigation.services.label}
              <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "services" && "rotate-180")} />
            </button>
            {activeDropdown === "services" && (
              <div className="absolute left-0 top-full w-80 rounded-xl border border-border bg-card p-2 shadow-xl">
                {navigation.services.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg p-3 transition-colors hover:bg-secondary"
                  >
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Company dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("company")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary">
              {navigation.company.label}
              <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === "company" && "rotate-180")} />
            </button>
            {activeDropdown === "company" && (
              <div className="absolute left-0 top-full w-56 rounded-xl border border-border bg-card p-2 shadow-xl">
                {navigation.company.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct links */}
          {navigation.links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/contact">Связаться</Link>
          </Button>
          <Button size="sm" className="glow-blue-subtle" asChild>
            <Link href="/quote">Запросить КП</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="space-y-1 px-6 py-4">
            <div className="py-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Услуги</div>
              {navigation.services.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg py-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-2">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Компания</div>
              {navigation.company.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg py-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {navigation.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-lg py-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" asChild>
                <Link href="/contact">Связаться</Link>
              </Button>
              <Button asChild>
                <Link href="/quote">Запросить КП</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
