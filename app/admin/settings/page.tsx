"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/lib/settings";
import { Loader2, Save, Building2, Globe, Search, Trash2, Plus, Check } from "lucide-react";

interface SiteSettings {
  company: {
    name: string;
    slogan: string;
    phone: string;
    email: string;
    address: string;
  };
  social: SocialLink[];
  seo: {
    title: string;
    description: string;
  };
}

const SOCIAL_PLATFORMS: { icon: string; label: string }[] = [
  { icon: "telegram", label: "Telegram" },
  { icon: "whatsapp", label: "WhatsApp" },
  { icon: "vk", label: "ВКонтакте" },
  { icon: "youtube", label: "YouTube" },
  { icon: "instagram", label: "Instagram" },
  { icon: "pinterest", label: "Pinterest" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "tiktok", label: "TikTok" },
  { icon: "twitter", label: "X (Twitter)" },
  { icon: "facebook", label: "Facebook" },
  { icon: "behance", label: "Behance" },
];

const defaultSettings: SiteSettings = {
  company: {
    name: "СтампМастер",
    slogan: "Точность в каждой детали",
    phone: "+7 (495) 123-45-67",
    email: "info@stampmaster.ru",
    address: "Москва, ул. Промышленная, д. 15",
  },
  social: [],
  seo: {
    title: "СтампМастер — Производство штампов и пресс-форм",
    description: "Профессиональное изготовление штампов, пресс-форм и штамповой оснастки.",
  },
};

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");

      if (data) {
        const newSettings = { ...defaultSettings };
        data.forEach((row) => {
          if (row.key === "company") newSettings.company = row.value;
          if (row.key === "social") {
            const v = row.value;
            if (Array.isArray(v)) {
              newSettings.social = v as SocialLink[];
            } else if (v && typeof v === "object") {
              // migrate legacy { telegram, whatsapp } format
              const old = v as Record<string, string>;
              const migrated: SocialLink[] = [];
              if (old.telegram?.trim())
                migrated.push({ icon: "telegram", label: "Telegram", url: old.telegram });
              if (old.whatsapp?.trim())
                migrated.push({
                  icon: "whatsapp",
                  label: "WhatsApp",
                  url: `https://wa.me/${old.whatsapp.replace(/\D/g, "")}`,
                });
              newSettings.social = migrated;
            }
          }
          if (row.key === "seo") newSettings.seo = row.value;
        });
        setSettings(newSettings);
      }
      setIsLoading(false);
    };
    fetchSettings();
  }, [supabase]);

  const handleSave = async () => {
    setIsSaving(true);

    await Promise.all([
      supabase.from("site_settings").upsert({ key: "company", value: settings.company }),
      supabase.from("site_settings").upsert({ key: "social", value: settings.social }),
      supabase.from("site_settings").upsert({ key: "seo", value: settings.seo }),
    ]);

    setIsSaving(false);
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground">Управление настройками сайта</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Company settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Информация о компании
            </CardTitle>
            <CardDescription>Основные контактные данные и информация о компании</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company_name">Название компании</Label>
                <Input
                  id="company_name"
                  value={settings.company.name}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      company: { ...prev.company, name: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_slogan">Слоган</Label>
                <Input
                  id="company_slogan"
                  value={settings.company.slogan}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      company: { ...prev.company, slogan: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company_phone">Телефон</Label>
                <Input
                  id="company_phone"
                  value={settings.company.phone}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      company: { ...prev.company, phone: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_email">Email</Label>
                <Input
                  id="company_email"
                  type="email"
                  value={settings.company.email}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      company: { ...prev.company, email: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_address">Адрес</Label>
              <Input
                id="company_address"
                value={settings.company.address}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    company: { ...prev.company, address: e.target.value },
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Social settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Социальные сети
            </CardTitle>
            <CardDescription>
              Добавляйте, редактируйте и удаляйте ссылки. Порядок определяет отображение на сайте.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing links list */}
            {settings.social.length > 0 ? (
              <div className="space-y-2">
                {settings.social.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/20 p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                      <SocialIcon icon={link.icon} className="h-4 w-4" />
                    </div>
                    <span className="w-24 shrink-0 text-xs font-medium text-muted-foreground">
                      {SOCIAL_PLATFORMS.find((p) => p.icon === link.icon)?.label ?? link.icon}
                    </span>
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...settings.social];
                        updated[idx] = { ...updated[idx], label: e.target.value };
                        setSettings((prev) => ({ ...prev, social: updated }));
                      }}
                      placeholder="Название"
                      className="h-8 w-32 shrink-0"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...settings.social];
                        updated[idx] = { ...updated[idx], url: e.target.value };
                        setSettings((prev) => ({ ...prev, social: updated }));
                      }}
                      placeholder="https://..."
                      type="url"
                      className="h-8 min-w-0 flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          social: prev.social.filter((_, i) => i !== idx),
                        }))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Нет добавленных ссылок. Выберите платформу ниже.
              </div>
            )}

            {/* Platform picker */}
            <div>
              <p className="mb-3 text-sm font-medium text-foreground">
                <Plus className="mr-1 inline h-4 w-4" />
                Добавить платформу:
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_PLATFORMS.map((platform) => {
                  const added = settings.social.some((l) => l.icon === platform.icon);
                  return (
                    <button
                      key={platform.icon}
                      type="button"
                      disabled={added}
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          social: [
                            ...prev.social,
                            { icon: platform.icon, label: platform.label, url: "" },
                          ],
                        }))
                      }
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition-colors",
                        added
                          ? "cursor-not-allowed border-border text-muted-foreground opacity-40"
                          : "border-border bg-background text-foreground hover:border-primary hover:text-primary",
                      )}
                    >
                      <SocialIcon icon={platform.icon} className="h-4 w-4" />
                      {platform.label}
                      {added && <Check className="h-3 w-3 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              SEO настройки
            </CardTitle>
            <CardDescription>Настройки для поисковой оптимизации</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo_title">Заголовок сайта (title)</Label>
              <Input
                id="seo_title"
                value={settings.seo.title}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    seo: { ...prev.seo, title: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo_description">Описание (meta description)</Label>
              <Textarea
                id="seo_description"
                value={settings.seo.description}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    seo: { ...prev.seo, description: e.target.value },
                  }))
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
