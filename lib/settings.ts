export interface CompanySettings {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface SocialLink {
  /** Platform key: telegram | whatsapp | vk | youtube | instagram | pinterest | linkedin | tiktok | twitter | facebook | behance */
  icon: string;
  label: string;
  url: string;
}

export const defaultCompanySettings: CompanySettings = {
  name: "ШТАМП",
  phone: "+7 (495) 123-45-67",
  email: "info@stamp.ru",
  address: "г. Москва, ул. Промышленная, 15",
  hours: "Пн-Пт: 9:00 - 18:00",
};

export const defaultSocialLinks: SocialLink[] = [];

/** Formats a phone string to digits-only for href="tel:". */
export function phoneToTel(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/** Server-side: fetch company settings from Supabase. */
export async function getCompanySettings(): Promise<CompanySettings> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "company")
    .single();

  if (!data?.value) return defaultCompanySettings;
  const s = data.value as Record<string, string>;
  return {
    name: s.name || defaultCompanySettings.name,
    phone: s.phone || defaultCompanySettings.phone,
    email: s.email || defaultCompanySettings.email,
    address: s.address || defaultCompanySettings.address,
    hours: s.hours || defaultCompanySettings.hours,
  };
}

/** Server-side: fetch social links from Supabase.
 *  Handles both legacy object format {telegram, whatsapp} and new array format. */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "social")
    .single();

  if (!data?.value) return defaultSocialLinks;
  const v = data.value;

  // New format: array of SocialLink
  if (Array.isArray(v)) {
    return (v as SocialLink[]).filter((l) => l.url?.trim());
  }

  // Legacy format: { telegram: string, whatsapp: string } — auto-migrate
  const old = v as Record<string, string>;
  const migrated: SocialLink[] = [];
  if (old.telegram?.trim()) {
    migrated.push({ icon: "telegram", label: "Telegram", url: old.telegram.trim() });
  }
  if (old.whatsapp?.trim()) {
    const num = old.whatsapp.replace(/\D/g, "");
    migrated.push({ icon: "whatsapp", label: "WhatsApp", url: `https://wa.me/${num}` });
  }
  return migrated;
}
