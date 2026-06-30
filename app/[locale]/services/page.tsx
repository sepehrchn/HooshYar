import {FinalCta, PageHero, ServiceCards} from '@/components/sections';
import {GlassCard, SectionHeading} from '@/components/ui';
import {siteContent} from '@/lib/pages';
import type {Locale} from '@/types/locale';

export default async function ServicesPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;

  return (
    <main>
      <PageHero
        eyebrow={locale === 'fa' ? 'خدمات' : 'Services'}
        title={locale === 'fa' ? 'هوش مصنوعی، اتوماسیون و وب در یک سیستم.' : 'AI, automation, and web in one system.'}
        body={locale === 'fa' ? 'هر مسیر می‌تواند مستقل شروع شود یا در قالب یک سیستم یکپارچه برای رشد محصول و عملیات ترکیب شود.' : 'Each track can start independently or combine into one integrated system for product and operations growth.'}
      />
      <ServiceCards locale={locale} detailed />
      <section className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-panel border border-glass-border bg-glass-bg p-6 shadow-glass-lift backdrop-blur-2xl md:p-8">
          <SectionHeading>{locale === 'fa' ? 'خروجی‌های معمول' : 'Typical deliverables'}</SectionHeading>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {siteContent.services.map((service, index) => (
              <GlassCard key={service.slug} glow={index === 2 ? 'magenta' : 'cyan'}>
                <h2 className="font-heading text-2xl font-bold text-text-primary">{service[locale].title}</h2>
                <p className="mt-3 leading-7 text-text-muted">{locale === 'fa' ? 'استراتژی، طراحی، پیاده‌سازی، تست و تحویل قابل توسعه.' : 'Strategy, design, implementation, testing, and maintainable handoff.'}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <FinalCta locale={locale} />
    </main>
  );
}
