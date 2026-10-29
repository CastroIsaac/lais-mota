import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { localePath, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { absoluteUrl, pageMetadata } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => getDictionary(locale).practiceAreas.map((area) => ({ locale, slug: area.slug })))
}

function getArea(locale: Locale, slug: string) {
  return getDictionary(locale).practiceAreas.find((area) => area.slug === slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const area = getArea(locale, slug)
  if (!area) return {}
  return pageMetadata(locale, { ...area.seo, path: `/areas-de-atuacao/${area.slug}` })
}

export default async function PracticeAreaPage({ params }: Props) {
  const { locale, slug } = await params
  const area = getArea(locale, slug)
  if (!area) notFound()
  const dict = getDictionary(locale)
  const t = dict.areaPage
  const href = (path: string) => localePath(locale, path)
  const front = dict.fronts[area.front]
  // International areas sit under the international hub; the rest under the areas list.
  const parent =
    area.front === 'internacional'
      ? { name: front.name, path: '/advocacia-internacional' }
      : { name: dict.nav.areas, path: '/areas-de-atuacao' }
  const related = dict.practiceAreas.filter((other) => other.front === area.front && other.slug !== area.slug)

  const url = absoluteUrl(href(`/areas-de-atuacao/${area.slug}`))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: dict.nav.home, item: absoluteUrl(href('/')) },
          { '@type': 'ListItem', position: 2, name: parent.name, item: absoluteUrl(href(parent.path)) },
          { '@type': 'ListItem', position: 3, name: area.title, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: area.title,
        description: area.description.join(' '),
        url,
        serviceType: area.title,
        category: front.name,
        audience: { '@type': 'Audience', audienceType: area.audience },
        provider: { '@id': absoluteUrl('/#escritorio') },
        areaServed: { '@type': 'Country', name: 'Brasil' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.servicesTitle,
          itemListElement: area.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: service },
          })),
        },
      },
      ...(area.faq?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: area.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <section className="mx-auto max-w-content px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <JsonLd data={jsonLd} />
        <nav aria-label="Breadcrumb" className="text-sm font-medium text-ink-500">
          <Link href={href(parent.path)} className="transition hover:text-gold-600">
            ← {parent.name}
          </Link>
        </nav>

        <div className="reveal">
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{front.name}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{area.title}</h1>
          <p className="mt-5 text-sm text-ink-500">
            <span className="font-semibold text-ink-700">{t.audienceLabel}:</span> {area.audience}
          </p>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-700">
            {area.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="reveal stagger-1 mt-12 border-t border-line pt-8">
          <h2 className="font-serif text-xl text-ink-950">{t.servicesTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {area.services.map((service) => (
              <li key={service} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={href('/contato')}
          className="mt-12 inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
        >
          {t.cta}
        </Link>
      </section>

      {area.faq?.length ? (
        <section className="bg-gold-50 py-16 md:py-20">
          <div className="mx-auto max-w-content px-5 md:px-8">
            <h2 className="reveal font-serif text-2xl text-ink-950 md:text-3xl">{t.faqTitle}</h2>
            <div className="mt-8 max-w-3xl divide-y divide-line border-t border-b border-line">
              {area.faq.map((item) => (
                <details key={item.question} className="reveal group">
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
      ) : null}

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
        <h2 className="reveal font-serif text-2xl text-ink-950">{t.relatedTitle}</h2>
        {/* Per-cell borders, not gap-px over a colored background: with 7 cards the
            empty slot of the last row would otherwise show as a gray block. */}
        <ul className="mt-6 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {related.map((other) => (
            <li key={other.slug} className="border-b border-r border-line bg-white">
              <Link
                href={href(`/areas-de-atuacao/${other.slug}`)}
                className="group flex h-full items-center justify-between gap-4 p-6 text-sm font-medium text-ink-700 transition hover:bg-gold-50 hover:text-ink-950"
              >
                {other.shortTitle}
                <span aria-hidden="true" className="text-ink-500 transition group-hover:text-gold-600">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
