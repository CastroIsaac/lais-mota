'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { notFoundText } from '@/i18n/notFound'

// not-found.tsx gets no params, so the language comes from the URL.
export default function NotFound() {
  const first = usePathname().split('/')[1] ?? ''
  const locale = isLocale(first) ? first : defaultLocale
  const t = notFoundText[locale]

  return (
    <section className="mx-auto max-w-content px-5 pb-24 pt-40 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">404</p>
      <h1 className="mt-4 font-serif text-4xl text-ink-950 md:text-5xl">{t.title}</h1>
      <p className="mt-4 text-base text-ink-700">{t.body}</p>
      <Link
        href={localePath(locale, '/')}
        className="mt-8 inline-flex items-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
      >
        {t.cta}
      </Link>
    </section>
  )
}
