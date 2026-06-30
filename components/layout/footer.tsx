import {LogoMark} from '@/components/ui/logo-mark';
import {SectionNavLink} from '@/components/layout/section-nav-link';
import {siteContent} from '@/lib/site';
import type {Locale} from '@/types/locale';

export function Footer({locale}: {locale: Locale}) {
  const brand = siteContent.brand[locale];
  const note = locale === 'fa'
    ? 'خدمات هوش مصنوعی، اتوماسیون و توسعه وب با هویت آینده‌نگر.'
    : 'AI services, automation, and web development with a future-ready identity.';
  const placeholder = locale === 'fa' ? 'اطلاعات شبکه‌های اجتماعی و ایمیل نهایی هنوز جایگزین نشده‌اند.' : 'Social links and final email details are still placeholder content.';

  return (
    <footer className="relative px-5 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-panel border border-glass-border bg-glass-bg p-6 shadow-glass-lift backdrop-blur-2xl md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <LogoMark label={brand.name} />
            <p className="mt-5 max-w-xl leading-7 text-text-muted">{note}</p>
            <p className="mt-4 rounded-2xl border border-glass-border bg-bg-void/50 px-4 py-3 font-mono text-xs text-text-muted">
              Placeholder: {placeholder}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:text-end">
            {siteContent.navigation.slice(0, 6).map((item) => (
              <SectionNavLink key={item.href} locale={locale} href={item.href} className="text-sm text-text-muted transition hover:text-cyan-primary motion-reduce:transition-none">
                {item[locale]}
              </SectionNavLink>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-glass-border pt-5 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {brand.name}</span>
          <span className="font-mono">cyan → violet → magenta</span>
        </div>
      </div>
    </footer>
  );
}
