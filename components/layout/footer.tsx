"use client";

import { LogoMark } from "@/components/ui/logo-mark";
import { SectionNavLink } from "@/components/layout/section-nav-link";
import { siteContent } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function Footer({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";
  const tagline = siteContent.footer.tagline[locale];
  const pagesLabel = siteContent.footer.columnsLabel.pages[locale];
  const contactLabel = siteContent.footer.columnsLabel.contact[locale];
  const ctaLabel = siteContent.footer.cta[locale];
  const copyright = siteContent.footer.copyright[locale];
  const builtWith = siteContent.footer.builtWith[locale];

  // Social icons with placeholder links
  const socialLinks = [
    {
      name: "Instagram",
      href: siteContent.social.instagram,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: siteContent.social.telegram,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: siteContent.social.whatsapp,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
    },
    {
      name: "Bale",
      href: siteContent.social.bale,
      icon: (
        <div className="grid h-6 w-6 place-items-center rounded bg-current text-bg-void" aria-hidden="true">
          <span className="text-xs font-bold leading-none">B</span>
        </div>
      ),
    },
    {
      name: "Email",
      href: siteContent.social.email,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Contact info items
  const contactItems = [
    {
      label: siteContent.contact.emailLabel[locale],
      value: siteContent.contact.email,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: siteContent.contact.telegramLabel[locale],
      value: siteContent.contact.telegram,
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      label: siteContent.contact.whatsappLabel[locale],
      value: siteContent.contact.whatsapp,
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative px-5 pb-8 sm:px-8 lg:px-12">
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(157, 92, 255, 0.06) 0%, transparent 100%)",
        }}
      />

      <div
        className="relative mx-auto max-w-7xl overflow-hidden border-t border-white/[0.08] px-8 pb-8 pt-16 md:px-12 md:pb-10 md:pt-20"
        style={{ backgroundColor: "rgba(5, 6, 15, 0.95)" }}
      >
        {/* 3 Column Grid */}
        <div
          className={cn(
            "grid gap-12 md:gap-8",
            isRTL
              ? "md:grid-cols-[1fr_0.8fr_1fr] md:text-right"
              : "md:grid-cols-[1fr_0.8fr_1fr] md:text-left"
          )}
        >
          {/* Column 1 - Brand */}
          <div className={cn(isRTL ? "md:order-3" : "md:order-1")}>
            <LogoMark locale={locale} showText={true} />
            <p className="mt-4 text-[13px] leading-relaxed text-text-muted">
              {tagline}
            </p>

            {/* Social icons with stagger animation */}
            <div
              className={cn(
                "mt-6 flex items-center gap-3",
                isRTL ? "flex-row-reverse" : "flex-row"
              )}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted transition-all duration-300 hover:text-cyan-primary motion-reduce:transition-none"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 50}ms backwards`,
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Navigation Links */}
          <div className={cn(isRTL ? "md:order-2" : "md:order-2")}>
            <h3
              className="mb-4 text-[11px] font-bold uppercase tracking-wider text-text-muted"
              style={{ fontWeight: 700 }}
            >
              {pagesLabel}
            </h3>
            <nav className="grid gap-2">
              {siteContent.navigation.map((item) => (
                <SectionNavLink
                  key={item.href}
                  locale={locale}
                  href={item.href}
                  className="text-[13px] text-text-muted transition hover:text-white motion-reduce:transition-none"
                >
                  {item[locale]}
                </SectionNavLink>
              ))}
            </nav>
          </div>

          {/* Column 3 - Contact Info */}
          <div className={cn(isRTL ? "md:order-1" : "md:order-3")}>
            <h3
              className="mb-4 text-[11px] font-bold uppercase tracking-wider text-text-muted"
              style={{ fontWeight: 700 }}
            >
              {contactLabel}
            </h3>
            <div className="grid gap-3">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2 text-[13px] text-text-muted",
                    isRTL ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>
                    {item.label}: {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <SectionNavLink
              href="/contact"
              locale={locale}
              className="mt-6 inline-block rounded-full border border-glass-border bg-glass-bg px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-cyan-primary/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-primary motion-reduce:transition-none"
            >
              {ctaLabel}
            </SectionNavLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            "mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between",
            isRTL ? "sm:flex-row-reverse" : "sm:flex-row"
          )}
        >
          <span>{copyright}</span>
          <span className="italic">{builtWith}</span>
        </div>
      </div>

      {/* Add fadeInUp keyframe animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}
