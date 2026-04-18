import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { EquipmentForm } from "@/components/admin/equipment-form"

export default async function EditEquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: equipment } = await supabase
    .from("equipment")
    .select("*")
    .eq("id", id)
    .single()

  if (!equipment) {
    notFound()
  }

  return (
    <EquipmentForm
      initialData={{
        id: equipment.id,
        name: equipment.name,
        category: equipment.category,
        description: equipment.description || "",
        specifications: equipment.specifications || {},
        image_url: equipment.image_url || "",
        sort_order: equipment.sort_order,
        is_active: equipment.is_active,
      }}
    />
  )
}
