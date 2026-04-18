import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Image as ImageIcon,
  GripVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DeleteEquipmentButton } from "@/components/admin/delete-equipment-button";

const PAGE_SIZE = 10;

export default async function AdminEquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { data: equipment, count } = await supabase
    .from("equipment")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Оборудование</h1>
          <p className="text-muted-foreground">Управление каталогом оборудования</p>
        </div>
        <Button asChild>
          <Link href="/admin/equipment/new">
            <Plus className="w-4 h-4 mr-2" />
            Добавить оборудование
          </Link>
        </Button>
      </div>

      {equipment && equipment.length > 0 ? (
        <div className="grid gap-4">
          {equipment.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GripVertical className="w-4 h-4" />
                    <span className="text-sm font-mono">{item.sort_order}</span>
                  </div>

                  <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Активен" : "Скрыт"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/equipment/${item.id}`}>
                          <Pencil className="w-3 h-3 mr-1" />
                          Редактировать
                        </Link>
                      </Button>
                      <DeleteEquipmentButton id={item.id} name={item.name} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Оборудование пока не добавлено</p>
            <Button asChild>
              <Link href="/admin/equipment/new">
                <Plus className="w-4 h-4 mr-2" />
                Добавить первое оборудование
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Страница {page} из {totalPages}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild disabled={page <= 1}>
              <Link href={`/admin/equipment?page=${page - 1}`}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Назад
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild disabled={page >= totalPages}>
              <Link href={`/admin/equipment?page=${page + 1}`}>
                Вперёд
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
