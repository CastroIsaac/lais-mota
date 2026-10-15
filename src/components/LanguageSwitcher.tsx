'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Flag } from '@/components/Flag'
import { localeMeta, localePath, locales, stripLocale, type Locale } from '@/i18n/config'

// Each language has its own root layout, so switching is a full page load that
// would land at the top. Before leaving, remember which section the reader is in
// and how far into it; after the new page loads, scroll back to the same spot.
// Sections (not pixels) because the same text has different lengths per language.
const SCROLL_KEY = 'language-switch-scroll'
const READING_LINE = 120 // px below the viewport top, just under the fixed header

function anchorSections() {
  // Sticky sections report their stuck position, not their place in the page.
  return [...document.querySelectorAll<HTMLElement>('main section')].filter(
    (el) => getComputedStyle(el).position !== 'sticky',
  )
}

function saveScrollPosition(targetPath: string) {
  if (window.scrollY < 10) return
  const sections = anchorSections()
  let index = -1
  sections.forEach((el, i) => {
    if (el.getBoundingClientRect().top <= READING_LINE) index = i
  })
  if (index === -1) return
  const rect = sections[index].getBoundingClientRect()
  const progress = (READING_LINE - rect.top) / rect.height
  try {
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ path: targetPath, index, progress }))
  } catch {}
}

function restoreScrollPosition() {
  let saved: { path: string; index: number; progress: number } | null = null
  try {
    saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) ?? 'null')
    sessionStorage.removeItem(SCROLL_KEY)
  } catch {}
  if (!saved || saved.path !== window.location.pathname) return

  const scroll = () => {
    const el = anchorSections()[saved.index]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const top = rect.top + window.scrollY + saved.progress * rect.height - READING_LINE
    window.scrollTo({ top, behavior: 'instant' })
  }
  scroll()
  // Web fonts can shift the layout slightly once they load — settle again.
  document.fonts?.ready.then(scroll)
}

// Desktop: a flag button that opens a small menu. Mobile (`variant="list"`):
// all languages laid out inline inside the hamburger panel.
export function LanguageSwitcher({
  locale,
  label,
  variant = 'menu',
  onNavigate,
  tabIndex,
}: {
  locale: Locale
  label: string
  variant?: 'menu' | 'list'
  onNavigate?: () => void
  tabIndex?: number
}) {
  const pathname = usePathname()
  const basePath = stripLocale(pathname)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Both header instances (desktop + mobile) mount; only one should restore.
  useEffect(() => {
    if (variant === 'menu') restoreScrollPosition()
  }, [variant])

  useEffect(() => {
    if (!open) return
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const options = locales.map((l) => (
    <Link
      key={l}
      href={localePath(l, basePath)}
      hrefLang={localeMeta[l].htmlLang}
      lang={localeMeta[l].htmlLang}
      aria-current={l === locale ? 'true' : undefined}
      tabIndex={tabIndex}
      scroll={false}
      onClick={() => {
        if (l !== locale) saveScrollPosition(localePath(l, basePath))
        setOpen(false)
        onNavigate?.()
      }}
      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition hover:bg-ink-950/5 hover:text-gold-600 ${
        l === locale ? 'font-semibold text-ink-950' : 'text-ink-700'
      }`}
    >
      <Flag locale={l} />
      {localeMeta[l].label}
    </Link>
  ))

  if (variant === 'list') {
    return (
      <div className="border-t border-ink-950/10 pt-3">
        <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">{label}</p>
        <div className="grid grid-cols-2 gap-1">{options}</div>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${label}: ${localeMeta[locale].label}`}
        className="flex items-center gap-1.5 rounded-full border border-ink-950/15 py-1.5 pl-1.5 pr-2.5 text-xs font-semibold text-ink-700 transition hover:border-gold-500 hover:text-ink-950"
      >
        <Flag locale={locale} />
        {localeMeta[locale].short}
        <span aria-hidden="true" className={`text-[0.6rem] transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-ink-950/10 bg-paper p-1.5 shadow-card">
          {options}
        </div>
      )}
    </div>
  )
}
