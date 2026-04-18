import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Building2, Clock, FileText } from "lucide-react";
import { MarkAsReadButton } from "@/components/admin/mark-as-read-button";
import { DeleteRequestButton } from "@/components/admin/delete-request-button";

export default async function AdminQuotesPage() {
  const supabase = await createClient();
  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const unreadCount = quotes?.filter((q) => !q.is_read).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Запросы КП</h1>
        <p className="text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} непрочитанных запросов` : "Все запросы прочитаны"}
        </p>
      </div>

      {quotes && quotes.length > 0 ? (
        <div className="grid gap-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className={quote.is_read ? "opacity-75" : "border-primary/50"}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{quote.company}</h3>
                      {!quote.is_read && <Badge>Новый</Badge>}
                      {quote.has_drawings && (
                        <Badge variant="secondary">
                          <FileText className="w-3 h-3 mr-1" />
                          Есть чертежи
                        </Badge>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {quote.contact_person}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${quote.phone}`} className="hover:text-foreground">
                          {quote.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${quote.email}`} className="hover:text-foreground">
                          {quote.email}
                        </a>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 bg-muted/50 p-4 rounded-lg">
                      {quote.product_type && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Тип продукции</p>
                          <p className="text-sm font-medium">{quote.product_type}</p>
                        </div>
                      )}
                      {quote.material && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Материал</p>
                          <p className="text-sm font-medium">{quote.material}</p>
                        </div>
                      )}
                      {quote.quantity && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Объём</p>
                          <p className="text-sm font-medium">{quote.quantity}</p>
                        </div>
                      )}
                      {quote.deadline && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Сроки</p>
                          <p className="text-sm font-medium">{quote.deadline}</p>
                        </div>
                      )}
                    </div>

                    {quote.additional_info && (
                      <p className="mt-3 text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                        {quote.additional_info}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-4">
                      <Clock className="w-3 h-3" />
                      {new Date(quote.created_at).toLocaleString("ru-RU")}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {!quote.is_read && <MarkAsReadButton id={quote.id} table="quote_requests" />}
                    <DeleteRequestButton id={quote.id} table="quote_requests" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Запросов КП пока нет</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
