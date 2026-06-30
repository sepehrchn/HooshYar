"use client";

import { useState } from "react";
import { SectionNavLink } from "@/components/layout/section-nav-link";
import { LogoMark } from "@/components/ui/logo-mark";
import { getSectionHref } from "@/lib/section-nav";
import { siteContent } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function Navigation({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const otherLocale: Locale = locale === "en" ? "fa" : "en";
  const quoteLabel = locale === "fa" ? "شروع همکاری" : "Start a Project";
  const menuLabel = locale === "fa" ? "فهرست" : "Menu";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <nav
        aria-label={locale === "fa" ? "ناوبری اصلی" : "Main navigation"}
        className="mx-auto max-w-7xl rounded-full border border-glass-border bg-bg-void/70 px-4 py-3 shadow-glass-lift backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href={getSectionHref(locale, "/")}
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
          >
            <LogoMark />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {siteContent.navigation.map((item) => (
              <SectionNavLink
                key={item.href}
                locale={locale}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-text-muted transition duration-300 ease-premium hover:bg-white/[0.06] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-primary motion-reduce:transition-none"
              >
                {item[locale]}
              </SectionNavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={`/${otherLocale}`}
              hrefLang={otherLocale}
              className="rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-violet-core/70 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-core motion-reduce:transition-none"
            >
              {otherLocale.toUpperCase()}
            </a>
            <SectionNavLink
              href="/contact"
              locale={locale}
              className="rounded-full bg-brand-beam px-5 py-2.5 text-sm font-bold text-bg-void shadow-magenta-glow transition hover:shadow-cyan-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void motion-reduce:transition-none"
            >
              {quoteLabel}
            </SectionNavLink>
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={
              isOpen
                ? locale === "fa"
                  ? "بستن فهرست"
                  : "Close menu"
                : menuLabel
            }
            className="inline-flex rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-sm font-semibold text-text-primary sm:hidden"
          >
            {menuLabel}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-premium sm:hidden motion-reduce:transition-none",
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="mt-4 grid gap-2 border-t border-glass-border pt-4">
              {siteContent.navigation.map((item) => (
                <SectionNavLink
                  key={item.href}
                  locale={locale}
                  href={item.href}
                  onNavigate={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-text-muted hover:bg-white/[0.06] hover:text-text-primary"
                >
                  {item[locale]}
                </SectionNavLink>
              ))}
              <a
                href={`/${otherLocale}`}
                hrefLang={otherLocale}
                className="rounded-2xl px-4 py-3 text-cyan-primary"
              >
                {otherLocale.toUpperCase()}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
