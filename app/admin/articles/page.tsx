import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Eye, Image as ImageIcon, Calendar } from "lucide-react"
import { DeleteArticleButton } from "@/components/admin/delete-article-button"

export default async function AdminArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Статьи</h1>
          <p className="text-muted-foreground">Управление блогом и новостями</p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить статью
          </Link>
        </Button>
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {article.excerpt}
                        </p>
                      </div>
                      <Badge
                        variant={article.status === "published" ? "default" : "secondary"}
                      >
                        {article.status === "published" ? "Опубликована" : "Черновик"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      {article.category && (
                        <span className="text-xs text-muted-foreground">
                          {article.category}
                        </span>
                      )}
                      {article.published_at && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.published_at).toLocaleDateString("ru-RU")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/articles/${article.id}`}>
                          <Pencil className="w-3 h-3 mr-1" />
                          Редактировать
                        </Link>
                      </Button>
                      {article.status === "published" && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/articles/${article.slug}`} target="_blank">
                            <Eye className="w-3 h-3 mr-1" />
                            Просмотр
                          </Link>
                        </Button>
                      )}
                      <DeleteArticleButton id={article.id} title={article.title} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Статьи пока не добавлены</p>
            <Button asChild>
              <Link href="/admin/articles/new">
                <Plus className="w-4 h-4 mr-2" />
                Добавить первую статью
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
