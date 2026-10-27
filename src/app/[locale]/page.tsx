import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata, siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.home, path: '/', standalone: true })
}

const momentImages = ['/images/lais-mota-embaixada-india.jpeg', '/images/lais-mota-cop30.jpeg']

const pad = (i: number) => String(i + 1).padStart(2, '0')

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const t = dict.home
  const href = (path: string) => localePath(locale, path)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <JsonLd data={faqJsonLd} />
      {/* Hero — full-bleed photo with the headline overlaid on top at every breakpoint:
          bottom-anchored (vertical scrim) on mobile, right-anchored (horizontal scrim) on
          desktop, since the text sits over the photo the same way at both sizes now.
          `sticky` pins it while the next section scrolls up over it (see that section's
          `relative z-10` + opaque background) instead of just scrolling away normally. */}
      <section className="sticky top-0 z-0 min-h-[100svh] md:min-h-[92vh]">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            {/* Mobile: tighter portrait crop — the wide desktop crop loses too much of her
                when squeezed into a narrow mobile frame. Desktop: wide crop with room on
                the right for the overlaid headline. Both rendered, CSS picks one per breakpoint
                (Next/Image's standard art-direction pattern — no single-source responsive src). */}
            <Image
              src="/images/lais-mota-image.jpeg"
              alt={t.heroAlt}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-top md:hidden"
            />
            <Image
              src="/images/lais-mota-image.jpg"
              alt={t.heroAlt}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="hidden object-cover object-left md:block"
            />
          </div>
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(16,31,48,0) 32%, rgba(16,31,48,0.58) 62%, rgba(16,31,48,0.96) 92%)',
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(16,31,48,0) 42%, rgba(16,31,48,0.6) 66%, rgba(16,31,48,0.95) 88%)',
            }}
          />
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">{t.scroll}</span>
            <span className="h-8 w-px bg-white/40" aria-hidden="true" />
          </div>
        </div>

        {/* top-[52svh] reserves the upper half of the mobile screen purely for the photo —
            her face sits around 25-45% down the portrait crop, so this keeps it fully clear
            instead of the old bottom-anchored box whose height (driven by content) pushed the
            headline up over her face on shorter phones. Desktop resets via md:inset-y-0. */}
        <div className="absolute inset-x-0 top-[52svh] bottom-0 z-10 flex flex-col justify-end px-6 pb-10 pt-4 text-white md:inset-y-0 md:left-auto md:right-0 md:flex md:w-[48%] md:flex-col md:justify-center md:px-10 lg:px-16">
          <div className="reveal w-full max-w-xl">
            {/* The eyebrow is part of the h1 so the heading carries the search term
                ("Advogada em Brasília"), while it still looks like the small line above. */}
            <h1>
              <span className="block font-sans text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">{t.eyebrow}</span>
              <span className="mt-3 block font-serif text-[1.7rem] leading-[1.15] md:mt-5 md:text-5xl md:leading-[1.1]">
                {t.title}
              </span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 md:mt-5 md:text-base">
              {t.lead}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row md:mt-8 md:gap-3">
              <Link
                href={href('/contato')}
                className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-600 md:py-3"
              >
                {t.ctaPrimary}
              </Link>
              <Link
                href={href('/areas-de-atuacao')}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 md:py-3"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quem atende + os três pilares — relative z-10 + opaque bg so this slides up and
          covers the sticky hero above like a layer, instead of the hero just scrolling
          off normally. */}
      <section className="relative z-10 bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.who.kicker}</p>
            <div>
              <h2 className="max-w-2xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
                {t.who.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700">
                {t.who.body}
              </p>
            </div>
          </div>

          <ul className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-3">
            {t.pillars.map((item, i) => (
              <li key={item.title} className={`reveal stagger-${i + 1}`}>
                <span className="font-serif text-3xl text-gold-600">{pad(i)}</span>
                <h3 className="mt-4 font-serif text-lg text-ink-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Practice areas */}
      <section className="relative z-10 overflow-hidden bg-ink-950 py-20 text-white md:py-28">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-8 select-none font-serif text-[9rem] font-semibold leading-none text-white/[0.04] md:text-[14rem]"
        >
          {t.areas.watermark}
        </p>

        <div className="relative mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:items-end md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{t.areas.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug md:text-4xl">{t.areas.title}</h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
            {dict.practiceAreas.map((area, i) => (
              <Link
                key={area.slug}
                href={href(`/areas-de-atuacao/${area.slug}`)}
                className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[220px] flex-col justify-between bg-ink-950 p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-ink-900 hover:shadow-card`}
              >
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{area.audience}</span>
                  <span className="transition group-hover:text-gold-400">↗</span>
                </div>
                <div>
                  <h3 className="max-w-xs font-serif text-xl">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{area.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brasília como base — 50/50 split: image+flag left, atuação nacional right.
          Image column stays aspect-locked to the photo's native ratio (1672x941) so
          the full image always shows with no cropping (and the flag's percentage
          position always lines up with the actual pole). */}
      <section className="relative z-10 grid bg-ink-950 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[1672/941] w-full overflow-hidden">
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <filter id="flag-wind" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.045" numOctaves="2" seed="9" result="wind">
                <animate
                  attributeName="baseFrequency"
                  dur="4.2s"
                  repeatCount="indefinite"
                  values="0.006 0.038;0.009 0.055;0.005 0.043;0.007 0.062;0.006 0.038"
                  keyTimes="0;0.28;0.54;0.78;1"
                  calcMode="spline"
                  keySplines=".42 0 .58 1;.42 0 .58 1;.42 0 .58 1;.42 0 .58 1"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="wind" scale="15" xChannelSelector="R" yChannelSelector="G">
                <animate
                  attributeName="scale"
                  dur="3.4s"
                  repeatCount="indefinite"
                  values="12;27;16;30;12"
                  keyTimes="0;0.24;0.51;0.76;1"
                  calcMode="spline"
                  keySplines=".37 0 .63 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1"
                />
              </feDisplacementMap>
            </filter>
          </svg>
          <Image
            src="/images/brasilia-congresso-sem-bandeira.jpg"
            alt={t.brasilia.imageAlt}
            fill
            quality={85}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="flag-gust absolute" style={{ left: '74%', top: '4%', width: '15%' }}>
            <img
              src="/images/bandeira-sem-fundo.webp"
              alt=""
              aria-hidden="true"
              className="waving-flag block w-full"
            />
          </div>
        </div>

        <div className="reveal bg-ink-950 px-6 py-14 text-white md:px-12 md:py-16 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">{t.brasilia.kicker}</p>
          <h2 className="mt-5 max-w-md font-serif text-3xl leading-tight md:text-4xl">
            {t.brasilia.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            {t.brasilia.body}
          </p>
          <Link href={href('/contato')} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition hover:text-gold-300">
            {t.brasilia.cta} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Diferenciais — international experience */}
      <section className="relative z-10 bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.diff.kicker}</p>
            <div>
              <h2 className="max-w-2xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
                {t.diff.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700">
                {t.diff.body}
              </p>
            </div>
          </div>

          {/* Photographic proof of the international claim above — embassy, UN conference —
              so "atuação internacional" isn't just copy. */}
          <div className="reveal mt-14 grid gap-4 sm:grid-cols-2">
            {t.moments.map((item, i) => (
              <figure key={momentImages[i]} className={`stagger-${i + 1} group overflow-hidden rounded-sm bg-ink-950`}>
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={momentImages[i]}
                    alt={item.alt}
                    fill
                    quality={85}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-1 py-3 text-xs leading-snug text-ink-500">{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {t.experience.map((item, i) => (
              <div key={item.title} className={`reveal stagger-${i + 1} bg-paper p-8`}>
                <h3 className="font-serif text-lg text-ink-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Do ambiente institucional ao diálogo internacional — full-bleed component, same
          weight as the Brasília section above rather than a card boxed inside Diferenciais.
          sticky + min-h (same trick as the hero) pins it in place while Process scrolls up
          over it, instead of it just scrolling past like a normal section. Process is bumped
          to z-20 to guarantee it wins the overlap — same-z DOM-order tie-breaking is what
          bit us the last time a second sticky layer was added here (see git history). */}
      <section className="sticky top-0 z-10 grid min-h-[85svh] bg-ink-950 md:min-h-[80vh] md:grid-cols-2">
        <div className="relative aspect-[9/16] w-full overflow-hidden md:aspect-auto">
          <Image
            src="/images/lais-mota-itamaraty.jpeg"
            alt={t.itamaraty.imageAlt}
            fill
            quality={85}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="reveal flex flex-col justify-center bg-ink-950 px-6 py-14 text-white md:px-12 md:py-16 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">{t.itamaraty.kicker}</p>
          <h2 className="mt-5 max-w-md font-serif text-3xl leading-tight md:text-4xl">
            {t.itamaraty.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            {t.itamaraty.body}
          </p>
        </div>
      </section>

      {/* Process — z-20 so it slides up and covers the sticky Itamaraty section above it. */}
      <section className="relative z-20 bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.process.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
              {t.process.title}
            </h2>
          </div>

          <ol className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, i) => (
              <li key={step.title} className={`reveal stagger-${i + 1}`}>
                <span className="text-sm font-semibold text-gold-600">{pad(i)}</span>
                <h3 className="mt-3 font-serif text-lg text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 bg-gold-50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">{t.faq.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">
              {t.faq.title}
            </h2>
          </div>

          <div className="mt-12 divide-y divide-line border-t border-b border-line md:ml-[calc(170px+4rem)]">
            {dict.faq.map((item, i) => (
              <details key={item.question} className={`reveal stagger-${(i % 4) + 1} group`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-lg text-ink-950 marker:content-none">
                  {item.question}
                  <span className="shrink-0 text-xl text-gold-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="-mt-2 max-w-2xl pb-5 text-sm leading-relaxed text-ink-500">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement / CTA */}
      <section className="relative z-10 overflow-hidden bg-ink-950 py-24 text-white md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 15% 20%, rgba(180,143,76,0.22), transparent 45%)',
          }}
        />
        <div className="reveal relative mx-auto max-w-content px-5 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{t.closing.kicker}</p>
          <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
            {t.closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60">
            {siteConfig.oabNumber} · {t.closing.line}
          </p>
          <Link
            href={href('/contato')}
            className="mt-9 inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
          >
            {t.closing.cta}
          </Link>
        </div>
      </section>
    </>
  )
}
