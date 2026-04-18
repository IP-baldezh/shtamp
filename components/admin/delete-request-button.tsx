"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function DeleteRequestButton({
  id,
  table,
}: {
  id: string
  table: "contact_requests" | "quote_requests"
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    if (!confirm("Удалить эту заявку?")) return
    setIsLoading(true)
    await supabase.from(table).delete().eq("id", id)
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
      className="text-destructive hover:text-destructive"
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Trash2 className="w-3 h-3" />
      )}
    </Button>
  )
}
