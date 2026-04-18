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
