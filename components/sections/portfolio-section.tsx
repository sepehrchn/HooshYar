'use client';

import { SectionReveal } from '@/components/motion';
import { GradientText, Heading } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';
import { PortfolioCard } from './portfolio-card';

interface PortfolioSectionProps {
  locale: Locale;
}

const projects = [
  {
    slug: 'telegram-bot',
    accent: 'cyan' as const,
    category: {
      en: 'AI',
      fa: 'هوش مصنوعی',
    },
    title: {
      en: 'Intelligent Telegram Bot',
      fa: 'ربات تلگرام هوشمند',
    },
    description: {
      en: 'Gemini-powered Telegram assistant with voice handling, auto language detection and lead capture',
      fa: 'دستیار هوشمند تلگرام با قابلیت تشخیص زبان، پردازش صدا و جذب لید خودکار',
    },
    tags: ['Gemini AI', 'Cloudflare Workers', 'Telegram API', 'TypeScript'],
    images: ['/works/telegram-bot/1.jpg', '/works/telegram-bot/2.jpg'],
  },
  {
    slug: 'ariana-b2b',
    accent: 'violet' as const,
    category: {
      en: 'Web Development',
      fa: 'توسعه وب',
    },
    title: {
      en: 'Ariana B2B Export Platform',
      fa: 'پلتفرم صادرات B2B آریانا',
    },
    description: {
      en: 'Premium B2B agricultural export platform with bilingual RTL/LTR support and AI concierge',
      fa: 'پلتفرم صادرات محصولات کشاورزی با پشتیبانی دو زبانه RTL/LTR و دستیار هوشمند',
    },
    tags: ['Next.js', 'Framer Motion', 'RTL/LTR', 'AI Concierge'],
    demoUrl: 'https://arianasepehr.vercel.app',
    images: ['/works/ariana-b2b/1.jpg', '/works/ariana-b2b/2.jpg', '/works/ariana-b2b/3.jpg'],
  },
  {
    slug: 'armco',
    accent: 'magenta' as const,
    category: {
      en: 'Web Development',
      fa: 'توسعه وب',
    },
    title: {
      en: 'Armco',
      fa: 'آرمکو',
    },
    description: {
      en: 'Custom business website with modern design and conversion-optimised structure',
      fa: 'وب‌سایت اختصاصی کسب‌وکار با طراحی مدرن و بهینه‌سازی برای تبدیل بازدیدکننده',
    },
    tags: ['Next.js', 'Custom Design', 'Vercel'],
    demoUrl: 'https://armco.vercel.app',
    images: ['/works/armco/1.jpg', '/works/armco/2.jpg', '/works/armco/3.jpg'],
  },
  {
    slug: 'ai-outreach',
    accent: 'violet' as const,
    category: {
      en: 'Automation',
      fa: 'اتوماسیون',
    },
    title: {
      en: 'AI Outreach Automation',
      fa: 'اتوماسیون پیش‌فروش با هوش مصنوعی',
    },
    description: {
      en: 'Automation system that researches leads, writes personalised cold emails and sends them automatically',
      fa: 'سیستم اتوماسیون که لیدها را تحقیق می‌کند، ایمیل اختصاصی می‌نویسد و خودکار ارسال می‌کند',
    },
    tags: ['n8n', 'Gemini AI', 'Gmail API', 'Google Sheets'],
    images: ['/works/ai-outreach/1.jpg', '/works/ai-outreach/2.jpg', '/works/ai-outreach/3.jpg'],
  },
  {
    slug: 'portfolio-os',
    accent: 'cyan' as const,
    category: {
      en: 'Web Development',
      fa: 'توسعه وب',
    },
    title: {
      en: 'Portfolio OS',
      fa: 'پورتفولیو OS',
    },
    description: {
      en: 'Full-stack portfolio with Three.js, six languages including RTL, AI chatbot and edge deployment',
      fa: 'پورتفولیو فول‌استک با Three.js، شش زبان شامل RTL، چت‌بات هوشمند و استقرار edge',
    },
    tags: ['Next.js', 'Three.js', 'Cloudflare Pages', '6 Languages', 'AI Chatbot'],
    images: ['/works/portfolio-os/1.jpg'],
  },
  {
    slug: 'forma',
    accent: 'magenta' as const,
    category: {
      en: 'Web Development',
      fa: 'توسعه وب',
    },
    title: {
      en: 'FORMA Studio',
      fa: 'فورما استودیو',
    },
    description: {
      en: 'Premium multilingual website for an art direction studio — Three.js 3D hero, Framer Motion, AI assistant and 4-language RTL/LTR support',
      fa: 'وب‌سایت چندزبانه پریمیوم برای استودیو آرت‌دایرکشن با Three.js، انیمیشن و دستیار هوشمند',
    },
    tags: ['React', 'Three.js', 'Framer Motion', 'i18next', 'RTL/LTR'],
    demoUrl: 'https://adart-alpha.vercel.app',
    images: ['/works/forma/1.jpg', '/works/forma/2.jpg', '/works/forma/3.jpg', '/works/forma/4.jpg'],
  },
];

export function PortfolioSection({ locale }: PortfolioSectionProps) {
  const isFa = locale === 'fa';

  return (
    <section className="px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionReveal className="mb-12 text-center">
          {/* Headline with Gradient */}
          <Heading className="text-4xl sm:text-5xl lg:text-6xl">
            <GradientText>
              {isFa ? 'نمونه‌کارها' : 'Our Work'}
            </GradientText>
          </Heading>

          {/* Main Title */}
          <h3
            className={cn(
              'mt-6 font-heading text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl',
              isFa && 'font-extrabold'
            )}
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {isFa ? 'از ایده تا اجرا' : 'From idea to execution'}
          </h3>

          {/* Subheadline */}
          <p
            className="mx-auto mt-4 max-w-3xl text-base leading-8 text-text-muted sm:text-lg"
            dir={isFa ? 'rtl' : 'ltr'}
          >
            {isFa
              ? 'شش نمونه واقعی از هوش مصنوعی، اتوماسیون و توسعه وب'
              : 'Six real examples across AI, automation and web development'}
          </p>
        </SectionReveal>

        {/* Portfolio Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Row 1: 3 cards */}
          {projects.slice(0, 3).map((project, index) => (
            <PortfolioCard
              key={project.slug}
              {...project}
              locale={locale}
              index={index}
            />
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {projects.slice(3, 6).map((project, index) => (
            <PortfolioCard
              key={project.slug}
              {...project}
              locale={locale}
              index={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
