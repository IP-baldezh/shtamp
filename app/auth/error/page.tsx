import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Ошибка авторизации
        </h1>
        <p className="text-muted-foreground mb-6">
          Произошла ошибка при входе в систему. Пожалуйста, попробуйте снова.
        </p>
        <Button asChild>
          <Link href="/admin/login">Попробовать снова</Link>
        </Button>
      </div>
    </div>
  )
}
