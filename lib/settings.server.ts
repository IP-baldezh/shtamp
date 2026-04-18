/**
 * Server-only settings helpers.
 * Import this file ONLY in Server Components / Route Handlers / Server Actions.
 * Client Components must use @/lib/settings (types + constants only).
 */
import { createClient } from "@/lib/supabase/server";
import {
  defaultCompanySettings,
  defaultSocialLinks,
  type CompanySettings,
  type SocialLink,
} from "@/lib/settings";

/** Fetch company settings from Supabase (server-side). */
export async function getCompanySettings(): Promise<CompanySettings> {
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

/** Fetch social links from Supabase (server-side).
 *  Handles both legacy object format {telegram, whatsapp} and new array format. */
export async function getSocialLinks(): Promise<SocialLink[]> {
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
