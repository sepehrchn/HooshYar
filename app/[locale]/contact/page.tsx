import {ContactForm} from '@/components/forms';
import {PageHero} from '@/components/sections';
import {GlassCard, SectionHeading} from '@/components/ui';
import {pageContent} from '@/lib/pages';
import type {Locale} from '@/types/locale';

export default async function ContactPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const hero = pageContent.contact.hero[locale];

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} />
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassCard glow="cyan">
            <SectionHeading className="text-3xl">{locale === 'fa' ? 'قبل از ارسال' : 'Before you send'}</SectionHeading>
            <ul className="mt-6 grid gap-4 leading-7 text-text-muted">
              <li>• {locale === 'fa' ? 'هدف پروژه و مسئله اصلی را توضیح دهید.' : 'Describe the project goal and main problem.'}</li>
              <li>• {locale === 'fa' ? 'زمان‌بندی تقریبی را اضافه کنید.' : 'Add your approximate timeline.'}</li>
              <li>• {locale === 'fa' ? 'اگر ابزار یا سیستم فعلی دارید، نام ببرید.' : 'Mention any existing tools or systems.'}</li>
            </ul>
            <p className="mt-6 rounded-2xl border border-glass-border bg-bg-void/60 p-4 font-mono text-xs leading-6 text-text-muted">
              {locale === 'fa' ? 'Placeholder: برای ارسال ایمیل واقعی باید RESEND_API_KEY و CONTACT_TO_EMAIL تنظیم شود.' : 'Placeholder: configure RESEND_API_KEY and CONTACT_TO_EMAIL for real email delivery.'}
            </p>
          </GlassCard>
          <GlassCard glow="magenta">
            <ContactForm locale={locale} />
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
