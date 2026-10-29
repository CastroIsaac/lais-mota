import type { Metadata } from 'next'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import { frontOrder, getDictionary } from '@/i18n'
import { pageMetadata } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.areas, path: '/areas-de-atuacao' })
}

export default async function AreasDeAtuacaoPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const t = dict.areasPage

  return (
    <section className="mx-auto max-w-content px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
      <div className="reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.kicker}</p>
        <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{t.title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-700">
          {t.intro}
        </p>
      </div>

      {frontOrder.map((front) => (
        <div key={front} id={front} className="mt-16 scroll-mt-28 md:mt-20">
          <div className="reveal grid gap-4 border-t border-line pt-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <p className="text-xs text-ink-500">{dict.fronts[front].tagline}</p>
              <h2 className="mt-2 font-serif text-3xl leading-snug text-ink-950">{dict.fronts[front].name}</h2>
            </div>
            <div>
              <p className="max-w-xl text-base leading-relaxed text-ink-700">{dict.fronts[front].description}</p>
              {front === 'internacional' && (
                <Link
                  href={localePath(locale, '/advocacia-internacional')}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition hover:text-gold-700"
                >
                  {dict.home.areas.frontCta} <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </div>

          <div className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {dict.practiceAreas
              .filter((area) => area.front === front)
              .map((area, i) => (
                <Link
                  key={area.slug}
                  href={localePath(locale, `/areas-de-atuacao/${area.slug}`)}
                  className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[240px] flex-col justify-between border-b border-r border-line bg-white p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-gold-50 hover:shadow-card`}
                >
                  <div className="flex items-center justify-between gap-4 text-xs text-ink-500">
                    <span>{area.audience}</span>
                    <span className="transition group-hover:text-gold-600">↗</span>
                  </div>
                  <div>
                    <h3 className="max-w-xs font-serif text-xl text-ink-950">{area.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{area.summary}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </section>
  )
}
