import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Lora } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Analytics } from '@/components/Analytics'
import { JsonLd } from '@/components/JsonLd'
import { isLocale, localeMeta, localePath, locales, type Locale } from '@/i18n/config'
import { frontOrder, getDictionary } from '@/i18n'
import { absoluteUrl, shareImage, siteConfig, siteUrl } from '@/lib/site'
import '../globals.css'

const lora = Lora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

type Props = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  const image = shareImage(locale)

  return {
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.attorneyName }],
    description: dict.meta.home.description,
    keywords: dict.meta.keywords,
    metadataBase: new URL(siteUrl),
    openGraph: {
      locale: localeMeta[locale].ogLocale,
      siteName: siteConfig.name,
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', images: [image.url] },
    title: {
      default: `${siteConfig.name} | ${dict.meta.defaultTitle}`,
      template: `%s | ${siteConfig.name}`,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: param } = await params
  if (!isLocale(param)) notFound()
  const locale: Locale = param
  const dict = getDictionary(locale)

  const officeId = `${siteUrl}/#escritorio`
  const attorneyId = `${siteUrl}/#lais-mota`
  const sameAs = [siteConfig.instagramUrl, siteConfig.linkedinUrl].filter(Boolean)
  const areaTitles = dict.practiceAreas.map((area) => area.title)
  // The two fronts as an OfferCatalog, each listing its practice areas as services.
  const offerCatalog = {
    '@type': 'OfferCatalog',
    name: dict.nav.areas,
    itemListElement: frontOrder.map((front) => ({
      '@type': 'OfferCatalog',
      name: dict.fronts[front].name,
      description: dict.fronts[front].description,
      itemListElement: dict.practiceAreas
        .filter((area) => area.front === front)
        .map((area) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: area.title,
            url: absoluteUrl(localePath(locale, `/areas-de-atuacao/${area.slug}`)),
          },
        })),
    })),
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': officeId,
        name: siteConfig.name,
        description: dict.meta.home.description,
        url: absoluteUrl(localePath(locale, '/')),
        logo: absoluteUrl('/images/lais-logo.png'),
        image: absoluteUrl('/images/lais-mota-image.jpeg'),
        telephone: siteConfig.phoneDisplay,
        email: siteConfig.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'CLN 211, Bloco A, Sala 222',
          addressLocality: 'Brasília',
          addressRegion: 'DF',
          addressCountry: 'BR',
        },
        areaServed: [
          { '@type': 'City', name: 'Brasília' },
          { '@type': 'Country', name: 'Brasil' },
        ],
        knowsLanguage: locales.map((l) => localeMeta[l].htmlLang),
        knowsAbout: areaTitles,
        hasOfferCatalog: offerCatalog,
        founder: { '@id': attorneyId },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'Person',
        '@id': attorneyId,
        name: siteConfig.attorneyName,
        jobTitle: 'Advogada',
        image: absoluteUrl('/images/lais-mota-image.jpeg'),
        url: absoluteUrl(localePath(locale, '/sobre')),
        worksFor: { '@id': officeId },
        identifier: { '@type': 'PropertyValue', propertyID: 'OAB/DF', value: siteConfig.oabNumber.replace(/^OAB\/DF nº /, '') },
        knowsAbout: areaTitles,
        knowsLanguage: locales.map((l) => localeMeta[l].htmlLang),
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Federal do Oeste do Pará (UFOPA)' },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        inLanguage: locales.map((l) => localeMeta[l].htmlLang),
        publisher: { '@id': officeId },
      },
    ],
  }

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${lora.variable} ${inter.variable}`}
    >
      <body className="font-sans">
        <JsonLd data={jsonLd} />
        <ScrollReveal />
        <Header locale={locale} nav={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFloat label={dict.whatsappLabel} greeting={dict.whatsappGreeting} />
        <Analytics />
      </body>
    </html>
  )
}
