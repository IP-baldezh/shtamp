"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

const categories = [
  "Технологии",
  "Обслуживание",
  "Индустрия",
  "Новости компании",
  "Кейсы",
]

interface ArticleFormProps {
  initialData?: {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    image_url: string
    category: string
    author: string
    status: string
  }
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    category: initialData?.category || "",
    author: initialData?.author || "Редакция",
    status: initialData?.status || "draft",
  })
  const router = useRouter()
  const supabase = createClient()
  const isEditing = !!initialData?.id

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const map: Record<string, string> = {
          а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
          з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
          п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
          ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        }
        return map[char] || char
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const data = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      published_at: formData.status === "published" ? new Date().toISOString() : null,
    }

    if (isEditing) {
      await supabase.from("articles").update(data).eq("id", initialData.id)
    } else {
      await supabase.from("articles").insert(data)
    }

    router.push("/admin/articles")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/articles">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? "Редактировать статью" : "Новая статья"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Измените данные статьи" : "Добавьте новую статью в блог"}
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
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Заголовок *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Как выбрать материал для штампа"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL (slug)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="material-selection-guide"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Краткое описание</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Краткое описание статьи для превью..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Содержание</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Полный текст статьи..."
                  rows={15}
                />
              </div>
            </CardContent>
          </Card>
        </div>

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
                    <SelectItem value="published">Опубликована</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Автор</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  placeholder="Редакция"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Изображение</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">URL изображения</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              {formData.image_url && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
