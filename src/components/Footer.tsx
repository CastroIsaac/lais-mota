import Image from 'next/image'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'
import { siteConfig } from '@/lib/site'

export function Footer({ locale, dict, blogLabel }: { locale: Locale; dict: Dictionary; blogLabel?: string }) {
  const { footer, nav } = dict
  return (
    <footer className="border-t border-ink-950/10 bg-ink-950 text-white">
      <div className="mx-auto grid w-full max-w-content gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          {/* Brown logo would vanish on the navy footer — render it white. */}
          <Image
            src="/images/lais-logo.png"
            alt="Laís Mota Advocacia"
            width={805}
            height={240}
            className="h-14 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{footer.tagline}</p>
        </div>

        <div className="text-sm text-white/70">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{footer.contact}</p>
          <p>{siteConfig.phoneDisplay}</p>
          <p className="mt-1">{siteConfig.email}</p>
          <p className="mt-1">{siteConfig.addressLine}</p>
        </div>

        <nav className="text-sm text-white/70" aria-label={footer.navLabel}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{footer.nav}</p>
          <ul className="space-y-1">
            <li><Link className="inline-block py-1 hover:text-gold-400" href={localePath(locale, '/sobre')}>{nav.about}</Link></li>
            <li><Link className="inline-block py-1 hover:text-gold-400" href={localePath(locale, '/areas-de-atuacao')}>{nav.areas}</Link></li>
            {blogLabel && (
              <li><Link className="inline-block py-1 hover:text-gold-400" href={localePath(locale, '/blog')}>{blogLabel}</Link></li>
            )}
            <li><Link className="inline-block py-1 hover:text-gold-400" href={localePath(locale, '/contato')}>{nav.contact}</Link></li>
          </ul>
          <div className="mt-6 flex gap-4">
            <a className="hover:text-gold-400" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10 px-5 py-5 md:px-8">
        <p className="mx-auto max-w-content text-xs text-white/60">
          {siteConfig.oabNumber} · © {new Date().getFullYear()} {siteConfig.attorneyName}. {footer.rights}
        </p>
      </div>
    </footer>
  )
}
