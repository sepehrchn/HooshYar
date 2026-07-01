import { HowItWorks, PageHero, ServicesCta } from '@/components/sections';
import { ServiceCategory } from '@/components/sections/service-category';
import { Eyebrow, Heading, Lead } from '@/components/ui';
import { SectionReveal } from '@/components/motion';
import { siteContent } from '@/lib/pages';
import type { Locale } from '@/types/locale';

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isFa = locale === 'fa';

  const servicesPage = siteContent.servicesPage;
  const header = servicesPage.header[locale];
  const categories = servicesPage.categories;
  const howItWorks = servicesPage.howItWorks;
  const cta = servicesPage.cta[locale];

  return (
    <main>
      {/* Section Header */}
      <section className="relative px-5 pb-8 pt-36 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-primary/10 blur-3xl"
        />
        <SectionReveal className="mx-auto max-w-5xl text-center">
          <Eyebrow>{header.label}</Eyebrow>
          <Heading className="mt-6">
            {isFa ? (
              header.headline
            ) : (
              <>
                {header.headline.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="bg-brand-beam bg-clip-text text-transparent">
                  {header.headline.split(' ').slice(-2).join(' ')}
                </span>
              </>
            )}
          </Heading>
          <Lead className="mx-auto mt-6">{header.subhead}</Lead>
        </SectionReveal>
      </section>

      {/* Three Service Categories */}
      {categories.map((category) => {
        const categoryCopy = category[locale];
        return (
          <ServiceCategory
            key={category.slug}
            slug={category.slug}
            accent={category.accent as 'cyan' | 'violet' | 'magenta'}
            title={categoryCopy.title}
            oneLiner={categoryCopy.oneLiner}
            services={category.services}
            locale={locale}
          />
        );
      })}

      {/* How It Works */}
      <HowItWorks steps={howItWorks} locale={locale} />

      {/* Final CTA */}
      <ServicesCta
        headline={cta.headline}
        subhead={cta.subhead}
        primaryCta={cta.primaryCta}
        secondaryCta={cta.secondaryCta}
        locale={locale}
      />
    </main>
  );
}
