import {FinalCta, PageHero} from '@/components/sections';
import {GlassCard, SectionHeading} from '@/components/ui';
import {pageContent, siteContent} from '@/lib/pages';
import type {Locale} from '@/types/locale';

export default async function AboutPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const hero = pageContent.about.hero[locale];

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} />
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <GlassCard glow="cyan">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-primary">Mission</p>
            <SectionHeading className="mt-5 text-3xl">{locale === 'fa' ? 'چرا هوش‌یار؟' : 'Why Hoosh Yar?'}</SectionHeading>
            <p className="mt-5 leading-8 text-text-muted">{pageContent.about.mission[locale]}</p>
          </GlassCard>
          <GlassCard glow="violet">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-primary">Placeholder bio</p>
            <p className="mt-5 text-xl leading-9 text-text-primary">{siteContent.about[locale]}</p>
          </GlassCard>
        </div>
      </section>
      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {pageContent.about.principles.map((principle, index) => (
            <GlassCard key={principle.en} glow={index === 1 ? 'violet' : 'cyan'}>
              <p className="font-mono text-xs text-text-muted">0{index + 1}</p>
              <h2 className="mt-4 font-heading text-2xl font-bold text-text-primary">{principle[locale]}</h2>
            </GlassCard>
          ))}
        </div>
      </section>
      <FinalCta locale={locale} />
    </main>
  );
}
