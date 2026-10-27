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
  instagramUrl: 'https://www.instagram.com/laiis_motta/',
  // Share link of her Google Business Profile ("Laís Mota Advocacia"), so the site, the map
  // and the reviews all point at the same listing.
  mapsUrl: 'https://share.google/AQEPcnqogvcfYlTn0',
  mapEmbedUrl: 'https://www.google.com/maps?q=CLN+211+Bloco+A+Asa+Norte+Bras%C3%ADlia+DF&output=embed',
  // Her profiles elsewhere (schema.org `sameAs`): Google uses them to confirm who she is.
  // Add LinkedIn, JusBrasil… here as they're created.
  profiles: ['https://www.instagram.com/laiis_motta/', 'https://share.google/AQEPcnqogvcfYlTn0'],
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
// `translated: false` is for Portuguese-only pages (the blog): no hreflang pointing
// at translations that don't exist.
export function pageMetadata(
  locale: Locale,
  {
    title,
    description,
    path,
    standalone = false,
    translated = true,
  }: { title: string; description: string; path: string; standalone?: boolean; translated?: boolean },
): Metadata {
  const url = absoluteUrl(localePath(locale, path))
  const image = shareImage(locale)
  // `standalone` titles already carry the name (home page) — skip the "| Laís Mota Advocacia" suffix.
  const fullTitle = standalone ? title : `${title} | ${siteConfig.name}`
  return {
    title: standalone ? { absolute: title } : title,
    description,
    alternates: translated ? { canonical: url, languages: languageAlternates(path) } : { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: localeMeta[locale].ogLocale,
      ...(translated && { alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale) }),
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', images: [image.url] },
  }
}
