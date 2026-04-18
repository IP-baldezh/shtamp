"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallbackModal } from "@/components/modals/callback-modal";
import { SocialIcon } from "@/components/ui/social-icon";
import { createClient } from "@/lib/supabase/client";
import { defaultCompanySettings, defaultSocialLinks } from "@/lib/settings";
import type { CompanySettings, SocialLink } from "@/lib/settings";

export function CTASection() {
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [contact, setContact] = useState<CompanySettings>(defaultCompanySettings);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);

  useEffect(() => {
    const client = createClient();
    Promise.all([
      client.from("site_settings").select("value").eq("key", "company").single(),
      client.from("site_settings").select("value").eq("key", "social").single(),
    ]).then(([{ data: companyData }, { data: socialData }]) => {
      if (companyData?.value)
        setContact({
          ...defaultCompanySettings,
          ...(companyData.value as Partial<CompanySettings>),
        });
      if (socialData?.value) {
        const v = socialData.value;
        if (Array.isArray(v)) {
          setSocialLinks((v as SocialLink[]).filter((l) => l.url?.trim()));
        }
      }
    });
  }, []);

  const handleUrgentCall = () => {
    setIsUrgent(true);
    setShowCallbackModal(true);
  };

  const handleRegularCall = () => {
    setIsUrgent(false);
    setShowCallbackModal(true);
  };

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        <div className="absolute inset-0 industrial-grid opacity-20" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Свободные мощности для новых проектов
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Готовы обсудить
            <br />
            <span className="text-primary">ваш проект?</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Отправьте заявку или позвоните нам. Мы проанализируем вашу задачу и предложим
            оптимальное решение в течение 1-2 рабочих дней.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="glow-blue min-w-48" asChild>
              <Link href="/quote">
                Запросить КП
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-48" onClick={handleRegularCall}>
              <Phone className="mr-2 h-4 w-4" />
              Позвонить сейчас
            </Button>
          </div>

          {/* Urgent call option */}
          <div className="mt-6">
            <button
              onClick={handleUrgentCall}
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Срочный вызов — перезвоним за 15 минут</span>
            </button>
          </div>

          {/* Contact options */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              {contact.email}
            </a>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <SocialIcon icon={link.icon} className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Trust note */}
          <p className="mt-8 text-sm text-muted-foreground">
            Бесплатная консультация и предварительный расчет стоимости
          </p>
        </div>
      </section>

      <CallbackModal
        isOpen={showCallbackModal}
        onClose={() => setShowCallbackModal(false)}
        isUrgent={isUrgent}
        phone={contact.phone}
      />
    </>
  );
}
