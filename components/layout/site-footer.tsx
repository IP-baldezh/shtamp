import { createClient } from "@/lib/supabase/server";
import { getSocialLinks } from "@/lib/settings";
import { Footer } from "./footer";

export async function SiteFooter() {
  const supabase = await createClient();
  const [{ data: settingsRow }, socialLinks] = await Promise.all([
    supabase.from("site_settings").select("value").eq("key", "company").single(),
    getSocialLinks(),
  ]);

  const s = (settingsRow?.value as Record<string, string> | null) ?? {};

  return (
    <Footer
      contact={{
        phone: s.phone ?? "+7 (495) 123-45-67",
        email: s.email ?? "info@stamp.ru",
        address: s.address ?? "г. Москва, ул. Промышленная, 15",
        hours: s.hours ?? "Пн-Пт: 9:00 - 18:00",
      }}
      socialLinks={socialLinks}
    />
  );
}
