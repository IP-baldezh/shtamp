"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function DeleteEquipmentButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    if (!confirm(`Удалить "${name}"?`)) return
    setIsDeleting(true)
    await supabase.from("equipment").delete().eq("id", id)
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-destructive hover:text-destructive"
    >
      {isDeleting ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <>
          <Trash2 className="w-3 h-3 mr-1" />
          Удалить
        </>
      )}
    </Button>
  )
}
