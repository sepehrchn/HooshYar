import {FinalCta, PageHero} from '@/components/sections';
import {GlassCard, SectionHeading} from '@/components/ui';
import {pageContent, siteContent} from '@/lib/pages';
import type {Locale} from '@/types/locale';

export default async function PricingPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const hero = pageContent.pricing.hero[locale];

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} />
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {pageContent.pricing.tracks.map((track, index) => (
            <GlassCard key={track.en.title} glow={index === 1 ? 'violet' : 'cyan'}>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-primary">Custom Quote</p>
              <SectionHeading className="mt-5 text-3xl">{track[locale].title}</SectionHeading>
              <p className="mt-4 leading-7 text-text-muted">{track[locale].body}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard glow="magenta" className="mx-auto mt-6 max-w-7xl">
          <p className="leading-8 text-text-muted">{siteContent.pricing[locale]}</p>
        </GlassCard>
      </section>
      <FinalCta locale={locale} />
    </main>
  );
}
