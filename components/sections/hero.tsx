"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Shield, Clock, Award, AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallbackModal } from "@/components/modals/callback-modal";

const badges = [
  { icon: Shield, text: "Гарантия качества" },
  { icon: Clock, text: "Точные сроки" },
  { icon: Award, text: "18+ лет опыта" },
];

export function HeroSection() {
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleUrgentCall = () => {
    setIsUrgent(true);
    setShowCallbackModal(true);
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
        {/* Background elements */}
        <div className="absolute inset-0 industrial-grid opacity-30" />
        <div className="absolute top-1/4 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="space-y-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm"
                  >
                    <badge.icon className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  <span className="text-balance">Производство</span>
                  <br />
                  <span className="text-primary">штампов и пресс-форм</span>
                  <br />
                  <span className="text-balance">любой сложности</span>
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground">
                  Проектируем и изготавливаем штампы холодной штамповки, 
                  пресс-формы для литья. Собственное производство в Москве 
                  с парком современного оборудования.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="glow-blue-subtle" asChild>
                  <Link href="/quote">
                    Запросить КП
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/cases">
                    <Play className="mr-2 h-4 w-4" />
                    Смотреть кейсы
                  </Link>
                </Button>
              </div>

              {/* Urgent call option */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <button
                  onClick={handleUrgentCall}
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Срочный вызов</span>
                </button>
                <a 
                  href="tel:+74951234567"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">+7 (495) 123-45-67</span>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Выполненных проектов</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">150+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">Точность исполнения</div>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                {/* Main image placeholder - Industrial machinery */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary to-card">
                  <div className="absolute inset-0 industrial-grid opacity-50" />
                  {/* CAD-like technical drawing overlay */}
                  <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 400">
                    <defs>
                      <pattern id="tech-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                      </pattern>
                    </defs>
                    <rect width="400" height="400" fill="url(#tech-grid)" />
                    {/* Technical drawing elements */}
                    <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
                    <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" strokeDasharray="5,5" />
                    <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="0.5" className="text-primary" strokeDasharray="10,5" />
                    <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-primary" strokeDasharray="10,5" />
                    {/* Dimension lines */}
                    <path d="M 80 80 L 320 80 M 80 320 L 320 320" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                  </svg>
                  {/* Central element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-48 w-48 rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-sm">
                      <div className="absolute inset-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/30">3D</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating cards */}
                <div className="absolute -left-8 top-1/4 rounded-xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">ISO 9001:2015</div>
                      <div className="text-xs text-muted-foreground">Сертифицировано</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-8 bottom-1/4 rounded-xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Производство</div>
                      <div className="text-xs text-muted-foreground">Работает 24/7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallbackModal 
        isOpen={showCallbackModal} 
        onClose={() => setShowCallbackModal(false)}
        isUrgent={isUrgent}
      />
    </>
  );
}
