import type { Metadata } from 'next'
import { defaultLocale, localeMeta, localePath, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://laismotaadvocacia.com.br'

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return new URL(path, siteUrl).toString()
}

export const siteConfig = {
  name: 'Laís Mota Advocacia',
  attorneyName: 'Laís Almeida Mota',
  oabNumber: 'OAB/DF nº 80.286',
  phoneDisplay: '+55 93 99223-0495',
  whatsappUrl: 'https://wa.me/5593992230495',
  email: 'lais_mota@outlook.com',
  // Office address (not her residence) — this is the one safe to publish.
  addressLine: 'CLN 211, Bloco A, Sala 222 — Asa Norte, Brasília-DF',
  // TODO: add real handles once she sends them (referenced in the FAQ/posicionamento answers).
  instagramUrl: '',
  linkedinUrl: '',
}

// 1200x630 card shown when a link is shared (WhatsApp, LinkedIn, etc.).
export function shareImage(locale: Locale) {
  return { url: '/images/og-image.jpg', width: 1200, height: 630, alt: getDictionary(locale).meta.shareImageAlt }
}

// hreflang map for one page across every language, plus x-default (Portuguese).
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, absoluteUrl(localePath(l, path))])),
    'x-default': absoluteUrl(localePath(defaultLocale, path)),
  }
}

// Per-page title/description/canonical/hreflang plus matching Open Graph tags.
// `path` is the language-neutral path ('/contato'); the locale prefix is added here.
// Page-level openGraph replaces the layout's wholesale, so the image is repeated.
export function pageMetadata(
  locale: Locale,
  { title, description, path }: { title: string; description: string; path: string },
): Metadata {
  const url = absoluteUrl(localePath(locale, path))
  const image = shareImage(locale)
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', images: [image.url] },
  }
}
