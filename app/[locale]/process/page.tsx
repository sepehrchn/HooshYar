import {FinalCta, PageHero, ProcessTimeline} from '@/components/sections';
import {pageContent} from '@/lib/pages';
import type {Locale} from '@/types/locale';

export default async function ProcessPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const hero = pageContent.process.hero[locale];

  return (
    <main>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} />
      <ProcessTimeline locale={locale} />
      <FinalCta locale={locale} />
    </main>
  );
}
