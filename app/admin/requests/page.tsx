import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Building2, Clock, AlertTriangle } from "lucide-react";
import { MarkAsReadButton } from "@/components/admin/mark-as-read-button";
import { DeleteRequestButton } from "@/components/admin/delete-request-button";

export default async function AdminRequestsPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const unreadCount = requests?.filter((r) => !r.is_read).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Заявки</h1>
        <p className="text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} непрочитанных заявок` : "Все заявки прочитаны"}
        </p>
      </div>

      {requests && requests.length > 0 ? (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className={request.is_read ? "opacity-75" : "border-primary/50"}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{request.name}</h3>
                      {!request.is_read && <Badge>Новая</Badge>}
                      {request.is_urgent && (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Срочно
                        </Badge>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${request.phone}`} className="hover:text-foreground">
                          {request.phone}
                        </a>
                      </div>
                      {request.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${request.email}`} className="hover:text-foreground">
                            {request.email}
                          </a>
                        </div>
                      )}
                      {request.company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {request.company}
                        </div>
                      )}
                    </div>

                    {request.message && (
                      <p className="mt-3 text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                        {request.message}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(request.created_at).toLocaleString("ru-RU")}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Тип:{" "}
                        {request.request_type === "callback"
                          ? "Обратный звонок"
                          : request.request_type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {!request.is_read && (
                      <MarkAsReadButton id={request.id} table="contact_requests" />
                    )}
                    <DeleteRequestButton id={request.id} table="contact_requests" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Заявок пока нет</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
