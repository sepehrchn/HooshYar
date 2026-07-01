'use client';

import { SectionReveal } from '@/components/motion';
import { GradientText } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

interface ServicesCtaProps {
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  locale: Locale;
}

export function ServicesCta({
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  locale,
}: ServicesCtaProps) {
  const isFa = locale === 'fa';

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <SectionReveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-glass-border bg-glass-bg p-8 shadow-glass-lift backdrop-blur-2xl md:p-12 lg:p-16">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-cyan-primary/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-magenta-glow/10 blur-3xl"
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2
              className={cn(
                'font-heading text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl',
                isFa && 'text-right'
              )}
              dir={isFa ? 'rtl' : 'ltr'}
            >
              <GradientText>{headline}</GradientText>
            </h2>

            <p
              className={cn(
                'mx-auto mt-5 max-w-2xl text-base leading-8 text-text-muted md:text-lg',
                isFa && 'text-right'
              )}
              dir={isFa ? 'rtl' : 'ltr'}
            >
              {subhead}
            </p>

            <div
              className={cn(
                'mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center',
                isFa && 'sm:flex-row-reverse'
              )}
            >
              <a
                href={`/${locale}/contact`}
                className={cn(
                  'inline-flex items-center justify-center rounded-full bg-cyan-primary px-8 py-3 text-base font-semibold text-bg-void transition-all duration-300 hover:bg-cyan-primary/90 hover:shadow-cyan-glow',
                  isFa && 'w-full sm:w-auto'
                )}
              >
                {primaryCta}
              </a>

              <a
                href={`/${locale}/work`}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border border-glass-border bg-transparent px-8 py-3 text-base font-medium text-text-primary transition-all duration-300 hover:bg-white/[0.055] hover:border-white/20',
                  isFa && 'w-full sm:w-auto'
                )}
              >
                {secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
