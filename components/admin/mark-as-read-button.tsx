"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"

export function MarkAsReadButton({
  id,
  table,
}: {
  id: string
  table: "contact_requests" | "quote_requests"
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleMarkAsRead = async () => {
    setIsLoading(true)
    await supabase.from(table).update({ is_read: true }).eq("id", id)
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleMarkAsRead}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <>
          <Check className="w-3 h-3 mr-1" />
          Прочитано
        </>
      )}
    </Button>
  )
}
