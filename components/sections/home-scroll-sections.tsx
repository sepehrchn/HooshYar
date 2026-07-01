import { ContactForm } from "@/components/forms";
import { Footer } from "@/components/layout/footer";
import { SectionReveal } from "@/components/motion";
import {
  DifferentiatorCard,
  LandingSection,
  PageHero,
  PrincipleCard,
  ProcessTimeline,
  ServiceCards,
  ServiceCategory,
  SnapPanel,
  WorkGrid,
} from "@/components/sections";
import { GlassCard, GradientText, Heading, SectionHeading } from "@/components/ui";
import { getCaseStudies } from "@/lib/content";
import { pageContent, siteContent } from "@/lib/pages";
import type { Locale } from "@/types/locale";
import { cn } from "@/lib/utils";

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
          {/* Hero Statement */}
          <section className="relative pb-12 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-primary/10 blur-3xl"
            />
            <SectionReveal className="mx-auto max-w-5xl text-center">
              <Heading className="text-4xl sm:text-5xl lg:text-6xl">
                <GradientText>{aboutHero.title}</GradientText>
              </Heading>
              <p
                className="mx-auto mt-6 max-w-3xl text-base leading-8 text-text-muted sm:text-lg text-center"
                dir={locale === 'fa' ? 'rtl' : 'ltr'}
              >
                {aboutHero.subtitle}
              </p>
            </SectionReveal>
          </section>

          {/* Origin Story */}
          <section className="py-12 sm:py-16 lg:py-20">
            <SectionReveal className="mx-auto max-w-7xl">
              <GlassCard glow="cyan">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2
                    className={cn(
                      'font-heading text-3xl font-bold tracking-wide uppercase text-cyan-primary md:text-4xl',
                      locale === 'fa' ? 'font-extrabold' : 'font-bold'
                    )}
                    style={{ letterSpacing: locale === 'fa' ? 'normal' : '0.1em', fontWeight: 800 }}
                    dir={locale === 'fa' ? 'rtl' : 'ltr'}
                  >
                    {pageContent.about.origin.label[locale]}
                  </h2>
                  <div
                    className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-text-muted sm:text-base sm:leading-8"
                    dir={locale === 'fa' ? 'rtl' : 'ltr'}
                  >
                    {pageContent.about.origin.body[locale].split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </SectionReveal>
          </section>

          {/* Differentiator Cards */}
          <section className="py-12 sm:py-16 lg:py-20">
            <SectionReveal className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
              {pageContent.about.differentiators.map((diff, index) => (
                <DifferentiatorCard
                  key={index}
                  title={diff.title[locale]}
                  body={diff.body[locale]}
                  accent={diff.accent as 'cyan' | 'violet' | 'magenta'}
                  icon={diff.icon}
                  locale={locale}
                  index={index}
                />
              ))}
            </SectionReveal>
          </section>

          {/* Principles */}
          <section className="py-12 sm:py-16 lg:py-20">
            <SectionReveal className="mx-auto max-w-7xl">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {pageContent.about.principles.map((principle, index) => (
                  <PrincipleCard
                    key={index}
                    title={principle.title[locale]}
                    body={principle.body[locale]}
                    accent={principle.accent as 'cyan' | 'violet' | 'magenta'}
                    icon={principle.icon}
                    locale={locale}
                  />
                ))}
              </div>
            </SectionReveal>
          </section>
        </div>
      </SnapPanel>

      <SnapPanel id="services">
        <div>
          {/* Services section header - single gradient word */}
          <section className="relative px-5 pb-8 pt-36 sm:px-8 lg:px-12">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-primary/10 blur-3xl"
            />
            <SectionReveal className="mx-auto max-w-5xl text-center">
              <h2
                className="font-heading text-5xl font-extrabold md:text-6xl lg:text-7xl"
                style={{
                  background: 'linear-gradient(to left, #3FE8F4, #9D5CFF, #E63CD8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {locale === "fa" ? "خدمات" : "Services"}
              </h2>
            </SectionReveal>
          </section>
          {/* Embed all service categories inline */}
          {siteContent.servicesPage.categories.map((category) => {
            const categoryCopy = category[locale];
            return (
              <ServiceCategory
                key={category.slug}
                slug={category.slug}
                accent={category.accent as 'cyan' | 'violet' | 'magenta'}
                title={categoryCopy.title}
                oneLiner={categoryCopy.oneLiner}
                services={category.services}
                locale={locale}
                embedded
              />
            );
          })}
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
