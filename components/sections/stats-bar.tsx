'use client';

import { AnimatedCounter } from '@/components/motion';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

interface Stat {
  value: number;
  suffix: string;
  en: string;
  fa: string;
}

interface StatsBarProps {
  stats: Stat[];
  locale: Locale;
}

export function StatsBar({ stats, locale }: StatsBarProps) {
  const isFa = locale === 'fa';

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'flex flex-col items-center justify-center text-center',
            isFa ? 'gap-2' : 'gap-2'
          )}
        >
          <p
            className="font-heading text-4xl font-bold text-text-primary sm:text-5xl"
            dir="ltr"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </p>
          <p
            className="text-sm font-medium text-text-muted"
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {isFa ? stat.fa : stat.en}
          </p>
        </div>
      ))}
    </div>
  );
}
