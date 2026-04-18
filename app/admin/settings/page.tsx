"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, Building2, Globe, Search } from "lucide-react"

interface SiteSettings {
  company: {
    name: string
    slogan: string
    phone: string
    email: string
    address: string
  }
  social: {
    telegram: string
    whatsapp: string
  }
  seo: {
    title: string
    description: string
  }
}

const defaultSettings: SiteSettings = {
  company: {
    name: "СтампМастер",
    slogan: "Точность в каждой детали",
    phone: "+7 (495) 123-45-67",
    email: "info@stampmaster.ru",
    address: "Москва, ул. Промышленная, д. 15",
  },
  social: {
    telegram: "",
    whatsapp: "",
  },
  seo: {
    title: "СтампМастер — Производство штампов и пресс-форм",
    description: "Профессиональное изготовление штампов, пресс-форм и штамповой оснастки.",
  },
}

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*")
      
      if (data) {
        const newSettings = { ...defaultSettings }
        data.forEach((row) => {
          if (row.key === "company") newSettings.company = row.value
          if (row.key === "social") newSettings.social = row.value
          if (row.key === "seo") newSettings.seo = row.value
        })
        setSettings(newSettings)
      }
      setIsLoading(false)
    }
    fetchSettings()
  }, [supabase])

  const handleSave = async () => {
    setIsSaving(true)
    
    await Promise.all([
      supabase.from("site_settings").upsert({ key: "company", value: settings.company }),
      supabase.from("site_settings").upsert({ key: "social", value: settings.social }),
      supabase.from("site_settings").upsert({ key: "seo", value: settings.seo }),
    ])
    
    setIsSaving(false)
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
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
            <CardDescription>
              Основные контактные данные и информация о компании
            </CardDescription>
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
              Ссылки на социальные сети и мессенджеры
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="social_telegram">Telegram</Label>
                <Input
                  id="social_telegram"
                  value={settings.social.telegram}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      social: { ...prev.social, telegram: e.target.value },
                    }))
                  }
                  placeholder="https://t.me/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_whatsapp">WhatsApp</Label>
                <Input
                  id="social_whatsapp"
                  value={settings.social.whatsapp}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      social: { ...prev.social, whatsapp: e.target.value },
                    }))
                  }
                  placeholder="https://wa.me/79001234567"
                />
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
            <CardDescription>
              Настройки для поисковой оптимизации
            </CardDescription>
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
  )
}
