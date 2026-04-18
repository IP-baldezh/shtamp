import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Eye, Star, Image as ImageIcon } from "lucide-react"
import { DeleteCaseButton } from "@/components/admin/delete-case-button"

const industryLabels: Record<string, string> = {
  automotive: "Автопром",
  aerospace: "Авиакосмос",
  electronics: "Электроника",
  appliances: "Бытовая техника",
  construction: "Строительство",
  medical: "Медицина",
  energy: "Энергетика",
  defense: "ОПК",
}

export default async function AdminCasesPage() {
  const supabase = await createClient()
  const { data: cases } = await supabase
    .from("cases")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Кейсы</h1>
          <p className="text-muted-foreground">
            Управление портфолио проектов
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cases/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить кейс
          </Link>
        </Button>
      </div>

      {cases && cases.length > 0 ? (
        <div className="grid gap-4">
          {cases.map((caseItem) => (
            <Card key={caseItem.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Image preview */}
                  <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {caseItem.image_url ? (
                      <img
                        src={caseItem.image_url}
                        alt={caseItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            {caseItem.title}
                          </h3>
                          {caseItem.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {caseItem.description}
                        </p>
                      </div>
                      <Badge
                        variant={caseItem.status === "published" ? "default" : "secondary"}
                      >
                        {caseItem.status === "published" ? "Опубликован" : "Черновик"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      {caseItem.industry && (
                        <span className="text-xs text-muted-foreground">
                          {industryLabels[caseItem.industry] || caseItem.industry}
                        </span>
                      )}
                      {caseItem.client && (
                        <span className="text-xs text-muted-foreground">
                          {caseItem.client}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/cases/${caseItem.id}`}>
                          <Pencil className="w-3 h-3 mr-1" />
                          Редактировать
                        </Link>
                      </Button>
                      {caseItem.status === "published" && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/cases/${caseItem.slug}`} target="_blank">
                            <Eye className="w-3 h-3 mr-1" />
                            Просмотр
                          </Link>
                        </Button>
                      )}
                      <DeleteCaseButton id={caseItem.id} title={caseItem.title} />
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
            <p className="text-muted-foreground mb-4">Кейсы пока не добавлены</p>
            <Button asChild>
              <Link href="/admin/cases/new">
                <Plus className="w-4 h-4 mr-2" />
                Добавить первый кейс
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
