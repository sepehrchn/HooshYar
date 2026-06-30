"use client";

import type { ReactNode } from "react";
import { getSectionHref, getSectionId } from "@/lib/section-nav";
import type { Locale } from "@/types/locale";

export function SectionNavLink({
  locale,
  href,
  className,
  children,
  onNavigate,
}: {
  locale: Locale;
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const sectionId = getSectionId(href);
  const targetHref = getSectionHref(locale, href);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const homePath = `/${locale}`;
    const onHome =
      window.location.pathname === homePath ||
      window.location.pathname === `${homePath}/`;

    if (!onHome) {
      return;
    }

    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", targetHref);
    onNavigate?.();
  };

  return (
    <a href={targetHref} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
