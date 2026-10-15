export const locales = ['pt', 'en', 'es', 'fr', 'hi'] as const
export type Locale = (typeof locales)[number]

// Portuguese is served at the unprefixed URLs (/, /sobre…) — the URLs that were
// already indexed. Every other language lives under its own prefix (/en, /fr…).
export const defaultLocale: Locale = 'pt'

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  pt: { label: 'Português', short: 'PT', htmlLang: 'pt-BR', ogLocale: 'pt_BR' },
  en: { label: 'English', short: 'EN', htmlLang: 'en-US', ogLocale: 'en_US' },
  es: { label: 'Español', short: 'ES', htmlLang: 'es', ogLocale: 'es_ES' },
  fr: { label: 'Français', short: 'FR', htmlLang: 'fr', ogLocale: 'fr_FR' },
  hi: { label: 'हिन्दी', short: 'HI', htmlLang: 'hi', ogLocale: 'hi_IN' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// '/contato' + 'en' -> '/en/contato'; '/' + 'en' -> '/en'; Portuguese stays unprefixed.
export function localePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

// Inverse of localePath: '/en/contato' -> '/contato', '/en' -> '/'.
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split('/')
  if (first && isLocale(first)) return `/${rest.join('/')}`
  return pathname || '/'
}
