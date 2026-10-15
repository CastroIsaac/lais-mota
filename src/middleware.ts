import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/i18n/config'

// Portuguese lives at the unprefixed URLs, but the app routes are all under
// app/[locale]. Rewrite '/sobre' -> '/pt/sobre' internally (URL stays the same),
// and redirect anyone who types '/pt/...' to the canonical unprefixed URL.
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const first = pathname.split('/')[1] ?? ''

  if (first === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (isLocale(first)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals, static images and any file with an extension
  // (sitemap.xml, robots.txt, favicon…).
  matcher: ['/((?!_next|images|.*\\..*).*)'],
}
