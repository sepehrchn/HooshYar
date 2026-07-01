'use client';

import { SectionReveal } from '@/components/motion';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

type AccentColor = 'cyan' | 'violet' | 'magenta';

interface Channel {
  type: string;
  label: { en: string; fa: string };
  value: string;
  link: string;
  accent: AccentColor;
  todo?: string;
}

interface ContactChannelsProps {
  intro: { en: string; fa: string };
  channels: Channel[];
  locale: Locale;
}

const accentColors = {
  cyan: {
    text: 'text-cyan-primary',
    border: 'border-cyan-primary/30 hover:border-cyan-primary/50',
    bg: 'bg-cyan-primary/[0.08]',
    glow: 'hover:shadow-cyan-glow',
  },
  violet: {
    text: 'text-violet-core',
    border: 'border-violet-core/30 hover:border-violet-core/50',
    bg: 'bg-violet-core/[0.08]',
    glow: 'hover:shadow-violet-glow',
  },
  magenta: {
    text: 'text-magenta-glow',
    border: 'border-magenta-glow/30 hover:border-magenta-glow/50',
    bg: 'bg-magenta-glow/[0.08]',
    glow: 'hover:shadow-magenta-glow',
  },
} as const;

// Icon SVGs for each channel type
const channelIcons = {
  email: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M21 5L2 12.5l7 1M21 5l-2.5 15L9 13M21 5L9 13m0 0l1 5.5M9 13l4.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function ContactChannels({ intro, channels, locale }: ContactChannelsProps) {
  const isFa = locale === 'fa';

  return (
    <section className="px-5 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p
            className={cn(
              'mb-6 text-center text-sm font-medium text-text-muted',
              isFa && 'text-center'
            )}
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {intro[locale]}
          </p>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((channel, index) => {
            const colors = accentColors[channel.accent];
            const icon = channelIcons[channel.type as keyof typeof channelIcons];

            return (
              <SectionReveal
                key={channel.type}
                transition={{ delay: index * 0.1, duration: 0.65 }}
              >
                <a
                  href={channel.link}
                  target={channel.type !== 'email' ? '_blank' : undefined}
                  rel={channel.type !== 'email' ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'group relative flex flex-col items-center gap-3 overflow-hidden rounded-glass border p-6 text-center shadow-glass-lift backdrop-blur-xl transition duration-300 ease-premium hover:bg-white/[0.055] motion-reduce:transition-none',
                    colors.bg,
                    colors.border,
                    colors.glow
                  )}
                >
                  {/* Icon */}
                  <div className={cn('transition duration-300', colors.text)}>
                    {icon}
                  </div>

                  {/* Label */}
                  <div>
                    <h3
                      className={cn('text-sm font-semibold', colors.text)}
                      dir={isFa ? 'rtl' : 'ltr'}
                    >
                      {channel.label[locale]}
                    </h3>
                    <p
                      className="mt-1 text-xs text-text-muted"
                      dir="ltr"
                    >
                      {channel.value}
                    </p>
                  </div>

                  {/* TODO badge if present */}
                  {channel.todo && (
                    <span className="absolute right-2 top-2 rounded-full bg-magenta-glow/20 px-2 py-0.5 text-[10px] font-semibold text-magenta-glow">
                      TODO
                    </span>
                  )}
                </a>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
