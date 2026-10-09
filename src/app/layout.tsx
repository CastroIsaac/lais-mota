import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ScrollReveal } from '@/components/ScrollReveal'
import { JsonLd } from '@/components/JsonLd'
import { practiceAreas } from '@/lib/practiceAreas'
import { absoluteUrl, shareImage, siteConfig, siteUrl } from '@/lib/site'
import './globals.css'

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

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.attorneyName }],
  description:
    'Laís Mota é advogada em Brasília com atuação estratégica em Direito Civil, Empresarial, Contratual e Consultoria Jurídica Internacional.',
  keywords: [
    'Laís Mota advocacia',
    'advogada Brasília',
    'advogada direito empresarial',
    'advogada direito civil Brasília',
    'consultoria jurídica internacional',
    'advogada contratos internacionais',
    'advogada direito de família Brasília',
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    locale: 'pt_BR',
    siteName: siteConfig.name,
    type: 'website',
    images: [shareImage],
  },
  twitter: { card: 'summary_large_image', images: [shareImage.url] },
  title: {
    default: `${siteConfig.name} | Advocacia Estratégica e Internacional`,
    template: `%s | ${siteConfig.name}`,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const officeId = `${siteUrl}/#escritorio`
  const attorneyId = `${siteUrl}/#lais-mota`
  const sameAs = [siteConfig.instagramUrl, siteConfig.linkedinUrl].filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': officeId,
        name: siteConfig.name,
        url: siteUrl,
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
        knowsAbout: practiceAreas.map((area) => area.title),
        founder: { '@id': attorneyId },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'Person',
        '@id': attorneyId,
        name: siteConfig.attorneyName,
        jobTitle: 'Advogada',
        image: absoluteUrl('/images/lais-mota-image.jpeg'),
        url: absoluteUrl('/sobre'),
        worksFor: { '@id': officeId },
        identifier: { '@type': 'PropertyValue', propertyID: 'OAB/DF', value: siteConfig.oabNumber.replace(/^OAB\/DF nº /, '') },
        knowsAbout: practiceAreas.map((area) => area.title),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        inLanguage: 'pt-BR',
        publisher: { '@id': officeId },
      },
    ],
  }

  return (
    <html lang="pt-BR" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-sans">
        <JsonLd data={jsonLd} />
        <ScrollReveal />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
