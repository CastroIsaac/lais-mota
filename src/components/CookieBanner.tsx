'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Analytics } from '@/components/Analytics'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

const CONSENT_KEY = 'lais-cookie-consent'

export function CookieBanner({ locale, t }: { locale: Locale; t: Dictionary['cookie'] }) {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') setConsent(stored)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setConsent('declined')
  }

  return (
    <>
      {consent === 'accepted' && <Analytics />}
      {consent === null && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-paper px-5 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] md:px-8"
        >
          <div className="mx-auto flex max-w-content flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-700">
              {t.message}{' '}
              <Link
                href={localePath(locale, '/privacidade')}
                className="underline underline-offset-4 hover:text-gold-600"
              >
                {t.privacyLink}
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={decline}
                className="text-sm text-ink-500 transition hover:text-ink-950"
              >
                {t.decline}
              </button>
              <button
                onClick={accept}
                className="rounded bg-ink-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gold-600"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
