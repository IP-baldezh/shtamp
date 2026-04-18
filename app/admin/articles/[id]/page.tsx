import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArticleForm } from "@/components/admin/article-form"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <ArticleForm
      initialData={{
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        content: article.content || "",
        image_url: article.image_url || "",
        category: article.category || "",
        author: article.author || "Редакция",
        status: article.status,
      }}
    />
  )
}
