import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata, siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.about, path: '/sobre' })
}

export default async function SobrePage({ params }: Props) {
  const { locale } = await params
  const t = getDictionary(locale).about
  const credentials = [{ label: siteConfig.oabNumber, value: t.oabNote }, ...t.credentials]

  return (
    <>
      <section className="mx-auto grid max-w-content gap-12 px-5 pb-16 pt-32 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-8 md:pb-24 md:pt-40">
        <div className="reveal relative">
          <div className="absolute -bottom-5 -right-5 hidden aspect-[4/5] w-full rounded-sm bg-gold-100 md:block" aria-hidden="true" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink-950/5">
            <Image
              src="/images/lais-mota-image.jpeg"
              alt={t.photoAlt}
              fill
              quality={85}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="reveal stagger-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.kicker}</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink-950 md:text-5xl">Laís Almeida Mota</h1>
          {t.intro.map((paragraph, i) => (
            <p key={i} className={`${i === 0 ? 'mt-6' : 'mt-4'} max-w-xl text-base leading-relaxed text-ink-700`}>
              {paragraph}
            </p>
          ))}

          <dl className="mt-10 space-y-6 border-t border-line pt-8">
            {credentials.map((item) => (
              <div key={item.label}>
                <dt className="text-sm font-semibold text-ink-950">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-500">{item.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={localePath(locale, '/contato')}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
          >
            {t.cta}
          </Link>
        </div>
      </section>

      {/* Trajetória */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.trajectory.kicker}</p>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-700">
            {t.trajectory.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso */}
      <section className="bg-gold-50 py-16 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="reveal grid gap-10 md:grid-cols-[170px_1fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">{t.commitment.kicker}</p>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-700">
              <p>{t.commitment.body}</p>
              <p className="text-sm text-ink-500">{t.commitment.note}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
