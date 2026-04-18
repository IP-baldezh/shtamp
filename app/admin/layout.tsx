import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If no user, just render children (login page will be shown by middleware)
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar user={user} />
      <div className="lg:pl-64">
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
