import { ContactForm } from "@/components/forms";
import { Footer } from "@/components/layout/footer";
import {
  LandingSection,
  PageHero,
  ProcessTimeline,
  ServiceCards,
  SnapPanel,
  WorkGrid,
} from "@/components/sections";
import { GlassCard, SectionHeading } from "@/components/ui";
import { getCaseStudies } from "@/lib/content";
import { pageContent } from "@/lib/pages";
import type { Locale } from "@/types/locale";

export async function HomeScrollSections({ locale }: { locale: Locale }) {
  const studies = getCaseStudies(locale);
  const aboutHero = pageContent.about.hero[locale];
  const processHero = pageContent.process.hero[locale];
  const pricingHero = pageContent.pricing.hero[locale];
  const contactHero = pageContent.contact.hero[locale];

  return (
    <>
      <SnapPanel id="home" className="justify-stretch">
        <LandingSection locale={locale} />
      </SnapPanel>

      <SnapPanel id="about">
        <div className="px-5 sm:px-8 lg:px-12">
          <PageHero
            compact
            eyebrow={aboutHero.eyebrow}
            title={aboutHero.title}
            body={aboutHero.body}
          />
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {pageContent.about.principles.map((principle, index) => (
              <GlassCard key={principle.en} glow={index === 1 ? "violet" : "cyan"}>
                <p className="font-mono text-xs text-text-muted">0{index + 1}</p>
                <SectionHeading className="mt-3 text-2xl md:text-3xl">
                  {principle[locale]}
                </SectionHeading>
              </GlassCard>
            ))}
          </div>
        </div>
      </SnapPanel>

      <SnapPanel id="services">
        <div>
          <PageHero
            compact
            eyebrow={locale === "fa" ? "خدمات" : "Services"}
            title={
              locale === "fa"
                ? "هوش مصنوعی، اتوماسیون و وب در یک سیستم."
                : "AI, automation, and web in one system."
            }
            body={
              locale === "fa"
                ? "هر مسیر می‌تواند مستقل شروع شود یا در قالب یک سیستم یکپارچه برای رشد محصول و عملیات ترکیب شود."
                : "Each track can start independently or combine into one integrated system for product and operations growth."
            }
          />
          <ServiceCards locale={locale} embedded />
        </div>
      </SnapPanel>

      <SnapPanel id="work">
        <div>
          <PageHero
            compact
            eyebrow={locale === "fa" ? "نمونه‌کارها" : "Work"}
            title={
              locale === "fa"
                ? "مطالعات موردی از MDX تغذیه می‌شوند."
                : "Case studies now run on MDX."
            }
            body={
              locale === "fa"
                ? "تا زمان دریافت پروژه‌های واقعی، فایل‌های MDX جایگزین با کاورهای گرادیانی و متن قابل ویرایش فعال هستند."
                : "Until real projects arrive, editable MDX placeholders power the portfolio grid and detail pages."
            }
          />
          <WorkGrid locale={locale} studies={studies} limit={4} embedded />
        </div>
      </SnapPanel>

      <SnapPanel id="process">
        <div>
          <PageHero
            compact
            eyebrow={processHero.eyebrow}
            title={processHero.title}
            body={processHero.body}
          />
          <ProcessTimeline locale={locale} compact embedded />
        </div>
      </SnapPanel>

      <SnapPanel id="pricing">
        <div className="px-5 sm:px-8 lg:px-12">
          <PageHero
            compact
            eyebrow={pricingHero.eyebrow}
            title={pricingHero.title}
            body={pricingHero.body}
          />
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {pageContent.pricing.tracks.map((track, index) => (
              <GlassCard key={track.en.title} glow={index === 1 ? "violet" : "cyan"}>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-primary">
                  Custom Quote
                </p>
                <SectionHeading className="mt-4 text-2xl md:text-3xl">
                  {track[locale].title}
                </SectionHeading>
                <p className="mt-3 leading-7 text-text-muted">{track[locale].body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </SnapPanel>

      <SnapPanel id="contact">
        <div className="px-5 sm:px-8 lg:px-12">
          <PageHero
            compact
            eyebrow={contactHero.eyebrow}
            title={contactHero.title}
            body={contactHero.body}
          />
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <GlassCard glow="cyan">
              <SectionHeading className="text-2xl md:text-3xl">
                {locale === "fa" ? "قبل از ارسال" : "Before you send"}
              </SectionHeading>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-text-muted">
                <li>
                  •{" "}
                  {locale === "fa"
                    ? "هدف پروژه و مسئله اصلی را توضیح دهید."
                    : "Describe the project goal and main problem."}
                </li>
                <li>
                  •{" "}
                  {locale === "fa"
                    ? "زمان‌بندی تقریبی را اضافه کنید."
                    : "Add your approximate timeline."}
                </li>
                <li>
                  •{" "}
                  {locale === "fa"
                    ? "اگر ابزار یا سیستم فعلی دارید، نام ببرید."
                    : "Mention any existing tools or systems."}
                </li>
              </ul>
            </GlassCard>
            <GlassCard glow="magenta">
              <ContactForm locale={locale} />
            </GlassCard>
          </div>
        </div>
      </SnapPanel>

      <SnapPanel id="footer" className="min-h-[70vh] justify-end pb-6">
        <Footer locale={locale} />
      </SnapPanel>
    </>
  );
}
