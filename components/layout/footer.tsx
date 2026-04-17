import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: {
    title: "Услуги",
    links: [
      { name: "Изготовление штампов", href: "/services/stamps" },
      { name: "Проектирование", href: "/services/design" },
      { name: "Ремонт и модернизация", href: "/services/repair" },
      { name: "Пресс-формы", href: "/services/molds" },
    ],
  },
  company: {
    title: "Компания",
    links: [
      { name: "О компании", href: "/about" },
      { name: "Оборудование", href: "/equipment" },
      { name: "Контроль качества", href: "/quality" },
      { name: "Кейсы", href: "/cases" },
      { name: "Статьи", href: "/articles" },
    ],
  },
  industries: {
    title: "Отрасли",
    links: [
      { name: "Автомобильная", href: "/industries#automotive" },
      { name: "Электротехническая", href: "/industries#electrical" },
      { name: "Приборостроение", href: "/industries#instrumentation" },
      { name: "Бытовая техника", href: "/industries#appliances" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* CTA Section */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Готовы обсудить ваш проект?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Получите бесплатную консультацию и расчет стоимости
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="glow-blue-subtle" asChild>
                <Link href="/quote">
                  <Send className="mr-2 h-4 w-4" />
                  Запросить КП
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contacts">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">Ш</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">ШТАМП</span>
                <span className="text-xs text-muted-foreground">Производство оснастки</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Проектирование и изготовление штампов холодной штамповки, пресс-форм для литья. 
              Более 18 лет опыта в металлообработке.
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:+74951234567" className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary">
                <Phone className="h-4 w-4 text-primary" />
                +7 (495) 123-45-67
              </a>
              <a href="mailto:info@stamp.ru" className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary">
                <Mail className="h-4 w-4 text-primary" />
                info@stamp.ru
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                г. Москва, ул. Промышленная, 15
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Пн-Пт: 9:00 - 18:00
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {footerLinks.services.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {footerLinks.industries.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.industries.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 ШТАМП. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
