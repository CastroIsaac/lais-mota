'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

export function Header({ locale, nav, blogLabel }: { locale: Locale; nav: Dictionary['nav']; blogLabel?: string }) {
  const navItems = [
    { label: nav.home, href: localePath(locale, '/') },
    { label: nav.about, href: localePath(locale, '/sobre') },
    { label: nav.areas, href: localePath(locale, '/areas-de-atuacao') },
    { label: nav.international, href: localePath(locale, '/advocacia-internacional') },
    ...(blogLabel ? [{ label: blogLabel, href: localePath(locale, '/blog') }] : []),
    { label: nav.contact, href: localePath(locale, '/contato') },
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  // Transparent (cream text, light logo) while the header sits over a page's photo hero,
  // marked with data-header-hero (home only for now). Every other page, and the home once
  // the next section slides up under the header, keeps the solid paper header.
  const [overHero, setOverHero] = useState(false)

  useEffect(() => {
    // Looked up on every check: the header (layout) can mount before the page's hero streams in.
    let frame = 0
    const update = () => {
      frame = 0
      const next = document.querySelector<HTMLElement>('[data-header-hero]')?.nextElementSibling
      const headerHeight = headerRef.current?.offsetHeight ?? 80
      setOverHero(next ? next.getBoundingClientRect().top > headerHeight : false)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { childList: true, subtree: true })
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pathname])

  const light = overHero && !isMenuOpen

  useEffect(() => {
    if (!isMenuOpen) return

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        light
          ? 'border-transparent bg-gradient-to-b from-ink-950/45 to-transparent'
          : 'border-ink-950/10 bg-paper/90 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link href={localePath(locale, '/')} className="shrink-0" onClick={() => setIsMenuOpen(false)}>
            {/* Same logo in cream for the sunset hero; both stacked, one faded in. */}
            <span className="relative block">
              <Image
                src="/images/lais-logo.png"
                alt="Laís Mota Advocacia"
                width={805}
                height={240}
                priority
                className={`h-10 w-auto transition-opacity duration-300 lg:h-12 ${light ? 'opacity-0' : 'opacity-100'}`}
              />
              <Image
                src="/images/lais-logo-light.png"
                alt=""
                aria-hidden="true"
                width={805}
                height={240}
                priority
                className={`absolute inset-0 h-10 w-auto transition-opacity duration-300 lg:h-12 ${light ? 'opacity-100' : 'opacity-0'}`}
              />
            </span>
          </Link>
          {/* Mobile/tablet: language right next to the logo, always visible (not buried in the menu). */}
          <div className="lg:hidden">
            <LanguageSwitcher locale={locale} label={nav.language} align="left" tone={light ? 'light' : 'dark'} />
          </div>
        </div>

        <nav
          className={`hidden items-center gap-6 whitespace-nowrap text-sm font-medium transition-colors duration-300 lg:flex xl:gap-8 ${
            light ? 'text-white/90 [text-shadow:0_1px_8px_rgba(16,31,48,0.45)]' : 'text-ink-700'
          }`}
          aria-label={nav.mainNav}
        >
          {navItems.map((item) => (
            <Link className={`transition ${light ? 'hover:text-gold-400' : 'hover:text-gold-600'}`} href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} label={nav.language} tone={light ? 'light' : 'dark'} />
          <Link
            className={`inline-flex items-center rounded border px-5 py-2.5 text-sm font-semibold transition ${
              light
                ? 'border-white/45 bg-white/10 text-white backdrop-blur-sm hover:border-gold-500 hover:bg-gold-500 hover:text-ink-950'
                : 'border-ink-950 bg-ink-950 text-white hover:border-gold-600 hover:bg-gold-600'
            }`}
            href={localePath(locale, '/contato')}
          >
            {nav.cta}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center transition-colors lg:hidden ${light ? 'text-white' : 'text-ink-950'}`}
          aria-label={isMenuOpen ? nav.closeMenu : nav.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-200 ${
                isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-150 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-200 ${
                isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-full -translate-y-full'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={`overflow-hidden border-t border-ink-950/10 bg-paper transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 border-t-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 text-base font-medium text-ink-700" aria-label={nav.mobileNav} aria-hidden={!isMenuOpen}>
          {navItems.map((item) => (
            <Link
              className="rounded-md px-2 py-3 transition hover:bg-ink-950/5 hover:text-gold-600"
              href={item.href}
              key={item.label}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="mt-2 inline-flex items-center justify-center rounded bg-ink-950 px-5 py-3 text-sm font-semibold text-white"
            href={localePath(locale, '/contato')}
            tabIndex={isMenuOpen ? 0 : -1}
            onClick={() => setIsMenuOpen(false)}
          >
            {nav.cta}
          </Link>
        </nav>
      </div>
    </header>
  )
}
