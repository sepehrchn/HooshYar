'use client';

import { SectionReveal } from '@/components/motion';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

interface FAQItem {
  question: { en: string; fa: string };
  answer: { en: string; fa: string };
}

interface ContactFAQProps {
  items: FAQItem[];
  locale: Locale;
}

export function ContactFAQ({ items, locale }: ContactFAQProps) {
  const isFa = locale === 'fa';

  return (
    <section className="px-5 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-4">
          {items.map((item, index) => (
            <SectionReveal
              key={item.question.en}
              transition={{ delay: index * 0.1, duration: 0.65 }}
            >
              <div className="overflow-hidden rounded-glass border border-glass-border bg-glass-bg p-6 shadow-glass-lift backdrop-blur-xl">
                {/* Question */}
                <h3
                  className={cn(
                    'text-base font-bold leading-7 text-text-primary md:text-lg',
                    isFa && 'text-right'
                  )}
                  dir={isFa ? 'rtl' : 'ltr'}
                >
                  {item.question[locale]}
                </h3>
                {/* Answer */}
                <p
                  className={cn(
                    'mt-3 text-sm leading-7 text-text-muted',
                    isFa && 'text-right'
                  )}
                  dir={isFa ? 'rtl' : 'ltr'}
                >
                  {item.answer[locale]}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
