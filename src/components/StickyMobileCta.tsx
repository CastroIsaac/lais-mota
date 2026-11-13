'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localePath, type Locale } from '@/i18n/config'

export function StickyMobileCta({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname()
  if (pathname === localePath(locale, '/contato')) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur-sm lg:hidden">
      <Link
        href={localePath(locale, '/contato')}
        className="block w-full rounded bg-gold-500 py-3 text-center text-sm font-semibold text-ink-950 transition hover:bg-gold-600"
      >
        {label}
      </Link>
    </div>
  )
}
