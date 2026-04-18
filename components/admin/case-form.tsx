"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";

const industries = [
  { value: "automotive", label: "Автопром" },
  { value: "aerospace", label: "Авиакосмос" },
  { value: "electronics", label: "Электроника" },
  { value: "appliances", label: "Бытовая техника" },
  { value: "construction", label: "Строительство" },
  { value: "medical", label: "Медицина" },
  { value: "energy", label: "Энергетика" },
  { value: "defense", label: "ОПК" },
];

const services = [
  { value: "stamps", label: "Штампы" },
  { value: "molds", label: "Пресс-формы" },
  { value: "design", label: "Проектирование" },
  { value: "repair", label: "Ремонт" },
];

interface CaseFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    description: string;
    client: string;
    industry: string;
    services: string[];
    challenge: string;
    solution: string;
    results: string;
    image_url: string;
    status: string;
    featured: boolean;
  };
}

export function CaseForm({ initialData }: CaseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    client: initialData?.client || "",
    industry: initialData?.industry || "",
    services: initialData?.services || [],
    challenge: initialData?.challenge || "",
    solution: initialData?.solution || "",
    results: initialData?.results || "",
    image_url: initialData?.image_url || "",
    status: initialData?.status || "draft",
    featured: initialData?.featured || false,
  });
  const router = useRouter();
  const supabase = createClient();
  const isEditing = !!initialData?.id;

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const map: Record<string, string> = {
          а: "a",
          б: "b",
          в: "v",
          г: "g",
          д: "d",
          е: "e",
          ё: "yo",
          ж: "zh",
          з: "z",
          и: "i",
          й: "y",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "h",
          ц: "c",
          ч: "ch",
          ш: "sh",
          щ: "sch",
          ъ: "",
          ы: "y",
          ь: "",
          э: "e",
          ю: "yu",
          я: "ya",
        };
        return map[char] || char;
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("cases").update(data).eq("id", initialData.id));
    } else {
      ({ error } = await supabase.from("cases").insert(data));
    }

    if (error) {
      toast.error("Ошибка сохранения: " + error.message);
      setIsLoading(false);
      return;
    }

    toast.success(isEditing ? "Кейс обновлён" : "Кейс создан");
    router.push("/admin/cases");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/cases">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? "Редактировать кейс" : "Новый кейс"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Измените данные кейса" : "Добавьте новый проект в портфолио"}
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Штампы для автомобильных панелей"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL (slug)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="automotive-panels"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Краткое описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Разработка и изготовление комплекта штампов..."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client">Клиент</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        client: e.target.value,
                      }))
                    }
                    placeholder="АвтоВАЗ"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Отрасль</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите отрасль" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Услуги</Label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <Button
                      key={service.value}
                      type="button"
                      variant={formData.services.includes(service.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleService(service.value)}
                    >
                      {service.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Детали проекта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenge">Задача</Label>
                <Textarea
                  id="challenge"
                  value={formData.challenge}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      challenge: e.target.value,
                    }))
                  }
                  placeholder="Опишите задачу, которую нужно было решить..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Решение</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      solution: e.target.value,
                    }))
                  }
                  placeholder="Опишите, как вы решили задачу..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Результаты</Label>
                <Textarea
                  id="results"
                  value={formData.results}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      results: e.target.value,
                    }))
                  }
                  placeholder="Опишите достигнутые результаты..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Публикация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="published">Опубликован</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Показывать на главной</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, featured: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Изображение</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
