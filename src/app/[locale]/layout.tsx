import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Lora, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Analytics } from '@/components/Analytics'
import { JsonLd } from '@/components/JsonLd'
import { isLocale, localeMeta, localePath, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n'
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

// Lora/Inter have no Devanagari glyphs. These sit next in the font stacks
// (tailwind.config.ts); browsers only download them when Hindi text is on the page.
const devanagariSerif = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['500', '600'],
  variable: '--font-display-deva',
  display: 'swap',
  preload: false,
})

const devanagariSans = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-body-deva',
  display: 'swap',
  preload: false,
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
    // Google and Bing ignore the keywords tag for ranking; it costs nothing and some
    // smaller engines/directories still read it. Real ranking comes from titles,
    // descriptions and on-page copy (see meta in the dictionaries).
    ...(locale === 'pt' && {
      keywords: [
        // Marca
        'Laís Mota',
        'Laís Mota advocacia',
        'Laís Mota advogada',
        'Laís Almeida Mota',
        'Lais Mota advogada',
        // Local
        'advogada Brasília',
        'advogada em Brasília',
        'advogado Brasília',
        'advogado em Brasília',
        'advogada Brasília DF',
        'advogada Distrito Federal',
        'advogada Asa Norte',
        'escritório de advocacia Brasília',
        'escritório de advocacia Asa Norte',
        'advogada online',
        'advocacia online',
        'consulta com advogada online',
        // Direito empresarial
        'advogada direito empresarial',
        'advogada direito empresarial Brasília',
        'advogado empresarial Brasília',
        'advogada empresarial',
        'advogada societária',
        'direito societário Brasília',
        'dissolução de sociedade',
        'dissolução societária',
        'conflito entre sócios',
        'assessoria jurídica empresarial',
        'assessoria jurídica para empresas',
        // Contratos
        'advogada de contratos',
        'advogada contratual Brasília',
        'advogado de contratos Brasília',
        'elaboração de contratos',
        'revisão de contratos',
        'análise de contratos',
        'negociação de contratos',
        'contratos empresariais',
        'contratos comerciais',
        'advogada contratos internacionais',
        'contratos internacionais',
        'memorando de entendimento',
        'MOU',
        'acordo de confidencialidade',
        'NDA',
        // Internacional e comércio exterior
        'consultoria jurídica internacional',
        'advogada internacional Brasília',
        'advogado internacional Brasília',
        'advogada comércio exterior',
        'advogado comércio exterior Brasília',
        'assessoria jurídica comércio exterior',
        'assessoria jurídica importação',
        'assessoria jurídica exportação',
        'importação da China',
        'internacionalização de empresas',
        'negócios Brasil Oriente Médio',
        // Direito civil e família
        'advogada direito civil Brasília',
        'advogado direito civil Brasília',
        'advogada direito de família Brasília',
        'advogada de família Brasília',
        'advogado de família Brasília',
        'advogada divórcio Brasília',
        'advogado divórcio Brasília',
        'divórcio Brasília',
        'união estável',
        'dissolução de união estável',
        'advogada inventário Brasília',
        'advogado inventário Brasília',
        'inventário Brasília',
        'responsabilidade civil',
      ],
    }),
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': officeId,
        name: siteConfig.name,
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
        knowsLanguage: ['pt-BR'],
        knowsAbout: areaTitles,
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
      className={`${lora.variable} ${inter.variable} ${devanagariSerif.variable} ${devanagariSans.variable}`}
    >
      <body className="font-sans">
        <JsonLd data={jsonLd} />
        <ScrollReveal />
        <Header locale={locale} nav={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFloat label={dict.whatsappLabel} />
        <Analytics />
      </body>
    </html>
  )
}
