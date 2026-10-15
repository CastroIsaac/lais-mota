import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { pageMetadata, siteConfig } from '@/lib/site'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, { ...getDictionary(locale).meta.contact, path: '/contato' })
}

export default async function ContatoPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const t = dict.contact

  return (
    <section className="mx-auto grid max-w-content gap-14 px-5 pb-20 pt-32 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-8 md:pb-28 md:pt-40">
      <div className="reveal">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{t.kicker}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink-950 md:text-5xl">{t.title}</h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700">
          {t.intro}
        </p>

        <dl className="mt-10 space-y-5 border-t border-line pt-8 text-sm">
          <div>
            <dt className="font-semibold text-ink-950">{t.phone}</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.phoneDisplay}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">{t.email}</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">{t.office}</dt>
            <dd className="mt-1 text-ink-500">{siteConfig.addressLine}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">{t.hours}</dt>
            <dd className="mt-1 text-ink-500">{t.hoursValue}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-950">{siteConfig.oabNumber}</dt>
          </div>
        </dl>
      </div>

      <div className="reveal stagger-1">
        <ContactForm t={dict.form} />
      </div>
    </section>
  )
}
