import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { absoluteUrl, pageMetadata, siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.international, path: '/advocacia-internacional' })
}

const pad = (i: number) => String(i + 1).padStart(2, '0')

// Hub for the international front: what sets the practice apart, its areas,
// markets, how a matter runs, FAQ. Mainly the landing page for foreign visitors
// (the English version) and for international search terms in Portuguese.
export default async function AdvocaciaInternacionalPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const t = dict.international
  const href = (path: string) => localePath(locale, path)
  const areas = dict.practiceAreas.filter((area) => area.front === 'internacional')
  const url = absoluteUrl(href('/advocacia-internacional'))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: dict.nav.home, item: absoluteUrl(href('/')) },
          { '@type': 'ListItem', position: 2, name: dict.fronts.internacional.name, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: dict.fronts.internacional.name,
        description: t.lead,
        url,
        serviceType: dict.fronts.internacional.name,
        provider: { '@id': absoluteUrl('/#escritorio') },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: dict.fronts.internacional.name,
          itemListElement: areas.map((area) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: area.title,
              url: absoluteUrl(href(`/areas-de-atuacao/${area.slug}`)),
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white md:grid md:grid-cols-[1.15fr_1fr]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 10% 15%, rgba(180,143,76,0.22), transparent 45%)' }}
        />
        <div className="reveal relative px-6 pb-14 pt-32 md:px-12 md:pb-24 md:pt-44 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">{t.kicker}</p>
          <h1 className="mt-5 max-w-xl font-serif text-4xl leading-tight md:text-5xl">{t.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">{t.lead}</p>
          <Link
            href={href('/contato')}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
          >
            {t.cta}
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full md:aspect-auto">
          <Image
            src="/images/lais-mota-itamaraty.jpeg"
            alt={dict.home.itamaraty.imageAlt}
            fill
            priority
            quality={85}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.capabilities.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">{t.capabilities.title}</h2>
          </div>
          <ul className="mt-14 grid gap-8 border-t border-line pt-12 sm:grid-cols-3">
            {t.capabilities.items.map((item, i) => (
              <li key={item.title} className={`reveal stagger-${i + 1}`}>
                <span className="font-serif text-3xl text-gold-600">{pad(i)}</span>
                <h3 className="mt-4 font-serif text-lg text-ink-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Areas */}
      <section className="bg-ink-950 py-20 text-white md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:items-end md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{t.areas.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug md:text-4xl">{t.areas.title}</h2>
          </div>
          <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => (
              <Link
                key={area.slug}
                href={href(`/areas-de-atuacao/${area.slug}`)}
                className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[230px] flex-col justify-between border-b border-r border-white/10 bg-ink-950 p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-ink-900 hover:shadow-card`}
              >
                <div className="flex items-center justify-between gap-4 text-xs text-white/40">
                  <span>{area.audience}</span>
                  <span className="transition group-hover:text-gold-400">↗</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl">{area.shortTitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{area.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="reveal mx-auto grid max-w-content gap-10 md:grid-cols-[170px_1fr] md:gap-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.markets.kicker}</p>
          <div>
            <h2 className="max-w-2xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">{t.markets.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-700">{t.markets.body}</p>
            <p className="mt-4 max-w-2xl text-sm text-ink-500">{t.markets.note}</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-line bg-[var(--bg)] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-content">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.process.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">{t.process.title}</h2>
          </div>
          <ol className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, i) => (
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
      <section className="bg-gold-50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-6 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">{t.faq.kicker}</p>
            <h2 className="max-w-xl font-serif text-3xl leading-snug text-ink-950 md:text-4xl">{t.faq.title}</h2>
          </div>
          <div className="mt-12 divide-y divide-line border-t border-b border-line md:ml-[calc(170px+4rem)]">
            {t.faq.items.map((item, i) => (
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

      {/* Closing CTA */}
      <section className="bg-ink-950 py-24 text-white md:py-28">
        <div className="reveal mx-auto max-w-content px-5 text-center md:px-8">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight md:text-5xl">{t.closing.title}</h2>
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
