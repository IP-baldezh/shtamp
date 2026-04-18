export interface CompanySettings {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
  telegram: string;
}

export const defaultCompanySettings: CompanySettings = {
  name: "ШТАМП",
  phone: "+7 (495) 123-45-67",
  email: "info@stamp.ru",
  address: "г. Москва, ул. Промышленная, 15",
  hours: "Пн-Пт: 9:00 - 18:00",
  whatsapp: "74951234567",
  telegram: "",
};

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
    whatsapp: s.whatsapp || defaultCompanySettings.whatsapp,
    telegram: s.telegram || defaultCompanySettings.telegram,
  };
}
