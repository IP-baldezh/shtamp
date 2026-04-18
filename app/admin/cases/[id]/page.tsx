import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CaseForm } from "@/components/admin/case-form"

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: caseItem } = await supabase
    .from("cases")
    .select("*")
    .eq("id", id)
    .single()

  if (!caseItem) {
    notFound()
  }

  return (
    <CaseForm
      initialData={{
        id: caseItem.id,
        title: caseItem.title,
        slug: caseItem.slug,
        description: caseItem.description || "",
        client: caseItem.client || "",
        industry: caseItem.industry || "",
        services: caseItem.services || [],
        challenge: caseItem.challenge || "",
        solution: caseItem.solution || "",
        results: caseItem.results || "",
        image_url: caseItem.image_url || "",
        status: caseItem.status,
        featured: caseItem.featured,
      }}
    />
  )
}
