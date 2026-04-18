"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { MessageSquare, FileQuestion } from "lucide-react";

export function RealtimeNotifications() {
  const supabase = createClient();
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "contact_requests",
        },
        (payload) => {
          if (!mountedRef.current) return;
          const { name, phone } = payload.new as {
            name: string;
            phone: string;
          };
          toast.info(
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
              <div>
                <p className="font-medium text-foreground">Новая заявка</p>
                <p className="text-sm text-muted-foreground">
                  {name} · {phone}
                </p>
              </div>
            </div>,
            {
              duration: 6000,
              action: {
                label: "Открыть",
                onClick: () => (window.location.href = "/admin/requests"),
              },
            },
          );
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "quote_requests",
        },
        (payload) => {
          if (!mountedRef.current) return;
          const { company, contact_person } = payload.new as {
            company: string;
            contact_person: string;
          };
          toast.info(
            <div className="flex items-start gap-3">
              <FileQuestion className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
              <div>
                <p className="font-medium text-foreground">Новый запрос КП</p>
                <p className="text-sm text-muted-foreground">
                  {company} · {contact_person}
                </p>
              </div>
            </div>,
            {
              duration: 6000,
              action: {
                label: "Открыть",
                onClick: () => (window.location.href = "/admin/quotes"),
              },
            },
          );
        },
      )
      .subscribe();

    return () => {
      mountedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
