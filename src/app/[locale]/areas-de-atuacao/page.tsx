import type { Metadata } from 'next'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
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

      <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
        {dict.practiceAreas.map((area, i) => (
          <Link
            key={area.slug}
            href={localePath(locale, `/areas-de-atuacao/${area.slug}`)}
            className={`reveal stagger-${(i % 4) + 1} group relative flex min-h-[240px] flex-col justify-between bg-white p-8 transition duration-300 hover:z-10 hover:-translate-y-1 hover:bg-gold-50 hover:shadow-card`}
          >
            <span className="text-xs text-ink-500 transition group-hover:text-gold-600">↗</span>
            <div>
              <h2 className="max-w-xs font-serif text-xl text-ink-950">{area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{area.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
