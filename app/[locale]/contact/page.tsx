import { ContactForm } from '@/components/forms';
import { ContactChannels, ContactFAQ } from '@/components/sections';
import { SectionReveal } from '@/components/motion';
import { GlassCard, GradientText, Heading, SectionHeading } from '@/components/ui';
import { pageContent } from '@/lib/pages';
import type { Locale } from '@/types/locale';
import { cn } from '@/lib/utils';

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isFa = locale === 'fa';
  const hero = pageContent.contact.hero[locale];
  const directContact = pageContent.contact.directContact;
  const faq = pageContent.contact.faq;

  return (
    <main>
      {/* Section Header - matching Services/Process pattern */}
      <section className="relative px-5 pb-12 pt-36 sm:px-8 sm:pb-16 sm:pt-40 lg:px-12 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-primary/10 blur-3xl"
        />
        <SectionReveal className="mx-auto max-w-5xl text-center">
          {/* Gradient label */}
          <Heading className="text-5xl sm:text-6xl lg:text-7xl">
            <GradientText
              style={{
                fontWeight: 800,
                letterSpacing: isFa ? 'normal' : '-0.065em',
              }}
            >
              {hero.eyebrow}
            </GradientText>
          </Heading>
          {/* Title */}
          <h2
            className={cn(
              'mx-auto mt-6 max-w-3xl font-heading text-2xl font-bold leading-tight text-text-primary sm:text-3xl',
              isFa && 'text-center'
            )}
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {hero.title}
          </h2>
          {/* Subhead */}
          <p
            className={cn(
              'mx-auto mt-4 max-w-3xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8',
              isFa && 'text-center'
            )}
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {hero.body}
          </p>
        </SectionReveal>
      </section>

      {/* Direct Contact Channels */}
      <ContactChannels intro={directContact.intro} channels={directContact.channels} locale={locale} />

      {/* FAQ */}
      <ContactFAQ items={faq} locale={locale} />

      {/* Form Section */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Guidance Card */}
          <GlassCard glow="cyan">
            <SectionHeading className="text-2xl md:text-3xl">
              {locale === 'fa' ? 'قبل از ارسال' : 'Before you send'}
            </SectionHeading>
            <ul className="mt-6 grid gap-4 leading-7 text-text-muted">
              <li>
                •{' '}
                {locale === 'fa'
                  ? 'هدف پروژه و مسئله اصلی را توضیح دهید.'
                  : 'Describe the project goal and main problem.'}
              </li>
              <li>
                •{' '}
                {locale === 'fa' ? 'زمان‌بندی تقریبی را اضافه کنید.' : 'Add your approximate timeline.'}
              </li>
              <li>
                •{' '}
                {locale === 'fa'
                  ? 'اگر ابزار یا سیستم فعلی دارید، نام ببرید.'
                  : 'Mention any existing tools or systems.'}
              </li>
            </ul>
            <p className="mt-6 rounded-2xl border border-glass-border bg-bg-void/60 p-4 font-mono text-xs leading-6 text-text-muted">
              {locale === 'fa'
                ? 'Placeholder: برای ارسال ایمیل واقعی باید RESEND_API_KEY و CONTACT_TO_EMAIL تنظیم شود.'
                : 'Placeholder: configure RESEND_API_KEY and CONTACT_TO_EMAIL for real email delivery.'}
            </p>
          </GlassCard>

          {/* Form Card */}
          <GlassCard glow="magenta">
            <ContactForm locale={locale} />
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
