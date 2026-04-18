import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, FileText, MessageSquare, FileQuestion, Eye, Clock } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch counts
  const [
    { count: casesCount },
    { count: articlesCount },
    { count: contactsCount },
    { count: quotesCount },
    { count: unreadContacts },
    { count: unreadQuotes },
  ] = await Promise.all([
    supabase.from("cases").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("contact_requests").select("*", { count: "exact", head: true }),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }),
    supabase.from("contact_requests").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("is_read", false),
  ])

  // Fetch recent requests
  const { data: recentContacts } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: recentQuotes } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      name: "Кейсы",
      value: casesCount || 0,
      icon: FolderKanban,
      href: "/admin/cases",
      color: "bg-blue-500",
    },
    {
      name: "Статьи",
      value: articlesCount || 0,
      icon: FileText,
      href: "/admin/articles",
      color: "bg-green-500",
    },
    {
      name: "Заявки",
      value: contactsCount || 0,
      badge: unreadContacts || 0,
      icon: MessageSquare,
      href: "/admin/requests",
      color: "bg-orange-500",
    },
    {
      name: "Запросы КП",
      value: quotesCount || 0,
      badge: unreadQuotes || 0,
      icon: FileQuestion,
      href: "/admin/quotes",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Обзор</h1>
        <p className="text-muted-foreground">
          Добро пожаловать в панель управления сайтом
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  {stat.badge !== undefined && stat.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                      +{stat.badge} новых
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent contact requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Последние заявки</CardTitle>
            <Link
              href="/admin/requests"
              className="text-sm text-primary hover:underline"
            >
              Все заявки
            </Link>
          </CardHeader>
          <CardContent>
            {recentContacts && recentContacts.length > 0 ? (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {contact.name}
                        </p>
                        {!contact.is_read && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                        {contact.is_urgent && (
                          <span className="px-1.5 py-0.5 text-xs bg-destructive text-destructive-foreground rounded">
                            Срочно
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.phone}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(contact.created_at).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Нет заявок
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent quote requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Последние запросы КП</CardTitle>
            <Link
              href="/admin/quotes"
              className="text-sm text-primary hover:underline"
            >
              Все запросы
            </Link>
          </CardHeader>
          <CardContent>
            {recentQuotes && recentQuotes.length > 0 ? (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {quote.company}
                        </p>
                        {!quote.is_read && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {quote.contact_person} • {quote.product_type}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(quote.created_at).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Нет запросов КП
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
