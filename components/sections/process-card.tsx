'use client';

import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

type AccentColor = 'cyan' | 'violet' | 'magenta';

interface ProcessCardProps {
  number: string;
  title: string;
  body: string;
  accent: AccentColor;
  locale: Locale;
  index: number;
}

const accentColors = {
  cyan: {
    text: 'text-cyan-primary',
    bg: 'bg-cyan-primary/[0.08]',
    glow: 'before:bg-cyan-primary/30',
  },
  violet: {
    text: 'text-violet-core',
    bg: 'bg-violet-core/[0.08]',
    glow: 'before:bg-violet-core/30',
  },
  magenta: {
    text: 'text-magenta-glow',
    bg: 'bg-magenta-glow/[0.08]',
    glow: 'before:bg-magenta-glow/30',
  },
} as const;

const borderClasses = {
  cyan: 'service-card-animated-border-cyan',
  violet: 'service-card-animated-border-violet',
  magenta: 'service-card-animated-border-magenta',
} as const;

const shadowClasses = {
  cyan: 'shadow-cyan-glow',
  violet: 'shadow-violet-glow',
  magenta: 'shadow-magenta-glow',
} as const;

export function ProcessCard({
  number,
  title,
  body,
  accent,
  locale,
  index,
}: ProcessCardProps) {
  const isFa = locale === 'fa';
  const colors = accentColors[accent];

  return (
    <div
      className="group/process-card process-card-enter h-full"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className={cn(
          'process-card-shell relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-glass p-6 shadow-glass-lift backdrop-blur-xl transition duration-300 ease-premium group-hover/process-card:bg-white/[0.055] motion-reduce:transition-none',
          colors.bg
        )}
      >
        {/* Animated gradient border - single color */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-glass',
            borderClasses[accent]
          )}
          aria-hidden="true"
        />

        {/* Top glow */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-8 -top-16 h-32 rounded-full opacity-60 blur-3xl transition-opacity duration-300',
            colors.glow
          )}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Step number */}
          <div
            className={cn(
              'mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-glass-border bg-bg-void font-mono text-2xl font-bold',
              colors.text,
              shadowClasses[accent]
            )}
          >
            {number}
          </div>

          {/* Title */}
          <h3
            className={cn(
              'font-heading text-2xl font-bold leading-tight tracking-[-0.02em]',
              colors.text,
              isFa && 'text-right'
            )}
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {title}
          </h3>

          {/* Body */}
          <p
            className={cn(
              'mt-4 text-[0.9375rem] leading-relaxed text-text-muted',
              isFa && 'text-right'
            )}
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
