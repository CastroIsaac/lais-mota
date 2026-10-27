import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { PostBody } from '@/components/PostBody'
import { getService, getServicesForArea, servicesCopy } from '@/content/services'
import { defaultLocale, localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { absoluteUrl, pageMetadata } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale; slug: string; service: string }> }

// Called once per area page (the parent [slug] generates those). Service pages exist
// only in Portuguese.
export async function generateStaticParams({ params }: { params: { locale: string; slug: string } }) {
  if (params.locale !== defaultLocale) return []
  return getServicesForArea(params.slug).map((service) => ({ service: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, service: serviceSlug } = await params
  const service = getService(slug, serviceSlug)
  if (locale !== defaultLocale || !service) return {}
  return pageMetadata(locale, {
    title: service.seoTitle,
    description: service.description,
    path: `/areas-de-atuacao/${service.area}/${service.slug}`,
    translated: false,
  })
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug, service: serviceSlug } = await params
  const service = getService(slug, serviceSlug)
  if (locale !== defaultLocale || !service) notFound()
  const dict = getDictionary(locale)
  const area = dict.practiceAreas.find((a) => a.slug === service.area)
  if (!area) notFound()
  const href = (path: string) => localePath(locale, path)

  const areaPath = `/areas-de-atuacao/${area.slug}`
  const url = absoluteUrl(href(`${areaPath}/${service.slug}`))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: dict.nav.home, item: absoluteUrl(href('/')) },
          { '@type': 'ListItem', position: 2, name: dict.nav.areas, item: absoluteUrl(href('/areas-de-atuacao')) },
          { '@type': 'ListItem', position: 3, name: area.title, item: absoluteUrl(href(areaPath)) },
          { '@type': 'ListItem', position: 4, name: service.title, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url,
        serviceType: service.title,
        provider: { '@id': absoluteUrl('/#escritorio') },
        areaServed: [
          { '@type': 'City', name: 'Brasília' },
          { '@type': 'Country', name: 'Brasil' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <JsonLd data={jsonLd} />
      <Link href={href(areaPath)} className="text-sm font-medium text-ink-500 transition hover:text-gold-600">
        ← {area.title}
      </Link>

      <header className="reveal">
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{area.title}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{service.title}</h1>
      </header>

      <div className="mt-6 border-t border-line pt-4">
        <PostBody blocks={service.body} />
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="font-serif text-2xl text-ink-950">{servicesCopy.faqTitle}</h2>
        <div className="mt-4 divide-y divide-line border-b border-line">
          {service.faq.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-lg text-ink-950 marker:content-none">
                {item.question}
                <span className="shrink-0 text-xl text-gold-600 transition group-open:rotate-45">+</span>
              </summary>
              <p className="-mt-2 pb-5 text-sm leading-relaxed text-ink-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <p className="mt-12 text-xs leading-relaxed text-ink-500">{servicesCopy.disclaimer}</p>

      <Link
        href={href('/contato')}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
      >
        {servicesCopy.cta}
      </Link>
    </article>
  )
}
