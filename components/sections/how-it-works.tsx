'use client';

import { SectionReveal } from '@/components/motion';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

interface Step {
  title: string;
  body: string;
}

interface HowItWorksProps {
  steps: {
    en: Step[];
    fa: Step[];
  };
  locale: Locale;
}

export function HowItWorks({ steps, locale }: HowItWorksProps) {
  const isFa = locale === 'fa';
  const stepsData = steps[locale];

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
              {isFa ? 'چگونه کار می‌کنیم' : 'How It Works'}
            </h2>
          </div>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient line - horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-8 h-0.5 w-[80%] -translate-x-1/2 bg-gradient-to-r from-cyan-primary via-violet-core to-magenta-glow opacity-50 md:block hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-8 top-16 h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-cyan-primary via-violet-core to-magenta-glow opacity-50 md:hidden"
          />

          {/* Steps */}
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {stepsData.map((step, index) => (
              <SectionReveal
                key={step.title}
                transition={{ delay: index * 0.15, duration: 0.65 }}
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Step number */}
                  <div
                    className={cn(
                      'relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-glass-border bg-bg-void font-mono text-2xl font-bold shadow-glass-lift',
                      index === 0 && 'text-cyan-primary shadow-cyan-glow',
                      index === 1 && 'text-violet-core shadow-violet-glow',
                      index === 2 && 'text-magenta-glow shadow-magenta-glow'
                    )}
                  >
                    0{index + 1}
                  </div>

                  {/* Content */}
                  <div className="rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-xl">
                    <h3
                      className={cn(
                        'font-heading text-xl font-bold text-text-primary md:text-2xl',
                        isFa && 'text-right'
                      )}
                      dir={isFa ? 'rtl' : 'ltr'}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 text-sm leading-7 text-text-muted md:text-base',
                        isFa && 'text-right'
                      )}
                      dir={isFa ? 'rtl' : 'ltr'}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
