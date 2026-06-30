"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import type { Locale } from "@/types/locale";

export function ConditionalFooter({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const homePath = `/${locale}`;

  if (pathname === homePath || pathname === `${homePath}/`) {
    return null;
  }

  return <Footer locale={locale} />;
}
